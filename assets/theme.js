/* Theme: follows the OS until the reader picks a side. */
(function () {
  var root = document.documentElement;
  var KEY = 'vs-theme';
  var btn = document.querySelector('.theme-toggle');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function effective() {
    return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
  }

  function paintButton() {
    if (!btn) return;
    var dark = effective() === 'dark';
    btn.classList.toggle('is-dark', dark);
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      root.setAttribute('data-theme', next);
      paintButton();
    });
  }

  if (mq.addEventListener) mq.addEventListener('change', paintButton);
  else if (mq.addListener) mq.addListener(paintButton);

  paintButton();
})();
