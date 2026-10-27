/* Site agent: a local, citation-first chat page. No network, no model, no guessing. */
(function () {
  var log = document.getElementById('tui-log');
  var form = document.getElementById('tui-form');
  var input = document.getElementById('tui-input');
  if (!log || !form || !input) return;

  var RETURN_TO = {
    index: 'index.html',
    work: 'work.html',
    report: 'report.html',
    about: 'about.html'
  };

  function backHref() {
    var from = new URLSearchParams(window.location.search).get('from');
    return RETURN_TO[from] || 'index.html';
  }

  var back = document.getElementById('ask-back');
  if (back) back.setAttribute('href', backHref());

  var KB = [
    {
      keys: ['catalog cleaned', 'catalog cleanup', 'cleaned', 'cleanup', 'duplicate', 'merges', 'merging', 'audit'],
      a: 'A C# service finds duplicate records by matching supplier attributes, merges them into one catalog record, and writes an audit trail. That cut query time by 30% and storage cost by $1,200 a year.',
      src: [['work · catalog cleanup', 'work.html#catalog-cleanup'], ['report · cleaning', 'report.html#sys-cleanup']],
      follow: ['what is the 22% number?', 'what did he ship at walmart?']
    },
    {
      keys: ['walmart', 'catalog', 'cleanup', 'duplicate', 'queries', 'storage', 'seller', 'submission', 'submissions', 'pipeline', 'intake', 'ship', 'shipped', 'built'],
      a: 'Three systems for the Walmart catalog. A C# cleanup service that merges duplicate records: 30% faster queries and $1,200 a year in storage. An event-driven intake pipeline that files clothing layouts at 450,000 records a second. And a TypeScript submissions app, built with two other engineers, that handles 390,000 submissions a day and cut session length by 22%.',
      src: [['work · walmart', 'work.html#walmart'], ['report · systems', 'report.html#systems']],
      follow: ['what is the 22% number?', 'how was the catalog cleaned?']
    },
    {
      keys: ['22%', '22', 'number', 'numbers', 'scale', 'hours', '142', '390,000', '450,000', 'percent'],
      a: 'Session length on the seller submissions app. At 390,000 submissions a day, if a quarter of them are human sessions at six minutes each, a 22% cut returns about 783,000 seller-hours a year. The model in section 3 lets you change both assumptions.',
      src: [['report · what it adds up to', 'report.html#scale']],
      follow: ['what is assumed in that model?', 'what did he ship at walmart?']
    },
    {
      keys: ['assumed', 'assumption', 'assumptions', 'model', 'estimate', 'estimates'],
      a: '20 seconds per record, 25% of traffic being human, and a six-minute baseline session. The last two are sliders. The 390,000 daily submissions and the 22% cut are the measured inputs.',
      src: [['report · method', 'report.html#method'], ['report · the model', 'report.html#scale']],
      follow: ['what is the 22% number?']
    },
    {
      keys: ['atlassian', 'current', 'now', 'growth', 'job', 'role'],
      a: "Growth engineering on Atlassian's cloud products: experiments, and the services underneath them. Most of the detail is under NDA, so the site keeps this entry short.",
      src: [['work · atlassian', 'work.html#atlassian']],
      follow: ['what did he do before atlassian?', 'how do i reach him?']
    },
    {
      keys: ['background', 'career', 'before', 'meta', 'synchrony', 'edgewell', 'uconn', 'school', 'college', 'path', 'experience'],
      a: 'Computer science at UConn, class of 2023. Systems engineering at Edgewell, backend at Synchrony, full stack at Meta, then Walmart Global Tech from 2023 to 2025. At Atlassian since June 2025.',
      src: [['work · before', 'work.html#before'], ['work · meta', 'work.html#meta'], ['work · walmart', 'work.html#walmart']],
      follow: ['what did he ship at walmart?', 'what is his stack?']
    },
    {
      keys: ['stack', 'language', 'languages', 'c#', 'typescript', 'code', 'tech', 'sql', 'event', 'tools'],
      a: 'C# and .NET for the catalog services, TypeScript for the seller app, and event-driven pipelines for intake, with SQL underneath the catalog. The site itself is static HTML and CSS, no framework, no trackers.',
      src: [['work · systems', 'work.html'], ['about', 'about.html']],
      follow: ['what did he ship at walmart?', 'how is this site built?']
    },
    {
      keys: ['care', 'cares', 'focus', 'about', 'who', 'values', 'data'],
      a: 'Product data: catalogs that agree with themselves, pipelines that keep up with suppliers, and forms that stop wasting people\'s time. The through line is making data easier to access, trust, and consume.',
      src: [['about', 'about.html'], ['report · the problem', 'report.html#problem']],
      follow: ['what did he ship at walmart?', 'how do i reach him?']
    },
    {
      keys: ['where', 'location', 'live', 'based', 'new york', 'city'],
      a: 'New York, New York.',
      src: [['about', 'about.html']],
      follow: ['how do i reach him?']
    },
    {
      keys: ['contact', 'email', 'linkedin', 'reach', 'talk', 'connect'],
      a: 'Email or LinkedIn. Both links are on the about page.',
      src: [['about · contact', 'about.html#contact']],
      follow: ['where is he based?']
    },
    {
      keys: ['available', 'availability', 'hire', 'hiring', 'open to', 'roles', 'looking'],
      a: 'The site does not say. It only states what is on the pages, so ask him directly.',
      src: [['about · contact', 'about.html#contact']],
      note: true,
      follow: ['how do i reach him?']
    },
    {
      keys: ['site', 'built', 'build', 'design', 'font', 'fonts', 'tracker', 'static', 'theme', 'dark mode'],
      a: 'Four static pages, local fonts, no framework, no trackers, and a light and dark theme. Type is Instrument Serif, Literata, and Instrument Sans.',
      src: [['about', 'about.html'], ['report', 'report.html']],
      follow: ['what is his stack?', 'who is van?']
    },
    {
      keys: ['van', 'who is', 'sirisouk', 'engineer'],
      a: 'Van Sirisouk, a software engineer in New York. He works on product data and is currently on growth at Atlassian.',
      src: [['home', 'index.html'], ['about', 'about.html']],
      follow: ['what did he ship at walmart?', 'what does he care about?']
    }
  ];

  var FALLBACK = {
    a: 'That is not on the site. It only reads these four pages, so it will not guess.',
    src: [],
    note: true,
    follow: ['what did he ship at walmart?', 'where is he based?']
  };

  var busy = false;
  var history = [];
  var hIndex = 0;

  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function span(cls, text) {
    var node = document.createElement('span');
    node.className = cls;
    node.textContent = text;
    return node;
  }

  function p(text) {
    var node = document.createElement('p');
    node.textContent = text;
    return node;
  }

  function scroll() {
    log.scrollTop = log.scrollHeight;
  }

  function now() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + suffix;
  }

  function sourceLine(entry) {
    if (!entry.src || !entry.src.length) return null;
    var wrap = el('p', 'msg__src');
    wrap.appendChild(span('', 'source'));
    entry.src.forEach(function (s) {
      var a = document.createElement('a');
      a.href = s[1];
      a.textContent = s[0];
      wrap.appendChild(a);
    });
    return wrap;
  }

  function suggestions(list) {
    var wrap = el('div', 'msg__suggest');
    list.forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = q;
      b.addEventListener('click', function () {
        ask(q);
        input.focus();
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  function message(who, stamp, fill, extra) {
    var art = el('article', 'msg');
    art.dataset.who = who;

    var avatar = el('span', 'msg__avatar', who === 'agent' ? 'V' : 'Y');
    avatar.setAttribute('aria-hidden', 'true');

    var body = el('div', 'msg__body');
    var meta = el('p', 'msg__meta');
    meta.appendChild(avatar);
    meta.appendChild(span('msg__who', who === 'agent' ? 'Site agent' : 'You'));
    if (who === 'agent') meta.appendChild(span('msg__tag', 'bot'));
    meta.appendChild(span('msg__time', stamp));

    var text = el('div', 'msg__text');
    if (fill) fill(text);

    body.appendChild(meta);
    body.appendChild(text);
    if (extra) body.appendChild(extra);

    art.appendChild(body);
    return art;
  }

  function extras(entry) {
    var frag = document.createDocumentFragment();
    var used = false;
    var src = sourceLine(entry);
    if (src) {
      frag.appendChild(src);
      used = true;
    }
    if (entry.follow && entry.follow.length) {
      frag.appendChild(suggestions(entry.follow));
      used = true;
    }
    return used ? frag : null;
  }

  function answerMessage(entry) {
    return message('agent', now(), function (text) {
      text.appendChild(p(entry.a));
      if (entry.note) text.appendChild(el('p', 'msg__note', 'Not stated on the site.'));
    }, extras(entry));
  }

  function typingMessage() {
    return message('agent', now(), function (text) {
      var row = el('p', 'msg__typing');
      row.appendChild(span('', 'searching this site'));
      row.appendChild(document.createElement('i'));
      row.appendChild(document.createElement('i'));
      row.appendChild(document.createElement('i'));
      text.appendChild(row);
    });
  }

  function intro() {
    log.appendChild(el('p', 'msg__system', 'This is the beginning of #ask-van.'));

    log.appendChild(message('agent', 'now', function (text) {
      text.appendChild(p('Ask about the work, the numbers, or the roles. Every answer cites the page it came from, and it says so when the answer is not here.'));
    }));

    var divider = el('p', 'msg__system', 'Example exchange');
    divider.classList.add('msg--example');
    log.appendChild(divider);

    var q = 'what did he ship at walmart?';
    var sample = match(q);

    var question = message('you', 'example', function (text) {
      text.appendChild(p(q));
    });
    question.classList.add('msg--example');
    log.appendChild(question);

    var reply = message('agent', 'example', function (text) {
      text.appendChild(p(sample.a));
    }, extras(sample));
    reply.classList.add('msg--example');
    log.appendChild(reply);
  }

  function match(q) {
    var t = ' ' + q.toLowerCase().replace(/[^\w\s%]/g, ' ') + ' ';
    var best = null;
    var bestScore = 0;
    KB.forEach(function (entry) {
      var score = 0;
      entry.keys.forEach(function (k) {
        if (t.indexOf(k) > -1) score += k.indexOf(' ') > -1 ? 3 : 1;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return bestScore > 0 ? best : FALLBACK;
  }

  function ask(text) {
    var q = String(text || '').trim();
    if (!q || busy) return;
    input.value = '';

    log.querySelectorAll('.msg--example').forEach(function (node) { node.remove(); });

    history.push(q);
    hIndex = history.length;

    log.appendChild(message('you', now(), function (body) {
      body.appendChild(p(q));
    }));

    var typing = typingMessage();
    log.appendChild(typing);
    scroll();
    busy = true;

    window.setTimeout(function () {
      typing.remove();
      log.appendChild(answerMessage(match(q)));
      busy = false;
      scroll();
    }, 620);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ask(input.value);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      if (!history.length) return;
      hIndex = Math.max(0, hIndex - 1);
      input.value = history[hIndex];
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (!history.length) return;
      hIndex = Math.min(history.length, hIndex + 1);
      input.value = hIndex === history.length ? '' : history[hIndex];
      e.preventDefault();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.location.href = backHref();
  });

  intro();
  window.setTimeout(function () { input.focus(); }, 80);
})();
