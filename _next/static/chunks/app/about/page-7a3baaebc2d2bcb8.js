(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[301],{7445:function(e,r,t){Promise.resolve().then(t.bind(t,1158)),Promise.resolve().then(t.bind(t,4344)),Promise.resolve().then(t.bind(t,5633)),Promise.resolve().then(t.t.bind(t,231,23))},1158:function(e,r,t){"use strict";t.d(r,{ScrollArea:function(){return B}});var o=t(7437),n=t(2265),l=t(2988),i=t(5171),a=t(1383),c=t(8324),s=t(1584),u=t(5137),d=t(7513),f=t(1336),p=t(8149);let h="ScrollArea",[v,w]=(0,c.b)(h),[m,b]=v(h),g=(0,n.forwardRef)((e,r)=>{let{__scopeScrollArea:t,type:o="hover",dir:a,scrollHideDelay:c=600,...u}=e,[f,p]=(0,n.useState)(null),[h,v]=(0,n.useState)(null),[w,b]=(0,n.useState)(null),[g,E]=(0,n.useState)(null),[S,y]=(0,n.useState)(null),[C,T]=(0,n.useState)(0),[R,P]=(0,n.useState)(0),[_,x]=(0,n.useState)(!1),[L,z]=(0,n.useState)(!1),D=(0,s.e)(r,e=>p(e)),A=(0,d.gm)(a);return(0,n.createElement)(m,{scope:t,type:o,dir:A,scrollHideDelay:c,scrollArea:f,viewport:h,onViewportChange:v,content:w,onContentChange:b,scrollbarX:g,onScrollbarXChange:E,scrollbarXEnabled:_,onScrollbarXEnabledChange:x,scrollbarY:S,onScrollbarYChange:y,scrollbarYEnabled:L,onScrollbarYEnabledChange:z,onCornerWidthChange:T,onCornerHeightChange:P},(0,n.createElement)(i.WV.div,(0,l.Z)({dir:A},u,{ref:D,style:{position:"relative","--radix-scroll-area-corner-width":C+"px","--radix-scroll-area-corner-height":R+"px",...e.style}})))}),E=(0,n.forwardRef)((e,r)=>{let{__scopeScrollArea:t,children:o,...a}=e,c=b("ScrollAreaViewport",t),u=(0,n.useRef)(null),d=(0,s.e)(r,u,c.onViewportChange);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)("style",{dangerouslySetInnerHTML:{__html:"[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"}}),(0,n.createElement)(i.WV.div,(0,l.Z)({"data-radix-scroll-area-viewport":""},a,{ref:d,style:{overflowX:c.scrollbarXEnabled?"scroll":"hidden",overflowY:c.scrollbarYEnabled?"scroll":"hidden",...e.style}}),(0,n.createElement)("div",{ref:c.onContentChange,style:{minWidth:"100%",display:"table"}},o)))}),S="ScrollAreaScrollbar",y=(0,n.forwardRef)((e,r)=>{let{forceMount:t,...o}=e,i=b(S,e.__scopeScrollArea),{onScrollbarXEnabledChange:a,onScrollbarYEnabledChange:c}=i,s="horizontal"===e.orientation;return(0,n.useEffect)(()=>(s?a(!0):c(!0),()=>{s?a(!1):c(!1)}),[s,a,c]),"hover"===i.type?(0,n.createElement)(C,(0,l.Z)({},o,{ref:r,forceMount:t})):"scroll"===i.type?(0,n.createElement)(T,(0,l.Z)({},o,{ref:r,forceMount:t})):"auto"===i.type?(0,n.createElement)(R,(0,l.Z)({},o,{ref:r,forceMount:t})):"always"===i.type?(0,n.createElement)(P,(0,l.Z)({},o,{ref:r})):null}),C=(0,n.forwardRef)((e,r)=>{let{forceMount:t,...o}=e,i=b(S,e.__scopeScrollArea),[c,s]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{let e=i.scrollArea,r=0;if(e){let t=()=>{window.clearTimeout(r),s(!0)},o=()=>{r=window.setTimeout(()=>s(!1),i.scrollHideDelay)};return e.addEventListener("pointerenter",t),e.addEventListener("pointerleave",o),()=>{window.clearTimeout(r),e.removeEventListener("pointerenter",t),e.removeEventListener("pointerleave",o)}}},[i.scrollArea,i.scrollHideDelay]),(0,n.createElement)(a.z,{present:t||c},(0,n.createElement)(R,(0,l.Z)({"data-state":c?"visible":"hidden"},o,{ref:r})))}),T=(0,n.forwardRef)((e,r)=>{var t,o;let{forceMount:i,...c}=e,s=b(S,e.__scopeScrollArea),u="horizontal"===e.orientation,d=V(()=>h("SCROLL_END"),100),[f,h]=(t="hidden",o={hidden:{SCROLL:"scrolling"},scrolling:{SCROLL_END:"idle",POINTER_ENTER:"interacting"},interacting:{SCROLL:"interacting",POINTER_LEAVE:"idle"},idle:{HIDE:"hidden",SCROLL:"scrolling",POINTER_ENTER:"interacting"}},(0,n.useReducer)((e,r)=>{let t=o[e][r];return null!=t?t:e},t));return(0,n.useEffect)(()=>{if("idle"===f){let e=window.setTimeout(()=>h("HIDE"),s.scrollHideDelay);return()=>window.clearTimeout(e)}},[f,s.scrollHideDelay,h]),(0,n.useEffect)(()=>{let e=s.viewport,r=u?"scrollLeft":"scrollTop";if(e){let t=e[r],o=()=>{let o=e[r];t!==o&&(h("SCROLL"),d()),t=o};return e.addEventListener("scroll",o),()=>e.removeEventListener("scroll",o)}},[s.viewport,u,h,d]),(0,n.createElement)(a.z,{present:i||"hidden"!==f},(0,n.createElement)(P,(0,l.Z)({"data-state":"hidden"===f?"hidden":"visible"},c,{ref:r,onPointerEnter:(0,p.M)(e.onPointerEnter,()=>h("POINTER_ENTER")),onPointerLeave:(0,p.M)(e.onPointerLeave,()=>h("POINTER_LEAVE"))})))}),R=(0,n.forwardRef)((e,r)=>{let t=b(S,e.__scopeScrollArea),{forceMount:o,...i}=e,[c,s]=(0,n.useState)(!1),u="horizontal"===e.orientation,d=V(()=>{if(t.viewport){let e=t.viewport.offsetWidth<t.viewport.scrollWidth,r=t.viewport.offsetHeight<t.viewport.scrollHeight;s(u?e:r)}},10);return j(t.viewport,d),j(t.content,d),(0,n.createElement)(a.z,{present:o||c},(0,n.createElement)(P,(0,l.Z)({"data-state":c?"visible":"hidden"},i,{ref:r})))}),P=(0,n.forwardRef)((e,r)=>{let{orientation:t="vertical",...o}=e,i=b(S,e.__scopeScrollArea),a=(0,n.useRef)(null),c=(0,n.useRef)(0),[s,u]=(0,n.useState)({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),d=I(s.viewport,s.content),f={...o,sizes:s,onSizesChange:u,hasThumb:!!(d>0&&d<1),onThumbChange:e=>a.current=e,onThumbPointerUp:()=>c.current=0,onThumbPointerDown:e=>c.current=e};function p(e,r){return function(e,r,t,o="ltr"){let n=O(t),l=r||n/2,i=t.scrollbar.paddingStart+l,a=t.scrollbar.size-t.scrollbar.paddingEnd-(n-l),c=t.content-t.viewport;return Y([i,a],"ltr"===o?[0,c]:[-1*c,0])(e)}(e,c.current,s,r)}return"horizontal"===t?(0,n.createElement)(_,(0,l.Z)({},f,{ref:r,onThumbPositionChange:()=>{if(i.viewport&&a.current){let e=X(i.viewport.scrollLeft,s,i.dir);a.current.style.transform=`translate3d(${e}px, 0, 0)`}},onWheelScroll:e=>{i.viewport&&(i.viewport.scrollLeft=e)},onDragScroll:e=>{i.viewport&&(i.viewport.scrollLeft=p(e,i.dir))}})):"vertical"===t?(0,n.createElement)(x,(0,l.Z)({},f,{ref:r,onThumbPositionChange:()=>{if(i.viewport&&a.current){let e=X(i.viewport.scrollTop,s);a.current.style.transform=`translate3d(0, ${e}px, 0)`}},onWheelScroll:e=>{i.viewport&&(i.viewport.scrollTop=e)},onDragScroll:e=>{i.viewport&&(i.viewport.scrollTop=p(e))}})):null}),_=(0,n.forwardRef)((e,r)=>{let{sizes:t,onSizesChange:o,...i}=e,a=b(S,e.__scopeScrollArea),[c,u]=(0,n.useState)(),d=(0,n.useRef)(null),f=(0,s.e)(r,d,a.onScrollbarXChange);return(0,n.useEffect)(()=>{d.current&&u(getComputedStyle(d.current))},[d]),(0,n.createElement)(D,(0,l.Z)({"data-orientation":"horizontal"},i,{ref:f,sizes:t,style:{bottom:0,left:"rtl"===a.dir?"var(--radix-scroll-area-corner-width)":0,right:"ltr"===a.dir?"var(--radix-scroll-area-corner-width)":0,"--radix-scroll-area-thumb-width":O(t)+"px",...e.style},onThumbPointerDown:r=>e.onThumbPointerDown(r.x),onDragScroll:r=>e.onDragScroll(r.x),onWheelScroll:(r,t)=>{if(a.viewport){let o=a.viewport.scrollLeft+r.deltaX;e.onWheelScroll(o),o>0&&o<t&&r.preventDefault()}},onResize:()=>{d.current&&a.viewport&&c&&o({content:a.viewport.scrollWidth,viewport:a.viewport.offsetWidth,scrollbar:{size:d.current.clientWidth,paddingStart:k(c.paddingLeft),paddingEnd:k(c.paddingRight)}})}}))}),x=(0,n.forwardRef)((e,r)=>{let{sizes:t,onSizesChange:o,...i}=e,a=b(S,e.__scopeScrollArea),[c,u]=(0,n.useState)(),d=(0,n.useRef)(null),f=(0,s.e)(r,d,a.onScrollbarYChange);return(0,n.useEffect)(()=>{d.current&&u(getComputedStyle(d.current))},[d]),(0,n.createElement)(D,(0,l.Z)({"data-orientation":"vertical"},i,{ref:f,sizes:t,style:{top:0,right:"ltr"===a.dir?0:void 0,left:"rtl"===a.dir?0:void 0,bottom:"var(--radix-scroll-area-corner-height)","--radix-scroll-area-thumb-height":O(t)+"px",...e.style},onThumbPointerDown:r=>e.onThumbPointerDown(r.y),onDragScroll:r=>e.onDragScroll(r.y),onWheelScroll:(r,t)=>{if(a.viewport){let o=a.viewport.scrollTop+r.deltaY;e.onWheelScroll(o),o>0&&o<t&&r.preventDefault()}},onResize:()=>{d.current&&a.viewport&&c&&o({content:a.viewport.scrollHeight,viewport:a.viewport.offsetHeight,scrollbar:{size:d.current.clientHeight,paddingStart:k(c.paddingTop),paddingEnd:k(c.paddingBottom)}})}}))}),[L,z]=v(S),D=(0,n.forwardRef)((e,r)=>{let{__scopeScrollArea:t,sizes:o,hasThumb:a,onThumbChange:c,onThumbPointerUp:d,onThumbPointerDown:f,onThumbPositionChange:h,onDragScroll:v,onWheelScroll:w,onResize:m,...g}=e,E=b(S,t),[y,C]=(0,n.useState)(null),T=(0,s.e)(r,e=>C(e)),R=(0,n.useRef)(null),P=(0,n.useRef)(""),_=E.viewport,x=o.content-o.viewport,z=(0,u.W)(w),D=(0,u.W)(h),A=V(m,10);function W(e){R.current&&v({x:e.clientX-R.current.left,y:e.clientY-R.current.top})}return(0,n.useEffect)(()=>{let e=e=>{let r=e.target;(null==y?void 0:y.contains(r))&&z(e,x)};return document.addEventListener("wheel",e,{passive:!1}),()=>document.removeEventListener("wheel",e,{passive:!1})},[_,y,x,z]),(0,n.useEffect)(D,[o,D]),j(y,A),j(E.content,A),(0,n.createElement)(L,{scope:t,scrollbar:y,hasThumb:a,onThumbChange:(0,u.W)(c),onThumbPointerUp:(0,u.W)(d),onThumbPositionChange:D,onThumbPointerDown:(0,u.W)(f)},(0,n.createElement)(i.WV.div,(0,l.Z)({},g,{ref:T,style:{position:"absolute",...g.style},onPointerDown:(0,p.M)(e.onPointerDown,e=>{0===e.button&&(e.target.setPointerCapture(e.pointerId),R.current=y.getBoundingClientRect(),P.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",E.viewport&&(E.viewport.style.scrollBehavior="auto"),W(e))}),onPointerMove:(0,p.M)(e.onPointerMove,W),onPointerUp:(0,p.M)(e.onPointerUp,e=>{let r=e.target;r.hasPointerCapture(e.pointerId)&&r.releasePointerCapture(e.pointerId),document.body.style.webkitUserSelect=P.current,E.viewport&&(E.viewport.style.scrollBehavior=""),R.current=null})})))}),A="ScrollAreaThumb",W=(0,n.forwardRef)((e,r)=>{let{forceMount:t,...o}=e,i=z(A,e.__scopeScrollArea);return(0,n.createElement)(a.z,{present:t||i.hasThumb},(0,n.createElement)(N,(0,l.Z)({ref:r},o)))}),N=(0,n.forwardRef)((e,r)=>{let{__scopeScrollArea:t,style:o,...a}=e,c=b(A,t),u=z(A,t),{onThumbPositionChange:d}=u,f=(0,s.e)(r,e=>u.onThumbChange(e)),h=(0,n.useRef)(),v=V(()=>{h.current&&(h.current(),h.current=void 0)},100);return(0,n.useEffect)(()=>{let e=c.viewport;if(e){let r=()=>{if(v(),!h.current){let r=U(e,d);h.current=r,d()}};return d(),e.addEventListener("scroll",r),()=>e.removeEventListener("scroll",r)}},[c.viewport,v,d]),(0,n.createElement)(i.WV.div,(0,l.Z)({"data-state":u.hasThumb?"visible":"hidden"},a,{ref:f,style:{width:"var(--radix-scroll-area-thumb-width)",height:"var(--radix-scroll-area-thumb-height)",...o},onPointerDownCapture:(0,p.M)(e.onPointerDownCapture,e=>{let r=e.target.getBoundingClientRect(),t=e.clientX-r.left,o=e.clientY-r.top;u.onThumbPointerDown({x:t,y:o})}),onPointerUp:(0,p.M)(e.onPointerUp,u.onThumbPointerUp)}))}),M="ScrollAreaCorner",Z=(0,n.forwardRef)((e,r)=>{let t=b(M,e.__scopeScrollArea),o=!!(t.scrollbarX&&t.scrollbarY);return"scroll"!==t.type&&o?(0,n.createElement)(H,(0,l.Z)({},e,{ref:r})):null}),H=(0,n.forwardRef)((e,r)=>{let{__scopeScrollArea:t,...o}=e,a=b(M,t),[c,s]=(0,n.useState)(0),[u,d]=(0,n.useState)(0),f=!!(c&&u);return j(a.scrollbarX,()=>{var e;let r=(null===(e=a.scrollbarX)||void 0===e?void 0:e.offsetHeight)||0;a.onCornerHeightChange(r),d(r)}),j(a.scrollbarY,()=>{var e;let r=(null===(e=a.scrollbarY)||void 0===e?void 0:e.offsetWidth)||0;a.onCornerWidthChange(r),s(r)}),f?(0,n.createElement)(i.WV.div,(0,l.Z)({},o,{ref:r,style:{width:c,height:u,position:"absolute",right:"ltr"===a.dir?0:void 0,left:"rtl"===a.dir?0:void 0,bottom:0,...e.style}})):null});function k(e){return e?parseInt(e,10):0}function I(e,r){let t=e/r;return isNaN(t)?0:t}function O(e){let r=I(e.viewport,e.content),t=e.scrollbar.paddingStart+e.scrollbar.paddingEnd;return Math.max((e.scrollbar.size-t)*r,18)}function X(e,r,t="ltr"){let o=O(r),n=r.scrollbar.paddingStart+r.scrollbar.paddingEnd,l=r.scrollbar.size-n,i=r.content-r.viewport,a=function(e,[r,t]){return Math.min(t,Math.max(r,e))}(e,"ltr"===t?[0,i]:[-1*i,0]);return Y([0,i],[0,l-o])(a)}function Y(e,r){return t=>{if(e[0]===e[1]||r[0]===r[1])return r[0];let o=(r[1]-r[0])/(e[1]-e[0]);return r[0]+o*(t-e[0])}}let U=(e,r=()=>{})=>{let t={left:e.scrollLeft,top:e.scrollTop},o=0;return!function n(){let l={left:e.scrollLeft,top:e.scrollTop},i=t.left!==l.left,a=t.top!==l.top;(i||a)&&r(),t=l,o=window.requestAnimationFrame(n)}(),()=>window.cancelAnimationFrame(o)};function V(e,r){let t=(0,u.W)(e),o=(0,n.useRef)(0);return(0,n.useEffect)(()=>()=>window.clearTimeout(o.current),[]),(0,n.useCallback)(()=>{window.clearTimeout(o.current),o.current=window.setTimeout(t,r)},[t,r])}function j(e,r){let t=(0,u.W)(r);(0,f.b)(()=>{let r=0;if(e){let o=new ResizeObserver(()=>{cancelAnimationFrame(r),r=window.requestAnimationFrame(t)});return o.observe(e),()=>{window.cancelAnimationFrame(r),o.unobserve(e)}}},[e,t])}var F=t(7440);let B=n.forwardRef((e,r)=>{let{className:t,children:n,...l}=e;return(0,o.jsxs)(g,{ref:r,className:(0,F.cn)("relative overflow-hidden",t),...l,children:[(0,o.jsx)(E,{className:"h-full w-full rounded-[inherit]",children:n}),(0,o.jsx)($,{}),(0,o.jsx)(Z,{})]})});B.displayName=g.displayName;let $=n.forwardRef((e,r)=>{let{className:t,orientation:n="vertical",...l}=e;return(0,o.jsx)(y,{ref:r,orientation:n,className:(0,F.cn)("flex touch-none select-none transition-colors","vertical"===n&&"h-full w-2.5 border-l border-l-transparent p-[1px]","horizontal"===n&&"h-2.5 flex-col border-t border-t-transparent p-[1px]",t),...l,children:(0,o.jsx)(W,{className:"relative flex-1 rounded-full bg-border"})})});$.displayName=y.displayName},4344:function(e,r,t){"use strict";t.d(r,{Separator:function(){return a}});var o=t(7437),n=t(2265),l=t(8484),i=t(7440);let a=n.forwardRef((e,r)=>{let{className:t,orientation:n="horizontal",decorative:a=!0,...c}=e;return(0,o.jsx)(l.f,{ref:r,decorative:a,orientation:n,className:(0,i.cn)("shrink-0 bg-border","horizontal"===n?"h-[1px] w-full":"h-full w-[1px]",t),...c})});a.displayName=l.f.displayName},5633:function(e,r,t){"use strict";t.d(r,{ClientClickHack:function(){return i}});var o=t(7437),n=t(6460),l=t(7776);let i=()=>(0,o.jsxs)("li",{children:[(0,o.jsxs)("span",{className:"primary-foreground hover:text-custom-highlight hover:cursor-pointer",onClick:()=>{(0,l.A)("Coming Soon!",{description:(0,n.WU)(new Date,"PPPPp"),action:{label:"Close",onClick:()=>{}}})},children:["I love building projects"," "]}),"to practice my design skills and learn new technologies"]})},7440:function(e,r,t){"use strict";t.d(r,{cn:function(){return l}});var o=t(4839),n=t(6164);function l(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,n.m6)((0,o.W)(r))}},8484:function(e,r,t){"use strict";t.d(r,{f:function(){return u}});var o=t(2988),n=t(2265),l=t(5171);let i="horizontal",a=["horizontal","vertical"],c=(0,n.forwardRef)((e,r)=>{let{decorative:t,orientation:a=i,...c}=e,u=s(a)?a:i;return(0,n.createElement)(l.WV.div,(0,o.Z)({"data-orientation":u},t?{role:"none"}:{"aria-orientation":"vertical"===u?u:void 0,role:"separator"},c,{ref:r}))});function s(e){return a.includes(e)}c.propTypes={orientation(e,r,t){let o=e[r],n=String(o);return o&&!s(o)?Error(`Invalid prop \`orientation\` of value \`${n}\` supplied to \`${t}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${i}\`.`):null}};let u=c}},function(e){e.O(0,[637,460,402,971,23,744],function(){return e(e.s=7445)}),_N_E=e.O()}]);