"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[67],{3938:function(e,t,n){let r;n.d(t,{XB:function(){return d}});var i=n(2988),o=n(2265),l=n(8149),a=n(5171),s=n(1584),u=n(5137);let f="dismissableLayer.update",c=(0,o.createContext)({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),d=(0,o.forwardRef)((e,t)=>{var n;let{disableOutsidePointerEvents:d=!1,onEscapeKeyDown:m,onPointerDownOutside:g,onFocusOutside:v,onInteractOutside:y,onDismiss:w,...b}=e,x=(0,o.useContext)(c),[E,P]=(0,o.useState)(null),R=null!==(n=null==E?void 0:E.ownerDocument)&&void 0!==n?n:null==globalThis?void 0:globalThis.document,[,C]=(0,o.useState)({}),A=(0,s.e)(t,e=>P(e)),L=Array.from(x.layers),[O]=[...x.layersWithOutsidePointerEventsDisabled].slice(-1),T=L.indexOf(O),S=E?L.indexOf(E):-1,D=x.layersWithOutsidePointerEventsDisabled.size>0,W=S>=T,k=function(e,t=null==globalThis?void 0:globalThis.document){let n=(0,u.W)(e),r=(0,o.useRef)(!1),i=(0,o.useRef)(()=>{});return(0,o.useEffect)(()=>{let e=e=>{if(e.target&&!r.current){let r={originalEvent:e};function o(){h("dismissableLayer.pointerDownOutside",n,r,{discrete:!0})}"touch"===e.pointerType?(t.removeEventListener("click",i.current),i.current=o,t.addEventListener("click",i.current,{once:!0})):o()}else t.removeEventListener("click",i.current);r.current=!1},o=window.setTimeout(()=>{t.addEventListener("pointerdown",e)},0);return()=>{window.clearTimeout(o),t.removeEventListener("pointerdown",e),t.removeEventListener("click",i.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}(e=>{let t=e.target,n=[...x.branches].some(e=>e.contains(t));!W||n||(null==g||g(e),null==y||y(e),e.defaultPrevented||null==w||w())},R),H=function(e,t=null==globalThis?void 0:globalThis.document){let n=(0,u.W)(e),r=(0,o.useRef)(!1);return(0,o.useEffect)(()=>{let e=e=>{e.target&&!r.current&&h("dismissableLayer.focusOutside",n,{originalEvent:e},{discrete:!1})};return t.addEventListener("focusin",e),()=>t.removeEventListener("focusin",e)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}(e=>{let t=e.target;[...x.branches].some(e=>e.contains(t))||(null==v||v(e),null==y||y(e),e.defaultPrevented||null==w||w())},R);return!function(e,t=null==globalThis?void 0:globalThis.document){let n=(0,u.W)(e);(0,o.useEffect)(()=>{let e=e=>{"Escape"===e.key&&n(e)};return t.addEventListener("keydown",e),()=>t.removeEventListener("keydown",e)},[n,t])}(e=>{S!==x.layers.size-1||(null==m||m(e),!e.defaultPrevented&&w&&(e.preventDefault(),w()))},R),(0,o.useEffect)(()=>{if(E)return d&&(0===x.layersWithOutsidePointerEventsDisabled.size&&(r=R.body.style.pointerEvents,R.body.style.pointerEvents="none"),x.layersWithOutsidePointerEventsDisabled.add(E)),x.layers.add(E),p(),()=>{d&&1===x.layersWithOutsidePointerEventsDisabled.size&&(R.body.style.pointerEvents=r)}},[E,R,d,x]),(0,o.useEffect)(()=>()=>{E&&(x.layers.delete(E),x.layersWithOutsidePointerEventsDisabled.delete(E),p())},[E,x]),(0,o.useEffect)(()=>{let e=()=>C({});return document.addEventListener(f,e),()=>document.removeEventListener(f,e)},[]),(0,o.createElement)(a.WV.div,(0,i.Z)({},b,{ref:A,style:{pointerEvents:D?W?"auto":"none":void 0,...e.style},onFocusCapture:(0,l.M)(e.onFocusCapture,H.onFocusCapture),onBlurCapture:(0,l.M)(e.onBlurCapture,H.onBlurCapture),onPointerDownCapture:(0,l.M)(e.onPointerDownCapture,k.onPointerDownCapture)}))});function p(){let e=new CustomEvent(f);document.dispatchEvent(e)}function h(e,t,n,{discrete:r}){let i=n.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&i.addEventListener(e,t,{once:!0}),r?(0,a.jH)(i,o):i.dispatchEvent(o)}},3201:function(e,t,n){n.d(t,{M:function(){return s}});var r,i=n(2265),o=n(1336);let l=(r||(r=n.t(i,2)))["useId".toString()]||(()=>void 0),a=0;function s(e){let[t,n]=i.useState(l());return(0,o.b)(()=>{e||n(e=>null!=e?e:String(a++))},[e]),e||(t?`radix-${t}`:"")}},5510:function(e,t,n){n.d(t,{ee:function(){return eM},Eh:function(){return eB},VY:function(){return ez},fC:function(){return eF},D7:function(){return eE}});var r=n(2988),i=n(2265);let o=["top","right","bottom","left"],l=Math.min,a=Math.max,s=Math.round,u=Math.floor,f=e=>({x:e,y:e}),c={left:"right",right:"left",bottom:"top",top:"bottom"},d={start:"end",end:"start"};function p(e,t){return"function"==typeof e?e(t):e}function h(e){return e.split("-")[0]}function m(e){return e.split("-")[1]}function g(e){return"x"===e?"y":"x"}function v(e){return"y"===e?"height":"width"}function y(e){return["top","bottom"].includes(h(e))?"y":"x"}function w(e){return e.replace(/start|end/g,e=>d[e])}function b(e){return e.replace(/left|right|bottom|top/g,e=>c[e])}function x(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function E(e){return{...e,top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}function P(e,t,n){let r,{reference:i,floating:o}=e,l=y(t),a=g(y(t)),s=v(a),u=h(t),f="y"===l,c=i.x+i.width/2-o.width/2,d=i.y+i.height/2-o.height/2,p=i[s]/2-o[s]/2;switch(u){case"top":r={x:c,y:i.y-o.height};break;case"bottom":r={x:c,y:i.y+i.height};break;case"right":r={x:i.x+i.width,y:d};break;case"left":r={x:i.x-o.width,y:d};break;default:r={x:i.x,y:i.y}}switch(m(t)){case"start":r[a]-=p*(n&&f?-1:1);break;case"end":r[a]+=p*(n&&f?-1:1)}return r}let R=async(e,t,n)=>{let{placement:r="bottom",strategy:i="absolute",middleware:o=[],platform:l}=n,a=o.filter(Boolean),s=await (null==l.isRTL?void 0:l.isRTL(t)),u=await l.getElementRects({reference:e,floating:t,strategy:i}),{x:f,y:c}=P(u,r,s),d=r,p={},h=0;for(let n=0;n<a.length;n++){let{name:o,fn:m}=a[n],{x:g,y:v,data:y,reset:w}=await m({x:f,y:c,initialPlacement:r,placement:d,strategy:i,middlewareData:p,rects:u,platform:l,elements:{reference:e,floating:t}});f=null!=g?g:f,c=null!=v?v:c,p={...p,[o]:{...p[o],...y}},w&&h<=50&&(h++,"object"==typeof w&&(w.placement&&(d=w.placement),w.rects&&(u=!0===w.rects?await l.getElementRects({reference:e,floating:t,strategy:i}):w.rects),{x:f,y:c}=P(u,d,s)),n=-1)}return{x:f,y:c,placement:d,strategy:i,middlewareData:p}};async function C(e,t){var n;void 0===t&&(t={});let{x:r,y:i,platform:o,rects:l,elements:a,strategy:s}=e,{boundary:u="clippingAncestors",rootBoundary:f="viewport",elementContext:c="floating",altBoundary:d=!1,padding:h=0}=p(t,e),m=x(h),g=a[d?"floating"===c?"reference":"floating":c],v=E(await o.getClippingRect({element:null==(n=await (null==o.isElement?void 0:o.isElement(g)))||n?g:g.contextElement||await (null==o.getDocumentElement?void 0:o.getDocumentElement(a.floating)),boundary:u,rootBoundary:f,strategy:s})),y="floating"===c?{...l.floating,x:r,y:i}:l.reference,w=await (null==o.getOffsetParent?void 0:o.getOffsetParent(a.floating)),b=await (null==o.isElement?void 0:o.isElement(w))&&await (null==o.getScale?void 0:o.getScale(w))||{x:1,y:1},P=E(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:y,offsetParent:w,strategy:s}):y);return{top:(v.top-P.top+m.top)/b.y,bottom:(P.bottom-v.bottom+m.bottom)/b.y,left:(v.left-P.left+m.left)/b.x,right:(P.right-v.right+m.right)/b.x}}function A(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function L(e){return o.some(t=>e[t]>=0)}async function O(e,t){let{placement:n,platform:r,elements:i}=e,o=await (null==r.isRTL?void 0:r.isRTL(i.floating)),l=h(n),a=m(n),s="y"===y(n),u=["left","top"].includes(l)?-1:1,f=o&&s?-1:1,c=p(t,e),{mainAxis:d,crossAxis:g,alignmentAxis:v}="number"==typeof c?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...c};return a&&"number"==typeof v&&(g="end"===a?-1*v:v),s?{x:g*f,y:d*u}:{x:d*u,y:g*f}}function T(e){return W(e)?(e.nodeName||"").toLowerCase():"#document"}function S(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function D(e){var t;return null==(t=(W(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function W(e){return e instanceof Node||e instanceof S(e).Node}function k(e){return e instanceof Element||e instanceof S(e).Element}function H(e){return e instanceof HTMLElement||e instanceof S(e).HTMLElement}function F(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof S(e).ShadowRoot)}function M(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=$(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(i)}function z(e){let t=B(),n=$(e);return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some(e=>(n.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(n.contain||"").includes(e))}function B(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}function V(e){return["html","body","#document"].includes(T(e))}function $(e){return S(e).getComputedStyle(e)}function _(e){return k(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function N(e){if("html"===T(e))return e;let t=e.assignedSlot||e.parentNode||F(e)&&e.host||D(e);return F(t)?t.host:t}function I(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);let i=function e(t){let n=N(t);return V(n)?t.ownerDocument?t.ownerDocument.body:t.body:H(n)&&M(n)?n:e(n)}(e),o=i===(null==(r=e.ownerDocument)?void 0:r.body),l=S(i);return o?t.concat(l,l.visualViewport||[],M(i)?i:[],l.frameElement&&n?I(l.frameElement):[]):t.concat(i,I(i,[],n))}function Y(e){let t=$(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=H(e),o=i?e.offsetWidth:n,l=i?e.offsetHeight:r,a=s(n)!==o||s(r)!==l;return a&&(n=o,r=l),{width:n,height:r,$:a}}function j(e){return k(e)?e:e.contextElement}function X(e){let t=j(e);if(!H(t))return f(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:o}=Y(t),l=(o?s(n.width):n.width)/r,a=(o?s(n.height):n.height)/i;return l&&Number.isFinite(l)||(l=1),a&&Number.isFinite(a)||(a=1),{x:l,y:a}}let Z=f(0);function q(e){let t=S(e);return B()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:Z}function K(e,t,n,r){var i;void 0===t&&(t=!1),void 0===n&&(n=!1);let o=e.getBoundingClientRect(),l=j(e),a=f(1);t&&(r?k(r)&&(a=X(r)):a=X(e));let s=(void 0===(i=n)&&(i=!1),r&&(!i||r===S(l))&&i)?q(l):f(0),u=(o.left+s.x)/a.x,c=(o.top+s.y)/a.y,d=o.width/a.x,p=o.height/a.y;if(l){let e=S(l),t=r&&k(r)?S(r):r,n=e,i=n.frameElement;for(;i&&r&&t!==n;){let e=X(i),t=i.getBoundingClientRect(),r=$(i),o=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,l=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;u*=e.x,c*=e.y,d*=e.x,p*=e.y,u+=o,c+=l,i=(n=S(i)).frameElement}}return E({width:d,height:p,x:u,y:c})}let G=[":popover-open",":modal"];function J(e){return G.some(t=>{try{return e.matches(t)}catch(e){return!1}})}function Q(e){return K(D(e)).left+_(e).scrollLeft}function U(e,t,n){let r;if("viewport"===t)r=function(e,t){let n=S(e),r=D(e),i=n.visualViewport,o=r.clientWidth,l=r.clientHeight,a=0,s=0;if(i){o=i.width,l=i.height;let e=B();(!e||e&&"fixed"===t)&&(a=i.offsetLeft,s=i.offsetTop)}return{width:o,height:l,x:a,y:s}}(e,n);else if("document"===t)r=function(e){let t=D(e),n=_(e),r=e.ownerDocument.body,i=a(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),o=a(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),l=-n.scrollLeft+Q(e),s=-n.scrollTop;return"rtl"===$(r).direction&&(l+=a(t.clientWidth,r.clientWidth)-i),{width:i,height:o,x:l,y:s}}(D(e));else if(k(t))r=function(e,t){let n=K(e,!0,"fixed"===t),r=n.top+e.clientTop,i=n.left+e.clientLeft,o=H(e)?X(e):f(1),l=e.clientWidth*o.x;return{width:l,height:e.clientHeight*o.y,x:i*o.x,y:r*o.y}}(t,n);else{let n=q(e);r={...t,x:t.x-n.x,y:t.y-n.y}}return E(r)}function ee(e,t){return H(e)&&"fixed"!==$(e).position?t?t(e):e.offsetParent:null}function et(e,t){let n=S(e);if(!H(e)||J(e))return n;let r=ee(e,t);for(;r&&["table","td","th"].includes(T(r))&&"static"===$(r).position;)r=ee(r,t);return r&&("html"===T(r)||"body"===T(r)&&"static"===$(r).position&&!z(r))?n:r||function(e){let t=N(e);for(;H(t)&&!V(t);){if(z(t))return t;t=N(t)}return null}(e)||n}let en=async function(e){let t=this.getOffsetParent||et,n=this.getDimensions;return{reference:function(e,t,n){let r=H(t),i=D(t),o="fixed"===n,l=K(e,!0,o,t),a={scrollLeft:0,scrollTop:0},s=f(0);if(r||!r&&!o){if(("body"!==T(t)||M(i))&&(a=_(t)),r){let e=K(t,!0,o,t);s.x=e.x+t.clientLeft,s.y=e.y+t.clientTop}else i&&(s.x=Q(i))}return{x:l.left+a.scrollLeft-s.x,y:l.top+a.scrollTop-s.y,width:l.width,height:l.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,...await n(e.floating)}}},er={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,o="fixed"===i,l=D(r),a=!!t&&J(t.floating);if(r===l||a&&o)return n;let s={scrollLeft:0,scrollTop:0},u=f(1),c=f(0),d=H(r);if((d||!d&&!o)&&(("body"!==T(r)||M(l))&&(s=_(r)),H(r))){let e=K(r);u=X(r),c.x=e.x+r.clientLeft,c.y=e.y+r.clientTop}return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-s.scrollLeft*u.x+c.x,y:n.y*u.y-s.scrollTop*u.y+c.y}},getDocumentElement:D,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,o=[..."clippingAncestors"===n?function(e,t){let n=t.get(e);if(n)return n;let r=I(e,[],!1).filter(e=>k(e)&&"body"!==T(e)),i=null,o="fixed"===$(e).position,l=o?N(e):e;for(;k(l)&&!V(l);){let t=$(l),n=z(l);n||"fixed"!==t.position||(i=null),(o?!n&&!i:!n&&"static"===t.position&&!!i&&["absolute","fixed"].includes(i.position)||M(l)&&!n&&function e(t,n){let r=N(t);return!(r===n||!k(r)||V(r))&&("fixed"===$(r).position||e(r,n))}(e,l))?r=r.filter(e=>e!==l):i=t,l=N(l)}return t.set(e,r),r}(t,this._c):[].concat(n),r],s=o[0],u=o.reduce((e,n)=>{let r=U(t,n,i);return e.top=a(r.top,e.top),e.right=l(r.right,e.right),e.bottom=l(r.bottom,e.bottom),e.left=a(r.left,e.left),e},U(t,s,i));return{width:u.right-u.left,height:u.bottom-u.top,x:u.left,y:u.top}},getOffsetParent:et,getElementRects:en,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:n}=Y(e);return{width:t,height:n}},getScale:X,isElement:k,isRTL:function(e){return"rtl"===$(e).direction}},ei=e=>({name:"arrow",options:e,async fn(t){let{x:n,y:r,placement:i,rects:o,platform:s,elements:u,middlewareData:f}=t,{element:c,padding:d=0}=p(e,t)||{};if(null==c)return{};let h=x(d),w={x:n,y:r},b=g(y(i)),E=v(b),P=await s.getDimensions(c),R="y"===b,C=R?"clientHeight":"clientWidth",A=o.reference[E]+o.reference[b]-w[b]-o.floating[E],L=w[b]-o.reference[b],O=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c)),T=O?O[C]:0;T&&await (null==s.isElement?void 0:s.isElement(O))||(T=u.floating[C]||o.floating[E]);let S=T/2-P[E]/2-1,D=l(h[R?"top":"left"],S),W=l(h[R?"bottom":"right"],S),k=T-P[E]-W,H=T/2-P[E]/2+(A/2-L/2),F=a(D,l(H,k)),M=!f.arrow&&null!=m(i)&&H!==F&&o.reference[E]/2-(H<D?D:W)-P[E]/2<0,z=M?H<D?H-D:H-k:0;return{[b]:w[b]+z,data:{[b]:F,centerOffset:H-F-z,...M&&{alignmentOffset:z}},reset:M}}}),eo=(e,t,n)=>{let r=new Map,i={platform:er,...n},o={...i.platform,_c:r};return R(e,t,{...i,platform:o})};var el=n(4887);let ea=e=>({name:"arrow",options:e,fn(t){let{element:n,padding:r}="function"==typeof e?e(t):e;return n&&({}).hasOwnProperty.call(n,"current")?null!=n.current?ei({element:n.current,padding:r}).fn(t):{}:n?ei({element:n,padding:r}).fn(t):{}}});var es="undefined"!=typeof document?i.useLayoutEffect:i.useEffect;function eu(e,t){let n,r,i;if(e===t)return!0;if(typeof e!=typeof t)return!1;if("function"==typeof e&&e.toString()===t.toString())return!0;if(e&&t&&"object"==typeof e){if(Array.isArray(e)){if((n=e.length)!==t.length)return!1;for(r=n;0!=r--;)if(!eu(e[r],t[r]))return!1;return!0}if((n=(i=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(r=n;0!=r--;)if(!({}).hasOwnProperty.call(t,i[r]))return!1;for(r=n;0!=r--;){let n=i[r];if(("_owner"!==n||!e.$$typeof)&&!eu(e[n],t[n]))return!1}return!0}return e!=e&&t!=t}function ef(e){return"undefined"==typeof window?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function ec(e,t){let n=ef(e);return Math.round(t*n)/n}function ed(e){let t=i.useRef(e);return es(()=>{t.current=e}),t}var ep=n(5171);let eh=(0,i.forwardRef)((e,t)=>{let{children:n,width:o=10,height:l=5,...a}=e;return(0,i.createElement)(ep.WV.svg,(0,r.Z)({},a,{ref:t,width:o,height:l,viewBox:"0 0 30 10",preserveAspectRatio:"none"}),e.asChild?n:(0,i.createElement)("polygon",{points:"0,0 30,0 15,10"}))});var em=n(1584),eg=n(8324),ev=n(5137),ey=n(1336),ew=n(5238);let eb="Popper",[ex,eE]=(0,eg.b)(eb),[eP,eR]=ex(eb),eC=(0,i.forwardRef)((e,t)=>{let{__scopePopper:n,virtualRef:o,...l}=e,a=eR("PopperAnchor",n),s=(0,i.useRef)(null),u=(0,em.e)(t,s);return(0,i.useEffect)(()=>{a.onAnchorChange((null==o?void 0:o.current)||s.current)}),o?null:(0,i.createElement)(ep.WV.div,(0,r.Z)({},l,{ref:u}))}),eA="PopperContent",[eL,eO]=ex(eA),eT=(0,i.forwardRef)((e,t)=>{var n,o,s,f,c,d,x,E,P,R,T,S,W,k;let{__scopePopper:H,side:F="bottom",sideOffset:M=0,align:z="center",alignOffset:B=0,arrowPadding:V=0,avoidCollisions:$=!0,collisionBoundary:_=[],collisionPadding:N=0,sticky:Y="partial",hideWhenDetached:X=!1,updatePositionStrategy:Z="optimized",onPlaced:q,...G}=e,J=eR(eA,H),[Q,U]=(0,i.useState)(null),ee=(0,em.e)(t,e=>U(e)),[et,en]=(0,i.useState)(null),er=(0,ew.t)(et),ei=null!==(n=null==er?void 0:er.width)&&void 0!==n?n:0,eh=null!==(o=null==er?void 0:er.height)&&void 0!==o?o:0,eg="number"==typeof N?N:{top:0,right:0,bottom:0,left:0,...N},eb=Array.isArray(_)?_:[_],ex=eb.length>0,eE={padding:eg,boundary:eb.filter(eW),altBoundary:ex},{refs:eP,floatingStyles:eC,placement:eO,isPositioned:eT,middlewareData:eS}=function(e){void 0===e&&(e={});let{placement:t="bottom",strategy:n="absolute",middleware:r=[],platform:o,elements:{reference:l,floating:a}={},transform:s=!0,whileElementsMounted:u,open:f}=e,[c,d]=i.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[p,h]=i.useState(r);eu(p,r)||h(r);let[m,g]=i.useState(null),[v,y]=i.useState(null),w=i.useCallback(e=>{e!==P.current&&(P.current=e,g(e))},[]),b=i.useCallback(e=>{e!==R.current&&(R.current=e,y(e))},[]),x=l||m,E=a||v,P=i.useRef(null),R=i.useRef(null),C=i.useRef(c),A=null!=u,L=ed(u),O=ed(o),T=i.useCallback(()=>{if(!P.current||!R.current)return;let e={placement:t,strategy:n,middleware:p};O.current&&(e.platform=O.current),eo(P.current,R.current,e).then(e=>{let t={...e,isPositioned:!0};S.current&&!eu(C.current,t)&&(C.current=t,el.flushSync(()=>{d(t)}))})},[p,t,n,O]);es(()=>{!1===f&&C.current.isPositioned&&(C.current.isPositioned=!1,d(e=>({...e,isPositioned:!1})))},[f]);let S=i.useRef(!1);es(()=>(S.current=!0,()=>{S.current=!1}),[]),es(()=>{if(x&&(P.current=x),E&&(R.current=E),x&&E){if(L.current)return L.current(x,E,T);T()}},[x,E,T,L,A]);let D=i.useMemo(()=>({reference:P,floating:R,setReference:w,setFloating:b}),[w,b]),W=i.useMemo(()=>({reference:x,floating:E}),[x,E]),k=i.useMemo(()=>{let e={position:n,left:0,top:0};if(!W.floating)return e;let t=ec(W.floating,c.x),r=ec(W.floating,c.y);return s?{...e,transform:"translate("+t+"px, "+r+"px)",...ef(W.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:t,top:r}},[n,s,W.floating,c.x,c.y]);return i.useMemo(()=>({...c,update:T,refs:D,elements:W,floatingStyles:k}),[c,T,D,W,k])}({strategy:"fixed",placement:F+("center"!==z?"-"+z:""),whileElementsMounted:(...e)=>(function(e,t,n,r){let i;void 0===r&&(r={});let{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:f="function"==typeof ResizeObserver,layoutShift:c="function"==typeof IntersectionObserver,animationFrame:d=!1}=r,p=j(e),h=o||s?[...p?I(p):[],...I(t)]:[];h.forEach(e=>{o&&e.addEventListener("scroll",n,{passive:!0}),s&&e.addEventListener("resize",n)});let m=p&&c?function(e,t){let n,r=null,i=D(e);function o(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return!function s(f,c){void 0===f&&(f=!1),void 0===c&&(c=1),o();let{left:d,top:p,width:h,height:m}=e.getBoundingClientRect();if(f||t(),!h||!m)return;let g=u(p),v=u(i.clientWidth-(d+h)),y={rootMargin:-g+"px "+-v+"px "+-u(i.clientHeight-(p+m))+"px "+-u(d)+"px",threshold:a(0,l(1,c))||1},w=!0;function b(e){let t=e[0].intersectionRatio;if(t!==c){if(!w)return s();t?s(!1,t):n=setTimeout(()=>{s(!1,1e-7)},100)}w=!1}try{r=new IntersectionObserver(b,{...y,root:i.ownerDocument})}catch(e){r=new IntersectionObserver(b,y)}r.observe(e)}(!0),o}(p,n):null,g=-1,v=null;f&&(v=new ResizeObserver(e=>{let[r]=e;r&&r.target===p&&v&&(v.unobserve(t),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var e;null==(e=v)||e.observe(t)})),n()}),p&&!d&&v.observe(p),v.observe(t));let y=d?K(e):null;return d&&function t(){let r=K(e);y&&(r.x!==y.x||r.y!==y.y||r.width!==y.width||r.height!==y.height)&&n(),y=r,i=requestAnimationFrame(t)}(),n(),()=>{var e;h.forEach(e=>{o&&e.removeEventListener("scroll",n),s&&e.removeEventListener("resize",n)}),null==m||m(),null==(e=v)||e.disconnect(),v=null,d&&cancelAnimationFrame(i)}})(...e,{animationFrame:"always"===Z}),elements:{reference:J.anchor},middleware:[{name:"offset",options:P={mainAxis:M+eh,alignmentAxis:B},async fn(e){var t,n;let{x:r,y:i,placement:o,middlewareData:l}=e,a=await O(e,P);return o===(null==(t=l.offset)?void 0:t.placement)&&null!=(n=l.arrow)&&n.alignmentOffset?{}:{x:r+a.x,y:i+a.y,data:{...a,placement:o}}}},$&&{name:"shift",options:T={mainAxis:!0,crossAxis:!1,limiter:"partial"===Y?(void 0===R&&(R={}),{options:R,fn(e){let{x:t,y:n,placement:r,rects:i,middlewareData:o}=e,{offset:l=0,mainAxis:a=!0,crossAxis:s=!0}=p(R,e),u={x:t,y:n},f=y(r),c=g(f),d=u[c],m=u[f],v=p(l,e),w="number"==typeof v?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(a){let e="y"===c?"height":"width",t=i.reference[c]-i.floating[e]+w.mainAxis,n=i.reference[c]+i.reference[e]-w.mainAxis;d<t?d=t:d>n&&(d=n)}if(s){var b,x;let e="y"===c?"width":"height",t=["top","left"].includes(h(r)),n=i.reference[f]-i.floating[e]+(t&&(null==(b=o.offset)?void 0:b[f])||0)+(t?0:w.crossAxis),l=i.reference[f]+i.reference[e]+(t?0:(null==(x=o.offset)?void 0:x[f])||0)-(t?w.crossAxis:0);m<n?m=n:m>l&&(m=l)}return{[c]:d,[f]:m}}}):void 0,...eE},async fn(e){let{x:t,y:n,placement:r}=e,{mainAxis:i=!0,crossAxis:o=!1,limiter:s={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...u}=p(T,e),f={x:t,y:n},c=await C(e,u),d=y(h(r)),m=g(d),v=f[m],w=f[d];if(i){let e="y"===m?"top":"left",t="y"===m?"bottom":"right",n=v+c[e],r=v-c[t];v=a(n,l(v,r))}if(o){let e="y"===d?"top":"left",t="y"===d?"bottom":"right",n=w+c[e],r=w-c[t];w=a(n,l(w,r))}let b=s.fn({...e,[m]:v,[d]:w});return{...b,data:{x:b.x-t,y:b.y-n}}}},$&&{name:"flip",options:S={...eE},async fn(e){var t,n,r,i,o;let{placement:l,middlewareData:a,rects:s,initialPlacement:u,platform:f,elements:c}=e,{mainAxis:d=!0,crossAxis:x=!0,fallbackPlacements:E,fallbackStrategy:P="bestFit",fallbackAxisSideDirection:R="none",flipAlignment:A=!0,...L}=p(S,e);if(null!=(t=a.arrow)&&t.alignmentOffset)return{};let O=h(l),T=h(u)===u,D=await (null==f.isRTL?void 0:f.isRTL(c.floating)),W=E||(T||!A?[b(u)]:function(e){let t=b(e);return[w(e),t,w(t)]}(u));E||"none"===R||W.push(...function(e,t,n,r){let i=m(e),o=function(e,t,n){let r=["left","right"],i=["right","left"];switch(e){case"top":case"bottom":if(n)return t?i:r;return t?r:i;case"left":case"right":return t?["top","bottom"]:["bottom","top"];default:return[]}}(h(e),"start"===n,r);return i&&(o=o.map(e=>e+"-"+i),t&&(o=o.concat(o.map(w)))),o}(u,A,R,D));let k=[u,...W],H=await C(e,L),F=[],M=(null==(n=a.flip)?void 0:n.overflows)||[];if(d&&F.push(H[O]),x){let e=function(e,t,n){void 0===n&&(n=!1);let r=m(e),i=g(y(e)),o=v(i),l="x"===i?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[o]>t.floating[o]&&(l=b(l)),[l,b(l)]}(l,s,D);F.push(H[e[0]],H[e[1]])}if(M=[...M,{placement:l,overflows:F}],!F.every(e=>e<=0)){let e=((null==(r=a.flip)?void 0:r.index)||0)+1,t=k[e];if(t)return{data:{index:e,overflows:M},reset:{placement:t}};let n=null==(i=M.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:i.placement;if(!n)switch(P){case"bestFit":{let e=null==(o=M.map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:o[0];e&&(n=e);break}case"initialPlacement":n=u}if(l!==n)return{reset:{placement:n}}}return{}}},{name:"size",options:W={...eE,apply:({elements:e,rects:t,availableWidth:n,availableHeight:r})=>{let{width:i,height:o}=t.reference,l=e.floating.style;l.setProperty("--radix-popper-available-width",`${n}px`),l.setProperty("--radix-popper-available-height",`${r}px`),l.setProperty("--radix-popper-anchor-width",`${i}px`),l.setProperty("--radix-popper-anchor-height",`${o}px`)}},async fn(e){let t,n;let{placement:r,rects:i,platform:o,elements:s}=e,{apply:u=()=>{},...f}=p(W,e),c=await C(e,f),d=h(r),g=m(r),v="y"===y(r),{width:w,height:b}=i.floating;"top"===d||"bottom"===d?(t=d,n=g===(await (null==o.isRTL?void 0:o.isRTL(s.floating))?"start":"end")?"left":"right"):(n=d,t="end"===g?"top":"bottom");let x=b-c[t],E=w-c[n],P=!e.middlewareData.shift,R=x,A=E;if(v){let e=w-c.left-c.right;A=g||P?l(E,e):e}else{let e=b-c.top-c.bottom;R=g||P?l(x,e):e}if(P&&!g){let e=a(c.left,0),t=a(c.right,0),n=a(c.top,0),r=a(c.bottom,0);v?A=w-2*(0!==e||0!==t?e+t:a(c.left,c.right)):R=b-2*(0!==n||0!==r?n+r:a(c.top,c.bottom))}await u({...e,availableWidth:A,availableHeight:R});let L=await o.getDimensions(s.floating);return w!==L.width||b!==L.height?{reset:{rects:!0}}:{}}},et&&ea({element:et,padding:V}),ek({arrowWidth:ei,arrowHeight:eh}),X&&{name:"hide",options:k={strategy:"referenceHidden",...eE},async fn(e){let{rects:t}=e,{strategy:n="referenceHidden",...r}=p(k,e);switch(n){case"referenceHidden":{let n=A(await C(e,{...r,elementContext:"reference"}),t.reference);return{data:{referenceHiddenOffsets:n,referenceHidden:L(n)}}}case"escaped":{let n=A(await C(e,{...r,altBoundary:!0}),t.floating);return{data:{escapedOffsets:n,escaped:L(n)}}}default:return{}}}}]}),[eD,eF]=eH(eO),eM=(0,ev.W)(q);(0,ey.b)(()=>{eT&&(null==eM||eM())},[eT,eM]);let ez=null===(s=eS.arrow)||void 0===s?void 0:s.x,eB=null===(f=eS.arrow)||void 0===f?void 0:f.y,eV=(null===(c=eS.arrow)||void 0===c?void 0:c.centerOffset)!==0,[e$,e_]=(0,i.useState)();return(0,ey.b)(()=>{Q&&e_(window.getComputedStyle(Q).zIndex)},[Q]),(0,i.createElement)("div",{ref:eP.setFloating,"data-radix-popper-content-wrapper":"",style:{...eC,transform:eT?eC.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:e$,"--radix-popper-transform-origin":[null===(d=eS.transformOrigin)||void 0===d?void 0:d.x,null===(x=eS.transformOrigin)||void 0===x?void 0:x.y].join(" ")},dir:e.dir},(0,i.createElement)(eL,{scope:H,placedSide:eD,onArrowChange:en,arrowX:ez,arrowY:eB,shouldHideArrow:eV},(0,i.createElement)(ep.WV.div,(0,r.Z)({"data-side":eD,"data-align":eF},G,{ref:ee,style:{...G.style,animation:eT?void 0:"none",opacity:null!==(E=eS.hide)&&void 0!==E&&E.referenceHidden?0:void 0}}))))}),eS={top:"bottom",right:"left",bottom:"top",left:"right"},eD=(0,i.forwardRef)(function(e,t){let{__scopePopper:n,...o}=e,l=eO("PopperArrow",n),a=eS[l.placedSide];return(0,i.createElement)("span",{ref:l.onArrowChange,style:{position:"absolute",left:l.arrowX,top:l.arrowY,[a]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[l.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[l.placedSide],visibility:l.shouldHideArrow?"hidden":void 0}},(0,i.createElement)(eh,(0,r.Z)({},o,{ref:t,style:{...o.style,display:"block"}})))});function eW(e){return null!==e}let ek=e=>({name:"transformOrigin",options:e,fn(t){var n,r,i,o,l;let{placement:a,rects:s,middlewareData:u}=t,f=(null===(n=u.arrow)||void 0===n?void 0:n.centerOffset)!==0,c=f?0:e.arrowWidth,d=f?0:e.arrowHeight,[p,h]=eH(a),m={start:"0%",center:"50%",end:"100%"}[h],g=(null!==(r=null===(i=u.arrow)||void 0===i?void 0:i.x)&&void 0!==r?r:0)+c/2,v=(null!==(o=null===(l=u.arrow)||void 0===l?void 0:l.y)&&void 0!==o?o:0)+d/2,y="",w="";return"bottom"===p?(y=f?m:`${g}px`,w=`${-d}px`):"top"===p?(y=f?m:`${g}px`,w=`${s.floating.height+d}px`):"right"===p?(y=`${-d}px`,w=f?m:`${v}px`):"left"===p&&(y=`${s.floating.width+d}px`,w=f?m:`${v}px`),{data:{x:y,y:w}}}});function eH(e){let[t,n="center"]=e.split("-");return[t,n]}let eF=e=>{let{__scopePopper:t,children:n}=e,[r,o]=(0,i.useState)(null);return(0,i.createElement)(eP,{scope:t,anchor:r,onAnchorChange:o},n)},eM=eC,ez=eT,eB=eD},6935:function(e,t,n){n.d(t,{h:function(){return a}});var r=n(2988),i=n(2265),o=n(4887),l=n(5171);let a=(0,i.forwardRef)((e,t)=>{var n;let{container:a=null==globalThis?void 0:null===(n=globalThis.document)||void 0===n?void 0:n.body,...s}=e;return a?o.createPortal((0,i.createElement)(l.WV.div,(0,r.Z)({},s,{ref:t})),a):null})},1715:function(e,t,n){n.d(t,{T:function(){return o}});var r=n(2265),i=n(5137);function o({prop:e,defaultProp:t,onChange:n=()=>{}}){let[o,l]=function({defaultProp:e,onChange:t}){let n=(0,r.useState)(e),[o]=n,l=(0,r.useRef)(o),a=(0,i.W)(t);return(0,r.useEffect)(()=>{l.current!==o&&(a(o),l.current=o)},[o,l,a]),n}({defaultProp:t,onChange:n}),a=void 0!==e,s=a?e:o,u=(0,i.W)(n);return[s,(0,r.useCallback)(t=>{if(a){let n="function"==typeof t?t(e):t;n!==e&&u(n)}else l(t)},[a,e,l,u])]}},5238:function(e,t,n){n.d(t,{t:function(){return o}});var r=n(2265),i=n(1336);function o(e){let[t,n]=(0,r.useState)(void 0);return(0,i.b)(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});let t=new ResizeObserver(t=>{let r,i;if(!Array.isArray(t)||!t.length)return;let o=t[0];if("borderBoxSize"in o){let e=o.borderBoxSize,t=Array.isArray(e)?e[0]:e;r=t.inlineSize,i=t.blockSize}else r=e.offsetWidth,i=e.offsetHeight;n({width:r,height:i})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}n(void 0)},[e]),t}}}]);