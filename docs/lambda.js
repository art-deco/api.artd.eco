function n(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function u(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:n(a)}}function aa(a){for(var b,d=[];!(b=a.next()).done;)d.push(b.value);return d}var ba="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},v;
if("function"==typeof Object.setPrototypeOf)v=Object.setPrototypeOf;else{var z;a:{var ca={A:!0},A={};try{A.__proto__=ca;z=A.A;break a}catch(a){}z=!1}v=z?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var B=v;
function C(a,b){a.prototype=ba(b.prototype);a.prototype.constructor=a;if(B)B(a,b);else for(var d in b)if("prototype"!=d)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}var E="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,F="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,d){a!=Array.prototype&&a!=Object.prototype&&(a[b]=d.value)};
function G(a,b){if(b){var d=E;a=a.split(".");for(var e=0;e<a.length-1;e++){var f=a[e];f in d||(d[f]={});d=d[f]}a=a[a.length-1];e=d[a];b=b(e);b!=e&&null!=b&&F(d,a,{configurable:!0,writable:!0,value:b})}}
G("Promise",function(a){function b(c){this.b=0;this.g=void 0;this.a=[];var g=this.c();try{c(g.resolve,g.reject)}catch(h){g.reject(h)}}function d(){this.a=null}function e(c){return c instanceof b?c:new b(function(g){g(c)})}if(a)return a;d.prototype.b=function(c){if(null==this.a){this.a=[];var g=this;this.c(function(){g.g()})}this.a.push(c)};var f=E.setTimeout;d.prototype.c=function(c){f(c,0)};d.prototype.g=function(){for(;this.a&&this.a.length;){var c=this.a;this.a=[];for(var g=0;g<c.length;++g){var h=
c[g];c[g]=null;try{h()}catch(l){this.f(l)}}}this.a=null};d.prototype.f=function(c){this.c(function(){throw c;})};b.prototype.c=function(){function c(l){return function(m){h||(h=!0,l.call(g,m))}}var g=this,h=!1;return{resolve:c(this.F),reject:c(this.f)}};b.prototype.F=function(c){if(c===this)this.f(new TypeError("A Promise cannot resolve to itself"));else if(c instanceof b)this.G(c);else{a:switch(typeof c){case "object":var g=null!=c;break a;case "function":g=!0;break a;default:g=!1}g?this.s(c):this.i(c)}};
b.prototype.s=function(c){var g=void 0;try{g=c.then}catch(h){this.f(h);return}"function"==typeof g?this.H(g,c):this.i(c)};b.prototype.f=function(c){this.j(2,c)};b.prototype.i=function(c){this.j(1,c)};b.prototype.j=function(c,g){if(0!=this.b)throw Error("Cannot settle("+c+", "+g+"): Promise already settled in state"+this.b);this.b=c;this.g=g;this.o()};b.prototype.o=function(){if(null!=this.a){for(var c=0;c<this.a.length;++c)k.b(this.a[c]);this.a=null}};var k=new d;b.prototype.G=function(c){var g=this.c();
c.u(g.resolve,g.reject)};b.prototype.H=function(c,g){var h=this.c();try{c.call(g,h.resolve,h.reject)}catch(l){h.reject(l)}};b.prototype.then=function(c,g){function h(p,r){return"function"==typeof p?function(x){try{l(p(x))}catch(y){m(y)}}:r}var l,m,q=new b(function(p,r){l=p;m=r});this.u(h(c,l),h(g,m));return q};b.prototype.catch=function(c){return this.then(void 0,c)};b.prototype.u=function(c,g){function h(){switch(l.b){case 1:c(l.g);break;case 2:g(l.g);break;default:throw Error("Unexpected state: "+
l.b);}}var l=this;null==this.a?k.b(h):this.a.push(h)};b.resolve=e;b.reject=function(c){return new b(function(g,h){h(c)})};b.race=function(c){return new b(function(g,h){for(var l=u(c),m=l.next();!m.done;m=l.next())e(m.value).u(g,h)})};b.all=function(c){var g=u(c),h=g.next();return h.done?e([]):new b(function(l,m){function q(x){return function(y){p[x]=y;r--;0==r&&l(p)}}var p=[],r=0;do p.push(void 0),r++,e(h.value).u(q(p.length-1),m),h=g.next();while(!h.done)})};return b});
function H(){H=function(){};E.Symbol||(E.Symbol=da)}function I(a,b){this.a=a;F(this,"description",{configurable:!0,writable:!0,value:b})}I.prototype.toString=function(){return this.a};var da=function(){function a(d){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new I("jscomp_symbol_"+(d||"")+"_"+b++,d)}var b=0;return a}();
function K(){H();var a=E.Symbol.iterator;a||(a=E.Symbol.iterator=E.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&F(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(n(this))}});K=function(){}}function ea(a){K();a={next:a};a[E.Symbol.iterator]=function(){return this};return a}function L(){this.j=!1;this.g=null;this.b=void 0;this.a=1;this.f=this.i=0;this.s=this.c=null}function M(a){if(a.j)throw new TypeError("Generator is already running");a.j=!0}
L.prototype.o=function(a){this.b=a};function N(a,b){a.c={D:b,w:!0};a.a=a.i||a.f}L.prototype.return=function(a){this.c={return:a};this.a=this.f};function O(a,b,d){a.a=d;return{value:b}}L.prototype.v=function(a){this.a=a};function P(a){var b=a.s.splice(0)[0];(b=a.c=a.c||b)?b.w?a.a=a.i||a.f:void 0!=b.v&&a.f<b.v?(a.a=b.v,a.c=null):a.a=a.f:a.a=0}function fa(a){this.a=new L;this.b=a}
function ha(a,b){M(a.a);var d=a.a.g;if(d)return Q(a,"return"in d?d["return"]:function(e){return{value:e,done:!0}},b,a.a.return);a.a.return(b);return R(a)}function Q(a,b,d,e){try{var f=b.call(a.a.g,d);if(!(f instanceof Object))throw new TypeError("Iterator result "+f+" is not an object");if(!f.done)return a.a.j=!1,f;var k=f.value}catch(c){return a.a.g=null,N(a.a,c),R(a)}a.a.g=null;e.call(a.a,k);return R(a)}
function R(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.j=!1,{value:b.value,done:!1}}catch(d){a.a.b=void 0,N(a.a,d)}a.a.j=!1;if(a.a.c){b=a.a.c;a.a.c=null;if(b.w)throw b.D;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function ia(a){this.next=function(b){M(a.a);a.a.g?b=Q(a,a.a.g.next,b,a.a.o):(a.a.o(b),b=R(a));return b};this.throw=function(b){M(a.a);a.a.g?b=Q(a,a.a.g["throw"],b,a.a.o):(N(a.a,b),b=R(a));return b};this.return=function(b){return ha(a,b)};K();this[Symbol.iterator]=function(){return this}}function ja(a){function b(e){return a.next(e)}function d(e){return a.throw(e)}return new Promise(function(e,f){function k(c){c.done?e(c.value):Promise.resolve(c.value).then(b,d).then(k,f)}k(a.next())})}
function S(a){return ja(new ia(new fa(a)))}function ka(a,b){K();a instanceof String&&(a+="");var d=0,e={next:function(){if(d<a.length){var f=d++;return{value:b(f,a[f]),done:!1}}e.next=function(){return{done:!0,value:void 0}};return e.next()}};e[Symbol.iterator]=function(){return e};return e}G("Array.prototype.values",function(a){return a?a:function(){return ka(this,function(b,d){return d})}});
G("Object.entries",function(a){return a?a:function(b){var d=[],e;for(e in b)Object.prototype.hasOwnProperty.call(b,e)&&d.push([e,b[e]]);return d}});function T(a,b,d){if(null==a)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return a+""}
G("String.prototype.startsWith",function(a){return a?a:function(b,d){var e=T(this,b,"startsWith"),f=e.length,k=b.length;d=Math.max(0,Math.min(d|0,e.length));for(var c=0;c<k&&d<f;)if(e[d++]!=b[c++])return!1;return c>=k}});G("String.prototype.repeat",function(a){return a?a:function(b){var d=T(this,null,"repeat");if(0>b||1342177279<b)throw new RangeError("Invalid count value");b|=0;for(var e="";b;)if(b&1&&(e+=d),b>>>=1)d+=d;return e}});try{window.preact=preact}catch(a){window.preact={}}
var U=window.preact,V=U.h,W=U.Component,la=U.render;function ma(a){var b=a.help,d=a.m,e=a.valid,f="text-muted";a.invalid?f="invalid-feedback":e&&(f="valid-feedback");a="form-text "+f;return"string"!=typeof b?V("small",{id:d,className:a},b):V("small",{id:d,className:a,dangerouslySetInnerHTML:{__html:b}})};function na(a){var b=[];a=Object.entries(a).reduce(function(d,e){var f=u(e);e=f.next().value;f=f.next().value;if("col"==e||e.startsWith("col-"))return b.push(e),d;d[e]=f;return d},{});return{C:b,I:a}};function X(){var a=W.call(this)||this;a.id="i"+Math.floor(1E5*Math.random());a.m="h"+a.id;a.props=a.props;return a}C(X,W);X.prototype.getChildContext=function(){return{id:this.id,m:this.m}};
X.prototype.render=function(a){var b=Object.assign({},a),d=a.children,e=a.label,f=a.help,k=a.details,c=a.className,g=a["form-row"],h=void 0===a.row?g:a.row;a=a.labelClassName;b=(delete b.children,delete b.label,delete b.help,delete b.details,delete b.className,delete b["form-row"],delete b.row,delete b.labelClassName,b);c=["form-group",c,h?(g?"form-":"")+"row":null].filter(Boolean).join(" ")||void 0;g=na(b).C;a=[h?"col-form-label":null,a].concat(g instanceof Array?g:aa(u(g))).filter(Boolean).join(" ")||
void 0;e=e?V("label",{className:a,htmlFor:this.id},e):null;f=V(ma,{help:f,m:this.m});return k?V("details",{className:c},V("summary",{},e),d,h?V("div",{className:"col-12"},f):f):V("div",{className:c},e,d,h?V("div",{className:"col-12"},f):f)};function oa(a,b){return b=b||{},new Promise(function(d,e){function f(){return{ok:2==(k.status/100|0),statusText:k.statusText,status:k.status,url:k.responseURL,text:function(){return Promise.resolve(k.responseText)},json:function(){return Promise.resolve(JSON.parse(k.responseText))},blob:function(){return Promise.resolve(new Blob([k.response]))},clone:f,headers:{keys:function(){return c},entries:function(){return g},get:function(m){return h[m.toLowerCase()]},has:function(m){return m.toLowerCase()in
h}}}}var k=new XMLHttpRequest,c=[],g=[],h={},l;for(l in k.open(b.method||"get",a,!0),k.onload=function(){k.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(m,q,p){c.push(q=q.toLowerCase());g.push([q,p]);h[q]=h[q]?h[q]+","+p:p});d(f())},k.onerror=e,k.withCredentials="include"==b.credentials,b.headers)k.setRequestHeader(l,b.headers[l]);k.send(b.body||null)})};function Y(){var a=W.call(this)||this;a.state={values:{}};a.props=a.props;return a}C(Y,W);Y.prototype.getChildContext=function(){return{values:this.state.values,onChange:this.onChange.bind(this)}};Y.prototype.onChange=function(a,b){var d={};this.setState({values:Object.assign({},this.state.values,(d[a]=b,d))});if(this.props.onChange)this.props.onChange(this.state.values)};
Y.prototype.render=function(a){var b=Object.assign({},a),d=a.children,e=a.formRef;a=a.onSubmit;b=(delete b.children,delete b.formRef,delete b.onSubmit,delete b.onChange,b);return V("form",Object.assign({},b,{ref:e,onSubmit:a}),d)};function pa(a,b){var d,e,f="lambda-sub";b=void 0===b?"":b;f=void 0===f?"subscribe":f;var k=void 0===k?"POST":k;var c,g,h,l,m,q,p,r,x,y;return S(function(t){switch(t.a){case 1:return O(t,oa(b+"/vapid"),2);case 2:return c=t.b,O(t,c.text(),3);case 3:g=t.b;if(!g)throw Error("Could not fetch vapid key.");var w="=".repeat((4-g.length%4)%4);w=window.atob((g+w).replace(/-/g,"+").replace(/_/g,"/"));for(var D=new Uint8Array(w.length),J=0;J<w.length;++J)D[J]=w.charCodeAt(J);h=D;return O(t,a.pushManager.subscribe({userVisibleOnly:!0,
applicationServerKey:h}),4);case 4:return l=t.b,m=new FormData,w=JSON.parse(JSON.stringify(l)),D=w.keys,d=w.endpoint,e={l:D.p256dh,B:D.auth},q=d,p=e,r=p.l,x=p.B,m.append("endpoint",q),m.append("p256dh",r),m.append("auth",x),m.append("comments","true"),O(t,oa(b+"/"+f,{method:k,body:m}),5);case 5:return y=t.b,O(t,y.json(),6);case 6:return t.return({l:r})}})};function Z(){return W.apply(this,arguments)||this}C(Z,W);function qa(){var a;return S(function(b){if(1==b.a)return O(b,navigator.serviceWorker.register("/service-worker.js",{scope:"/"}),2);a=b.b;return b.return(a)})}Z.prototype.subscribe=function(){var a=this,b,d,e;return S(function(f){switch(f.a){case 1:return a.setState({loading:!0}),f.i=0,f.f=2,O(f,qa(),4);case 4:return b=f.b,O(f,pa(b,a.props.host),5);case 5:d=f.b,e=d.l,a.setState({l:e});case 2:f.s=[f.c],f.i=0,f.f=0,a.setState({loading:!1}),P(f)}})};
function ra(a){var b,d,e,f,k;S(function(c){switch(c.a){case 1:b=a.state;d=b.l;if(!d)return c.return();a.setState({loading:!0});c.i=0;c.f=2;return O(c,fetch(a.props.host+"/unsubscribe?lambda=true&key="+d),4);case 4:return e=c.b,O(c,e.json(),5);case 5:f=c.b,k=f.comments,!1===k&&a.setState({l:void 0});case 2:c.s=[c.c],c.i=0,c.f=0,a.setState({loading:!1}),P(c)}})}
Z.prototype.render=function(a){var b=this;a=a.disabled;var d=this.state,e=d.l;d=d.loading;return V(X,{"form-row":!0,"col-2":!0,label:"Subscribe",help:"Receive push notifications about package updates."},V("div",{className:"col-10"},V("div",{className:"form-check col-4"},V("input",{checked:a?!1:e,onChange:function(f){if(f.currentTarget.checked)b.subscribe();else{if(!window.confirm("Are you sure you want so unsubscribe? You will stop receiving notifications from ALL comments on the website."))return f.currentTarget.checked=
!0;ra(b)}},disabled:a,type:"checkbox",className:"form-check-input",id:"subscribe"}),V("label",{className:"form-check-label",htmlFor:"subscribe"},!a&&d&&V("span",{style:"color:grey"},"Checking your subscriptions..."),!a&&!d&&e&&V("span",{style:"color:green"},"You've subscribed \ud83d\udc4d")),V("input",{value:e,name:"sub-id",type:"hidden"}))))};la(V(function(){return V(Y,{},V(Z,{host:window.host||"http://localhost:5000"}))}),document.getElementById("preact"));

//# sourceMappingURL=lambda.js.map