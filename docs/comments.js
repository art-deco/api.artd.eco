(function(){function k(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function u(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:k(a)}}function v(a){if(!(a instanceof Array)){a=u(a);for(var b,c=[];!(b=a.next()).done;)c.push(b.value);a=c}return a}var aa="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},x;
if("function"==typeof Object.setPrototypeOf)x=Object.setPrototypeOf;else{var y;a:{var ba={H:!0},z={};try{z.__proto__=ba;y=z.H;break a}catch(a){}y=!1}x=y?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ca=x;
function A(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(ca)ca(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c]}var B="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,C="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
function D(a,b){if(b){var c=B;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];f in c||(c[f]={});c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&C(c,a,{configurable:!0,writable:!0,value:b})}}
D("Promise",function(a){function b(g){this.b=0;this.i=void 0;this.a=[];var e=this.c();try{g(e.resolve,e.reject)}catch(l){e.reject(l)}}function c(){this.a=null}function d(g){return g instanceof b?g:new b(function(e){e(g)})}if(a)return a;c.prototype.b=function(g){if(null==this.a){this.a=[];var e=this;this.c(function(){e.i()})}this.a.push(g)};var f=B.setTimeout;c.prototype.c=function(g){f(g,0)};c.prototype.i=function(){for(;this.a&&this.a.length;){var g=this.a;this.a=[];for(var e=0;e<g.length;++e){var l=
g[e];g[e]=null;try{l()}catch(m){this.g(m)}}}this.a=null};c.prototype.g=function(g){this.c(function(){throw g;})};b.prototype.c=function(){function g(m){return function(n){l||(l=!0,m.call(e,n))}}var e=this,l=!1;return{resolve:g(this.M),reject:g(this.g)}};b.prototype.M=function(g){if(g===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.N(g);else{a:switch(typeof g){case "object":var e=null!=g;break a;case "function":e=!0;break a;default:e=!1}e?this.w(g):this.j(g)}};
b.prototype.w=function(g){var e=void 0;try{e=g.then}catch(l){this.g(l);return}"function"==typeof e?this.O(e,g):this.j(g)};b.prototype.g=function(g){this.m(2,g)};b.prototype.j=function(g){this.m(1,g)};b.prototype.m=function(g,e){if(0!=this.b)throw Error("Cannot settle("+g+", "+e+"): Promise already settled in state"+this.b);this.b=g;this.i=e;this.u()};b.prototype.u=function(){if(null!=this.a){for(var g=0;g<this.a.length;++g)h.b(this.a[g]);this.a=null}};var h=new c;b.prototype.N=function(g){var e=this.c();
g.v(e.resolve,e.reject)};b.prototype.O=function(g,e){var l=this.c();try{g.call(e,l.resolve,l.reject)}catch(m){l.reject(m)}};b.prototype.then=function(g,e){function l(p,q){return"function"==typeof p?function(t){try{m(p(t))}catch(w){n(w)}}:q}var m,n,r=new b(function(p,q){m=p;n=q});this.v(l(g,m),l(e,n));return r};b.prototype.catch=function(g){return this.then(void 0,g)};b.prototype.v=function(g,e){function l(){switch(m.b){case 1:g(m.i);break;case 2:e(m.i);break;default:throw Error("Unexpected state: "+
m.b);}}var m=this;null==this.a?h.b(l):this.a.push(l)};b.resolve=d;b.reject=function(g){return new b(function(e,l){l(g)})};b.race=function(g){return new b(function(e,l){for(var m=u(g),n=m.next();!n.done;n=m.next())d(n.value).v(e,l)})};b.all=function(g){var e=u(g),l=e.next();return l.done?d([]):new b(function(m,n){function r(t){return function(w){p[t]=w;q--;0==q&&m(p)}}var p=[],q=0;do p.push(void 0),q++,d(l.value).v(r(p.length-1),n),l=e.next();while(!l.done)})};return b});
function da(){da=function(){};B.Symbol||(B.Symbol=ea)}function fa(a,b){this.a=a;C(this,"description",{configurable:!0,writable:!0,value:b})}fa.prototype.toString=function(){return this.a};var ea=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new fa("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();
function E(){da();var a=B.Symbol.iterator;a||(a=B.Symbol.iterator=B.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&C(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ha(k(this))}});E=function(){}}function ha(a){E();a={next:a};a[B.Symbol.iterator]=function(){return this};return a}function F(){this.m=!1;this.c=null;this.j=void 0;this.a=1;this.i=this.g=0;this.w=this.b=null}function G(a){if(a.m)throw new TypeError("Generator is already running");a.m=!0}
F.prototype.u=function(a){this.j=a};function H(a,b){a.b={C:b,D:!0};a.a=a.g||a.i}F.prototype.return=function(a){this.b={return:a};this.a=this.i};function I(a,b,c){a.a=c;return{value:b}}F.prototype.s=function(a){this.a=a};function ia(a){a.g=0;var b=a.b.C;a.b=null;return b}function ja(a){this.a=new F;this.b=a}function ka(a,b){G(a.a);var c=a.a.c;if(c)return J(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.a.return);a.a.return(b);return K(a)}
function J(a,b,c,d){try{var f=b.call(a.a.c,c);if(!(f instanceof Object))throw new TypeError("Iterator result "+f+" is not an object");if(!f.done)return a.a.m=!1,f;var h=f.value}catch(g){return a.a.c=null,H(a.a,g),K(a)}a.a.c=null;d.call(a.a,h);return K(a)}function K(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.m=!1,{value:b.value,done:!1}}catch(c){a.a.j=void 0,H(a.a,c)}a.a.m=!1;if(a.a.b){b=a.a.b;a.a.b=null;if(b.D)throw b.C;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function la(a){this.next=function(b){G(a.a);a.a.c?b=J(a,a.a.c.next,b,a.a.u):(a.a.u(b),b=K(a));return b};this.throw=function(b){G(a.a);a.a.c?b=J(a,a.a.c["throw"],b,a.a.u):(H(a.a,b),b=K(a));return b};this.return=function(b){return ka(a,b)};E();this[Symbol.iterator]=function(){return this}}function ma(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,f){function h(g){g.done?d(g.value):Promise.resolve(g.value).then(b,c).then(h,f)}h(a.next())})}
function L(a){return ma(new la(new ja(a)))}function na(a,b){E();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d}D("Array.prototype.values",function(a){return a?a:function(){return na(this,function(b,c){return c})}});
D("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&c.push([d,b[d]]);return c}});
D("String.prototype.startsWith",function(a){return a?a:function(b,c){if(null==this)throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");var d=this.length,f=b.length;c=Math.max(0,Math.min(c|0,this.length));for(var h=0;h<f&&c<d;)if(this[c++]!=b[h++])return!1;return h>=f}});try{window.preact=preact}catch(a){window.preact={}}
var M=window.preact,N=M.h,O=M.Component,oa=M.render;function pa(a){var b=a.help,c=a.l,d=a.valid,f="text-muted";a.invalid?f="invalid-feedback":d&&(f="valid-feedback");a="form-text "+f;return"string"!=typeof b?N("small",{id:c,className:a},b):N("small",{id:c,className:a,dangerouslySetInnerHTML:{__html:b}})};function qa(a,b){var c=this.props,d=c.name,f=a.value;if(this.context.values[d]!=b.values[d])return!0;if(c.value!=f){if(b.onChange)b.onChange(a.name,f);return!1}}function ra(a){var b=[];a=Object.entries(a).reduce(function(c,d){var f=u(d);d=f.next().value;f=f.next().value;if("col"==d||d.startsWith("col-"))return b.push(d),c;c[d]=f;return c},{});return{B:b,L:a}};function P(){var a=O.call(this)||this;a.id="i"+Math.floor(1E5*Math.random());a.l="h"+a.id;a.props=a.props;return a}A(P,O);P.prototype.getChildContext=function(){return{id:this.id,l:this.l}};
P.prototype.render=function(a){var b=Object.assign({},a),c=a.children,d=a.label,f=a.help,h=a.details,g=a.className,e=a["form-row"],l=void 0===a.row?e:a.row;a=a.labelClassName;b=(delete b.children,delete b.label,delete b.help,delete b.details,delete b.className,delete b["form-row"],delete b.row,delete b.labelClassName,b);g=["form-group",g,l?(e?"form-":"")+"row":null].filter(Boolean).join(" ")||void 0;e=ra(b).B;a=[l?"col-form-label":null,a].concat(v(e)).filter(Boolean).join(" ")||void 0;d=d?N("label",
{className:a,htmlFor:this.id},d):null;f=N(pa,{help:f,l:this.l});return h?N("details",{className:g},N("summary",{},d),c,l?N("div",{className:"col-12"},f):f):N("div",{className:g},d,c,l?N("div",{className:"col-12"},f):f)};function Q(){var a=O.call(this)||this;a.props=a.props;return a}A(Q,O);Q.prototype.shouldComponentUpdate=function(a,b,c){return qa.call(this,a,c)};Q.prototype.componentDidMount=function(){var a=this.props,b=u(a.children).next().value;a=a.name;var c=this.context.onChange;b&&c(a,b.trim())};
Q.prototype.render=function(a){var b=Object.assign({},a),c=void 0===a.rows?3:a.rows,d=a.required,f=a.name,h=a.placeholder;a=a.children;b=(delete b.rows,delete b.required,delete b.name,delete b.placeholder,delete b.children,b);var g=this.context,e=g.onChange,l=void 0===g.values?{}:g.values,m=f in l;return N("textarea",Object.assign({},b,{required:d,name:f,placeholder:h,"aria-describedby":g.l,className:"form-control",id:g.id,onChange:function(n){e(f,n.currentTarget.value)},rows:c}),m?l[f]:a)};function R(){var a=O.call(this)||this;a.props=a.props;return a}A(R,O);R.prototype.shouldComponentUpdate=function(a,b,c){return qa.call(this,a,c)};R.prototype.componentDidMount=function(){var a=this.props,b=a.value;a=a.name;var c=this.context.onChange;void 0!==b&&c&&c(a,b)};R.prototype.onChange=function(a){this.context.onChange(this.props.name,a)};
R.prototype.render=function(a){var b=this,c=Object.assign({},a),d=a.required,f=a.name,h=a.placeholder,g=void 0===a.type?"text":a.type,e=a.file,l=a.value,m=a.className,n=a.invalid,r=a.valid;a=a.help;c=(delete c.required,delete c.name,delete c.placeholder,delete c.type,delete c.file,delete c.value,delete c.className,delete c.invalid,delete c.valid,delete c.help,c);var p=ra(c);c=p.B;p=p.L;m=["form-control"+(e?"-file":""),m,n?"is-invalid":null,r?"is-valid":null].filter(Boolean).join(" ");var q=this.context;
e=q.l;var t=void 0===q.values?{}:q.values;d=N("input",Object.assign({},p,{required:d,name:f,placeholder:h,className:m,value:f in t?t[f]:l,type:g,"aria-describedby":e,id:q.id,onChange:function(w){b.onChange(w.currentTarget.value)}}));return c.length?(n=a?N(pa,{help:a,l:e,valid:r,invalid:n}):null,N("div",{className:c.join(" ")},d,n)):d};function sa(a,b){return b=b||{},new Promise(function(c,d){function f(){return{ok:2==(h.status/100|0),statusText:h.statusText,status:h.status,url:h.responseURL,text:function(){return Promise.resolve(h.responseText)},json:function(){return Promise.resolve(JSON.parse(h.responseText))},blob:function(){return Promise.resolve(new Blob([h.response]))},clone:f,headers:{keys:function(){return g},entries:function(){return e},get:function(n){return l[n.toLowerCase()]},has:function(n){return n.toLowerCase()in
l}}}}var h=new XMLHttpRequest,g=[],e=[],l={},m;for(m in h.open(b.method||"get",a,!0),h.onload=function(){h.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(n,r,p){g.push(r=r.toLowerCase());e.push([r,p]);l[r]=l[r]?l[r]+","+p:p});c(f())},h.onerror=d,h.withCredentials="include"==b.credentials,b.headers)h.setRequestHeader(m,b.headers[m]);h.send(b.body||null)})};function S(){var a=O.call(this)||this;a.props=a.props;a.state={formLoading:!1,error:null,success:null};a.a={};return a}A(S,O);
S.prototype.b=function(a){var b=this,c,d,f,h,g;return L(function(e){switch(e.a){case 1:a.preventDefault();if(!b.props.path)return b.setState({error:"Path is not set in the properties of the form."}),e.return(!1);b.setState({error:null,success:null});c=new FormData(a.target);b.setState({formLoading:!0});e.g=2;e.i=3;return I(e,sa(b.props.path,Object.assign({},{method:"POST",body:c},b.a)),5);case 5:return d=e.j,I(e,d.json(),6);case 6:f=e.j,(h=f.error)?b.setState({error:h}):b.setState({success:1});case 3:e.w=
[e.b];e.g=0;e.i=0;b.setState({formLoading:!1});var l=e.w.splice(0)[0];(l=e.b=e.b||l)?l.D?e.a=e.g||e.i:void 0!=l.s&&e.i<l.s?(e.a=l.s,e.b=null):e.a=e.i:e.a=4;break;case 2:g=ia(e);b.setState({error:g});e.s(3);break;case 4:if(!b.props.submitFinish){e.s(7);break}return I(e,b.props.submitFinish(d),7);case 7:return e.return(!1)}})};function T(){var a=O.call(this)||this;a.state={values:{}};a.props=a.props;return a}A(T,O);T.prototype.getChildContext=function(){return{values:this.state.values,onChange:this.onChange.bind(this)}};T.prototype.onChange=function(a,b){var c={};this.setState({values:Object.assign({},this.state.values,(c[a]=b,c))});if(this.props.onChange)this.props.onChange(this.state.values)};
T.prototype.render=function(a){var b=Object.assign({},a),c=a.children,d=a.formRef;a=a.onSubmit;b=(delete b.children,delete b.formRef,delete b.onSubmit,delete b.onChange,b);return N("form",Object.assign({},b,{ref:d,onSubmit:a}),c)};
function ta(a){var b=Object.assign({},a),c=a.disabled,d=a.loading,f=a.confirmText,h=void 0===a.loadingText?f:a.loadingText,g=a.className,e=void 0===a.type?"primary":a.type;a=void 0===a.outline?!1:a.outline;b=(delete b.disabled,delete b.loading,delete b.confirmText,delete b.loadingText,delete b.className,delete b.type,delete b.outline,b);g=["btn","btn-"+(a?"outline-":"")+e,g].filter(Boolean);return N("button",Object.assign({},b,{className:g.join(" "),type:"submit",disabled:c||d}),d&&N("span",{className:"spinner-border spinner-border-sm"+
(h?" mr-2":""),role:"status","aria-hidden":"true"}),d?h:f)};function ua(a){var b=a.linkedin_user;a=a.github_user;var c;if(b)var d=b.profilePicture;else a&&(d=a.avatar_url);b?c=b.firstName+" "+b.lastName:a&&(c=a.name||a.login);return{G:d,name:c}};function U(){var a=S.call(this)||this;a.a={credentials:"include"};a.state.I=void 0;return a}A(U,S);U.prototype.componentWillMount=function(){var a=this,b,c,d;return L(function(f){switch(f.a){case 1:return f.g=2,I(f,fetch("https://freegeoip.app/json/",{}),4);case 4:return b=f.j,I(f,b.json(),5);case 5:c=f.j;(d=c.country_code)&&a.setState({I:d});f.a=0;f.g=0;break;case 2:ia(f),f.a=0}})};
U.prototype.render=function(a){var b=this,c=Object.assign({},a),d=a.onChange;a=a.f;c=(delete c.onChange,delete c.host,delete c.f,c);var f=this.state,h=f.formLoading,g=f.error;f=f.success;var e=ua(a),l=e.G;e=e.name;var m=a.github_user||a.linkedin_user;return N(T,Object.assign({},c,{onSubmit:this.b.bind(this),onChange:function(n){b.setState({error:null,success:null});d&&d(n)}}),l&&N(R,{value:l,type:"hidden",name:"photo"}),N(R,{value:a.csrf,type:"hidden",name:"csrf"}),N(P,{"form-row":!0,"col-2":!0,label:"Name*",
help:"This will appear on the website"},N(R,{disabled:!m,value:e,"col-10":!0,name:"name"})),N(P,{help:a.github_user?"GitHub username, sign out to remove":"Please sign in with GitHub","form-row":!0,"col-2":!0,label:"GitHub"},N(R,{value:a.github_user?a.github_user.html_url:null,"col-5":!0,name:"github",disabled:!0}),a.github_user&&N("div",{className:"form-check form-check-inline col-4"},N("input",{type:"checkbox",className:"form-check-input",id:"defaultCheck2",name:"hide-github"}),N("label",{className:"form-check-label",
htmlFor:"defaultCheck2"},"Hide from public"))),N(P,{"form-row":!0,"col-2":!0,label:"Comment*",help:"Please enter your opinion"},N("div",{className:"col-10"},N(Q,{disabled:!m,required:!0,name:"comment"},"I think you're right/wrong because..."))),N(ta,{disabled:!m,loading:h,type:"warning",confirmText:"Submit Data"}),g&&"Error: "+g,f&&"Comment has been submitted!")};function V(a,b,c){function d(){var m=[],n=[],r={},p;e.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(q,t,w){m.push(t=t.toLowerCase());n.push([t,w]);p=r[t];r[t]=p?p+","+w:w});return{ok:2==(e.status/100|0),status:e.status,statusText:e.statusText,url:e.responseURL,clone:d,text:function(){return e.responseText},json:function(){return JSON.parse(e.responseText)},blob:function(){return new Blob([e.response])},headers:{keys:function(){return m},entries:function(){return n},get:function(q){return r[q.toLowerCase()]},
has:function(q){return q.toLowerCase()in r}}}}c=void 0===c?{}:c;var f=void 0===c.headers?{}:c.headers,h=c.credentials,g=void 0===c.body?null:c.body,e=new XMLHttpRequest;e.open(void 0===c.method?"get":c.method,a,!0);for(var l in f)e.setRequestHeader(l,f[l]);e.withCredentials="include"==h;e.onload=function(){b(null,d())};e.onerror=function(){b("Could not load the resource at "+a+".")};e.send(g)};function W(){var a=O.call(this)||this;a.state={loading:!0,error:null,f:{}};a.a=a.b.bind(a);window.addEventListener("message",a.a,!1);return a}A(W,O);W.prototype.componentDidMount=function(){this.f()};W.prototype.f=function(){var a=this;this.setState({loading:!0});V(this.props.host+"/auth",function(b,c){a.setState({loading:!1});if(b)return a.setState({error:b});b=c.json();a.setState({f:b})},{credentials:"include"})};W.prototype.b=function(a){a.origin==this.props.host&&"signedin"==a.data&&this.f()};
W.prototype.componentWillUnmount=function(){window.removeEventListener("message",this.a)};function va(a){var b=void 0===b?{}:b;var c=window.top,d=c.outerHeight,f=c.screenY,h=[];h.push("width=500","left="+(c.outerWidth/2+c.screenX-250));h.push("top="+(d/2+f-305-50),"height=610");c=Object.keys(b).map(function(g){return g+"="+b[g]});h.push.apply(h,v(c));window.open(a,"Sign In",h.join(","))};function X(a){a=void 0===a?"":a;var b=document.head,c=document.createElement("style");c.type="text/css";c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a));b.appendChild(c)};X(".LinkedInButton {\n  background: #0077B5;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: white !important;\n  cursor: pointer;\n}\n.LinkedInButton .LinkedInIn {\n  font-family: 'Myriad Pro', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;\n  padding-left: 6px;\n  padding-right: 5px;\n  border-right: 1px solid #0369A0;\n  border-radius: 3px;\n  font-weight: 600;\n  background: #0077B5;\n  display: table-cell;\n  vertical-align: middle;\n}\n.LinkedInButton .LinkedInText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}");function wa(a){var b=void 0===a.size?"medium":a.size,c=a.host,d=void 0===a.A?"/linkedin":a.A,f;"medium"==b?f=1.5:"large"==b&&(f=2);return N("a",{onClick:function(h){h.preventDefault();va(""+c+d);return!1},onMouseOver:function(h){h.currentTarget.style.background="#0369A0"},onMouseOut:function(h){h.currentTarget.style.background="#0077B5"},className:"LinkedInButton"},N("div",{style:"font-size:"+f+"rem;",className:"LinkedInIn"},"in"),N("div",{className:"LinkedInText"},"Sign In With LinkedIn"))};function xa(a){return N("svg",Object.assign({},a,{role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}),N("title",{},"GitHub icon"),N("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}))}
;X(".GitHubButton {\n  background: #dfdfdf;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: black !important;\n  cursor: pointer;\n}\n.GitHubButton .GitHubLogo {\n  padding: 0px 6px 0px 5px;\n  border-right: 1px solid #bcbcbc;\n  border-radius: 3px;\n  font-weight: 600;\n  background: rgb(223, 223, 223);\n  display: table-cell;\n  vertical-align: middle;\n}\n.GitHubButton .GitHubText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}");function ya(a){var b=void 0===a.size?"medium":a.size,c=a.host,d=void 0===a.A?"/github":a.A,f;"medium"==b?f=1.5:"large"==b&&(f=2);return N("a",{onClick:function(h){h.preventDefault();va(""+c+d);return!1},onMouseOver:function(h){h.currentTarget.style.background="#bcbcbc"},onMouseOut:function(h){h.currentTarget.style.background="#DFDFDF"},className:"GitHubButton"},N("div",{style:"height:"+f+"rem;font-size:"+f+"rem",className:"GitHubLogo"},N(xa,{height:"100%",style:"margin-top:-4px"})),N("div",{className:"GitHubText"},
"Sign In With GitHub"))};function za(a,b,c){var d=new FormData;d.append("csrf",b);V(a+"/signout",function(f,h){if(f)return c(f);f=h.json().error;c(f)},{method:"POST",headers:{P:"application/json"},body:d,credentials:"include"})}
function Aa(a){var b=a.f,c=void 0===a.F?function(){}:a.F,d=a.host;a=b.github_user;var f=b.csrf;if(!b.linkedin_user&&!a)return null;b=ua(b);a=b.name;return N("div",{},N("img",{src:b.G,width:"50"}),"Hello, ",a,"!"," ",N("a",{onClick:function(h){h.preventDefault();za(d,f,function(g){g?alert("Could not sign out: "+g+". Please refresh the page and try again. Alternatively, clear your cookies."):c()});return!1},href:"#"},"Sign Out"))};function Ba(a){var b=a.error,c=a.loading,d=a.f,f=a.K;a=a.host;return b?N("div",{},"Error: ",b):c?N("div",{},"Loading..."):N("div",{},!(d.linkedin_user||d.github_user)&&N("span",{style:"display:block"},"Please sign in to leave comments. No advanced permissions are required other than default ones (no email). Your public LinkedIn ID remains unknown. ",N("a",{href:"/privacy-policy.html"},"Privacy Policy")),N(Aa,{f:d,F:f,host:a}),!d.linkedin_user&&N(wa,{host:a}),!d.linkedin_user&&" ",!d.github_user&&
N(ya,{host:a}))};X(".LCommentBlock {\n  display:table;\n  hyphens:auto;\n  -webkit-hyphens:auto;\n  word-break:break-word;\n}\n.LCommentBlock > div {\n  display: table-cell;\n  vertical-align: middle;\n}\n.LCommentBlock img {\n  margin-right: .5rem;\n  border-radius: 1.75rem;\n  width: 3.5rem;\n}");function Y(){var a=O.call(this)||this;a.state={o:[],page:0,csrf:null};return a}A(Y,O);Y.prototype.componentDidMount=function(){this.fetch()};Y.prototype.fetch=function(a){var b=this;this.setState({loading:!0});V(this.props.host+"/json-comments"+(a?"?id="+a:""),function(c,d){b.setState({loading:!1});if(c)return b.setState({error:c});c=d.json();d=c.csrf;b.setState({o:v(c.comments).concat(v(b.state.o)),csrf:d})},{credentials:"include"})};
Y.prototype.render=function(){var a=this,b=this.state,c=b.error,d=b.loading,f=b.o,h=b.csrf;return c?N("div",{},"Error loading list: ",c):d?N("div",{},"Loading list..."):N("div",{className:"CommentsList"},f.map(function(g){return N(Ca,{key:g._id,comment:g,csrf:h,host:a.props.host,J:function(e){a.setState({o:a.state.o.filter(function(l){return l._id!=e})})}})}))};function Da(a){return(a=a.github_user)?N("span",{}," (",N("a",{href:a.html_url},a.login),")"):null}
function Ca(a){var b=a.comment,c=b._id,d=b.country,f=b.isAuthor,h=b.photo,g=b.comment,e=b.date,l=b.github_user,m=a.J,n=a.csrf,r=a.host;return N("div",{className:"comment"},N("strong",{},b.name||"Anonymous"),N(Da,{github_user:l}),d?" from "+d:""," ","on ",N("em",{},(new Date(e)).toLocaleString())," ",f&&N("a",{onClick:function(p){p.preventDefault();confirm("Are you sure you want to delete comment?")&&V(r+"/remove-comment?csrf="+n+"&id="+c,function(q,t){if(q)return alert(q);(q=t.json().error)?alert(q):
t&&m(c)},{credentials:"include"});return!1},href:"#"},"Remove"),N("div",{className:"LCommentBlock"},h&&N("div",{},N("img",{src:h})),N("div",{},g)))};function Z(){var a=W.call(this)||this;a.list=null;return a}A(Z,W);
Z.prototype.render=function(){var a=this;return N("div",{},N(Ba,{error:this.state.error,loading:this.state.loading,f:this.state.f,host:this.props.host,K:function(){a.setState({f:{}})}}),N(U,{host:this.props.host,path:this.props.host+"/comment",f:this.state.f,submitFinish:function(b){var c,d,f;return L(function(h){if(1==h.a)return I(h,b.json(),2);c=h.j;d=c.error;f=c.id;!d&&f&&a.list&&a.list.fetch(f);h.a=0})}}),N(Y,{host:this.props.host,ref:function(b){a.list=b}}))};
window.comments=function(a){var b=void 0===a.container?"preact":a.container;oa(N(Z,{host:void 0===a.host?"https://api.artd.eco":a.host}),document.getElementById(b))};}).call(this);

//# sourceMappingURL=comments.js.map