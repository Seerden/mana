(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,t,a){},27:function(e,t,a){e.exports=a(62)},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(26),l=a.n(c),s=(a(32),a(4)),o=a(1),u=(a(33),a(2)),i=function(e,t,a){Object(n.useEffect)((function(){t&&console.log("".concat(e," changed:"),t)}),[e,t,a])},m=Object(n.createContext)(null),f=Object(n.memo)((function(e){var t=Object(n.useState)((function(){})),a=Object(u.a)(t,2),c=a[0],l=a[1];return Object(n.useEffect)((function(){l("seerden")}),[]),i("username",c,l),r.a.createElement(m.Provider,{value:{user:c}},e.children)})),d=(a(34),Object(n.memo)((function(){var e=Object(n.useContext)(m).user;return r.a.createElement("div",{className:"Header"},r.a.createElement("nav",null,r.a.createElement("span",{id:"Logo"},"Mana"),r.a.createElement(s.c,{className:"NavLink",to:"/"},"Home"),r.a.createElement(s.c,{className:"NavLink",to:"/u/".concat(e,"/lists")},"Lists"),r.a.createElement(s.c,{className:"NavLink",to:"/u/".concat(e,"/sets")},"Sets")))}))),v=a(3),p=a(6),E=function(){return{location:Object(o.f)(),navigate:Object(o.g)(),params:Object(o.h)()}},b=a(7),O=a.n(b),j=a(11),h=a(9),g=a.n(h),_=function(){var e=Object(j.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g.a.get("/db/list/",{params:t}).then((function(e){return e.data})).catch((function(e){return console.log(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(j.a)(O.a.mark((function e(t,a){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g.a.post("/db/list/update",{data:{query:t,body:a}}).then((function(e){return e.data})).catch((function(e){throw console.log(e.response),new Error(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),w=function(){var e=Object(j.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g.a.get("/db/listsbyuser/".concat(t)).then((function(e){return e.data})).catch((function(e){return console.log("Error fetching from database:",e)})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(e){var t=e.term,a=Object(n.useState)("from"),c=Object(u.a)(a,2),l=c[0],s=c[1],o=Object(n.useState)(!1),i=Object(u.a)(o,2),m=i[0],f=i[1],d=Object(n.useState)(!1),v=Object(u.a)(d,2),p=v[0],E=v[1];Object(n.useEffect)((function(){return window.addEventListener("keyup",b),function(){window.removeEventListener("keyup",b)}}),[l]),Object(n.useEffect)((function(){s("from"),E(!0),setTimeout((function(){return E(!1)}),150)}),[t]);var b=function(e){["ArrowUp","ArrowDown"].includes(e.code)&&O()},O=function(){f(!0),setTimeout((function(){return f(!1)}),250),setTimeout((function(){return s("from"===l?"to":"from")}),125)};return r.a.createElement("div",{className:"Review__current ReviewCard ".concat(p?"fadein":""," ").concat(m?"flip":"")},t[l])},y=(a(55),a(13)),S=a.n(y),k=Object(n.memo)((function(e){var t=E().params,a=Object(n.useState)((function(){return new Date})),c=Object(u.a)(a,2),l=c[0],o=(c[1],Object(n.useState)(!1)),i=Object(u.a)(o,2),m=i[0],f=i[1],d=Object(n.useState)(null),b=Object(u.a)(d,2),O=b[0],j=b[1],h=Object(n.useState)(0),g=Object(u.a)(h,2),w=g[0],y=g[1],k=Object(n.useReducer)((function(e,t){switch(t.type){case"init":return t.payload;case"pass":return e.slice(1);case"fail":var a=Math.floor((e.length+1)*Math.random()),n=Object(p.a)(e),r=n.shift();return n.splice(a,0,r),n;default:return e}}),[]),x=Object(u.a)(k,2),C=x[0],T=x[1],F=Object(n.useState)(null),R=Object(u.a)(F,2),D=R[0],M=R[1],B=Object(n.useState)(0),I=Object(u.a)(B,2),A=I[0],H=I[1],P=Object(n.useRef)(null),V=Object(n.useRef)(null);Object(n.useEffect)((function(){_({_id:t.id}).then((function(e){j(e);var t=function(e,t){for(var a=[],n=function(){for(var t,a=Object(p.a)(e),n=[],r=a.length-1;r>0;){var c=[a[t=Math.floor((r+1)*Math.random())],a[r]];a[r]=c[0],a[t]=c[1],n.push(t),r-=1}return a},r=0;r<t;)a=[].concat(Object(p.a)(a),Object(p.a)(n())),r++;return a}(e.content,2);T({type:"init",payload:t})}))}),[]),Object(n.useEffect)((function(){if(C.length>0&&M(r.a.createElement(L,{key:"card-".concat(C[0].from),term:C[0]})),O&&C){var e=2*O.content.length,t=e-C.length;H(Math.floor(100*t/e))}return window.addEventListener("keydown",U),function(){return window.removeEventListener("keydown",U)}}),[C]);var U=function(e){var t;switch(e.code){case"ArrowLeft":t=P;break;case"ArrowRight":t=V;break;default:return}t.current&&(t.current.focus(),t.current.click(),setTimeout((function(){t.current&&t.current.blur()}),100))};function Y(e,a){var n=function(e,t){var a=O.content,n=a.findIndex((function(t){return t.to===e.to&&t.from===e.from}));if(a[n].history&&0!==a[n].history.length||(a[n].history=[{date:Date.now(),content:[]}]),a[n].history.length>0){var r=a[n].history.length,c=a[n].history[r-1];S()(c.date)<S()(l)?a[n].history.push({date:l,content:[t]}):a[n].history[r-1].content.push(t)}var s=Object(v.a)(Object(v.a)({},O),{},{content:Object(p.a)(a)});return j(s),s}(C[0],a);if(T({type:a}),"pass"===a&&y(w+1),w===2*O.content.length-1&&"pass"===a){var r=new Date;f(r),n.sessions.push({start:l,end:r,numTerms:2*n.content.length}),N({_id:t.id,owner:O.owner},n)}}return r.a.createElement("div",{className:"Review"},O&&r.a.createElement("div",{className:"Review__title"},"Reviewing",r.a.createElement("span",{className:"Review__title--name"},O.name),"by",r.a.createElement("span",{className:"Review__title--owner"},O.owner)),!m&&D&&r.a.createElement(r.a.Fragment,null,D,r.a.createElement("div",{className:"Review__buttons"},r.a.createElement("input",{ref:P,onClick:function(e){return Y(0,"fail")},className:"Review-button fail",type:"button",value:"Fail"}),r.a.createElement("input",{ref:V,onClick:function(e){return Y(0,"pass")},className:"Review-button pass",type:"button",value:"Pass"})),r.a.createElement("div",{className:"Review-progress__wrapper"},r.a.createElement("div",{id:"Review-progress__bar",style:{width:"".concat(A,"%")}}))),m&&r.a.createElement("div",{className:"Review__post"},r.a.createElement("h2",null,"Session completed."),r.a.createElement("div",null,"Started on ",l.toISOString()),r.a.createElement("div",null,"Completed on ",m.toISOString()),r.a.createElement(s.b,{className:"Link-button",to:"/u/".concat(O.owner,"/list/").concat(t.id)},"Back to list"),r.a.createElement(s.b,{className:"Link-button",to:"/u/".concat(O.owner,"/lists")},"My lists")),!O&&r.a.createElement("div",{className:"Loading"},"Loading list..."))})),x=(a(56),a(10)),C=Object(n.memo)((function(e){var t=e.initialState,a=e.editState,c=Object(n.useState)(!1),l=Object(u.a)(c,2),s=l[0],o=l[1];return r.a.createElement(r.a.Fragment,null,!s&&r.a.cloneElement(t,{onClick:function(){return o(!0)}}),s&&r.a.createElement("div",{onBlur:function(){return o(!1)}},a))})),T=Object(n.memo)((function(e){var t=e._term,a=e.handleTermEdit,n=e.side;return r.a.createElement("input",{autoFocus:!0,autoCorrect:"false",className:"List__term-input",onBlur:function(e){return a(e,n)},type:"text",name:"",id:"",defaultValue:t[n]})})),F=Object(n.createContext)(null),R=function(e){var t=Object(n.useState)((function(){})),a=Object(u.a)(t,2),c=a[0],l=a[1];return r.a.createElement(F.Provider,{value:{listContextValue:c,setListContextValue:l}},e.children)},D=Object(n.memo)((function(e){var t=e.handleTermDelete,a=e.term,c=e.idx,l=Object(n.useState)((function(){return{from:a.from,to:a.to}})),s=Object(u.a)(l,2),o=s[0],i=s[1],m=Object(n.useState)(!1),f=Object(u.a)(m,2),d=f[0],E=f[1],b=Object(n.useState)(!1),O=Object(u.a)(b,2),j=O[0],h=O[1],g=Object(n.useState)(!1),_=Object(u.a)(g,2),w=_[0],L=_[1],y=Object(n.useContext)(F),S=y.listContextValue,k=y.setListContextValue,R={gridTemplateColumns:j?"2rem minmax(40%, min-content) repeat(2, auto)":"2rem repeat(2, minmax(40%, min-content)) 2rem"},D={backgroundColor:j?"":null,border:j?"2px solid orangered":null};Object(n.useEffect)((function(){return function(){E(!1),h(!1),L(!1)}}),[]);var M=function(e,a){e.preventDefault(),h(!1),"delete"===a.type&&t(c)},B=function(e,t){if(e.target.value&&o[t]!==e.target.value){var a=Object(v.a)(Object(v.a)({},o),{},Object(x.a)({},t,e.target.value));i(a);var n=Object(p.a)(S.content);n[c]=Object(v.a)({},a);var r=Object(v.a)(Object(v.a)({},S),{},{content:Object(p.a)(n)});k(r),N({_id:S._id,owner:S.owner},r).then((function(e){return console.log("List updated in database",e)}))}};return r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{onMouseEnter:function(){return L(!0)},onMouseLeave:function(){return L(!1)},className:"List__term",style:Object(v.a)(Object(v.a)({},R),D)},r.a.createElement("div",{className:"List__term-index"},c+1),r.a.createElement(C,{initialState:r.a.createElement("div",{title:"Click to edit",className:"List__term-from"},o.from),editState:r.a.createElement(T,{_term:o,handleTermEdit:B,side:"from"})}),r.a.createElement(C,{initialState:r.a.createElement("div",{title:"Click to edit",className:"List__term-to"},o.to),editState:r.a.createElement(T,{_term:o,handleTermEdit:B,side:"to"})}),!d&&j&&r.a.createElement("span",{className:"List__term-remove-confirm"},r.a.createElement("input",{title:"Permanently delete term",onClick:function(e){return M(e,{type:"delete"})},className:"remove-confirm-button remove-remove",type:"button",value:"delete"}),r.a.createElement("input",{title:"Keep term",onClick:function(e){return M(e,"keep")},className:"remove-confirm-button remove-keep",type:"button",value:"keep"})),!d&&w&&!j&&r.a.createElement("input",{onClick:function(){return h(!0)},className:"List__term-remove",type:"button",value:"x"})))})),M=(a(57),function(e){var t=e.session,a=t.start,n=t.end,c=t.numTerms,l=function(e){return S()(e).format("YYYY-MM-DD HH:mm")};return r.a.createElement("div",{className:"Session__Wrapper"},r.a.createElement("div",{className:"Session"},r.a.createElement("div",{className:"Session__start"},l(a)),r.a.createElement("div",{className:"Session__end"},l(n)),r.a.createElement("div",{className:"Session__numTerms"},c)))}),B=function(e){var t=e.sessions;return r.a.createElement("div",{className:"Sessions"},t&&t.length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Sessions__title"},"Sessions"),r.a.createElement("div",{className:"Sessions__sessions"},r.a.createElement("div",{className:"Sessions__header"},r.a.createElement("span",null,"Start"),r.a.createElement("span",null,"End"),r.a.createElement("span",null,"# Terms")),t&&t.reverse().map((function(e){return r.a.createElement(M,{key:"session-".concat(e.start),session:e})})))))},I=Object(n.memo)((function(e){var t=Object(n.useState)(null),a=Object(u.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(null),i=Object(u.a)(o,2),m=i[0],f=i[1],d=E(),p=d.params,b=d.location,O=Object(n.useContext)(F),j=O.listContextValue,h=O.setListContextValue;function g(e){var t=Object(v.a)({},c);t.content.splice(e,1),l(t),h(t),N({_id:t._id,owner:t.owner},t).then((function(e){return console.log("removed item from list in db")}))}return Object(n.useEffect)((function(){_({_id:p.id}).then((function(e){l(e),h(e)}))}),[]),Object(n.useEffect)((function(){c&&c.content&&c.content.length>0&&f(c.content.map((function(e,t){var a={handleTermDelete:g,key:"list-term-".concat(e.to,"-").concat(e.from),idx:t,term:e};return r.a.createElement(D,a)})))}),[c]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"List"},!c&&"Loading list...",c&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{className:"List__name"},c.name," (",c.from," to ",c.to,")"),r.a.createElement(s.b,{className:"Link-button",to:"".concat(b.pathname,"/review")},"Review!"),r.a.createElement("div",{className:"List__content"},r.a.createElement("div",{className:"List__content--terms"},r.a.createElement("div",{className:"List__content--header"},"Terms"),r.a.createElement("div",{className:"Terms__header"},r.a.createElement("div",{className:"Terms__header--index"},"#"),r.a.createElement("div",{className:"Terms__header--from"},"From"),r.a.createElement("div",{className:"Terms__header--to"},"To")),r.a.createElement("ul",null,m)),r.a.createElement("div",{className:"List__content--sessions"},j&&j.sessions&&j.sessions.length>0?r.a.createElement(B,{sessions:j&&j.sessions?j.sessions:null}):r.a.createElement("div",null,"No sessions recorded for this list"))))))})),A=function(){var e=Object(j.a)(O.a.mark((function e(t,a){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("/db/u/".concat(t).concat(a.populate?"?populate=".concat(a.populate):"")).then((function(e){return e.data})).catch((function(e){throw new Error("Error getting user from database")}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),H=function(e){var t=E().params.username,a=Object(n.useState)(null),c=Object(u.a)(a,2),l=c[0],s=c[1];return Object(n.useEffect)((function(){A(t,{populate:"lists"}).then((function(e){s(e),console.log(e)}))}),[t]),r.a.createElement("div",{className:"User"},r.a.createElement("h1",null,"User page for /u/",r.a.createElement("strong",null,t)),r.a.createElement("div",{className:"User-info"},l&&JSON.stringify(l)))},P=(a(58),function(e){return r.a.createElement("div",{className:"Sets PageComponent"},r.a.createElement("div",{className:"Sets__header PageHeader"},"Sets overview"))}),V=(a(59),Object(n.memo)((function(e){var t=E(),a=t.params,c=t.location,l=Object(n.useState)(null),o=Object(u.a)(l,2),m=o[0],f=o[1],d=Object(n.useState)(""),v=Object(u.a)(d,2),p=v[0],b=v[1],O=Object(n.useState)(null),j=Object(u.a)(O,2),h=j[0],g=j[1];i("location",c),Object(n.useEffect)((function(){w(a.username).then((function(e){f(e),g(_(e,p))})).catch((function(e){return e}))}),[]);var _=function(e,t){return e.map((function(e,n){if(t&&t.length>0&&e.name.toLowerCase().includes(t.toLowerCase())||0===t.length||""===t)return r.a.createElement("div",{key:"link-list-".concat(n),className:"Link-div"},r.a.createElement("div",{className:"Link-div__link"},r.a.createElement(s.b,{className:"Lists-link",to:"/u/".concat(a.username,"/list/").concat(e._id)},e.name)),r.a.createElement("div",{className:"Lists__list--languages"},r.a.createElement("span",null,e.from),r.a.createElement("span",null,e.to)))})).filter((function(e){return void 0!==e}))};return r.a.createElement("div",{className:"ListsByUser"},r.a.createElement("h1",{className:"PageHead"},"Lists by u/",a.username),r.a.createElement(s.b,{className:"Link-button",to:"".concat(c.pathname,"/new")},"New"),!m&&r.a.createElement("div",null,"Loading lists..."),m&&r.a.createElement("div",{className:"Lists__filter"},r.a.createElement("span",{id:"Lists__filter--value"},p?"Filtering by '".concat(p,"'"):"Showing all lists"),r.a.createElement("input",{autoFocus:!0,onChange:function(e){var t=e.currentTarget.value;b(t),g(_(m,t))},placeholder:"filter lists by name",id:"Lists__filter--filter",type:"text",name:"filter",value:p})),m&&r.a.createElement("div",{className:"Lists__wrapper"},h))}))),U=(a(25),a(60),Object(n.memo)((function(e){var t=e.index,a=e.formOutput,n=e.setFormOutput,c=function(e,t){e.preventDefault(),t-=1;var r=Object(v.a)({},a);!r.content[t]&&e.target.value&&(r.content[t]={to:"",from:""}),e.target.value&&e.target.value!==r.content[t][e.target.name]&&(r.content[t][e.target.name]=e.target.value,n(Object(v.a)(Object(v.a)({},a),{},{content:r.content})))};return r.a.createElement("div",{className:"Term-fromto"},r.a.createElement("input",{onBlur:function(e){return c(e,t)},type:"text",name:"from"}),r.a.createElement("input",{onBlur:function(e){return c(e,t)},type:"text",name:"to"}))}))),Y=(a(61),Object(n.memo)((function(e){var t=e.formOutput,a=e.setFormOutput,n=function(e){e.preventDefault();var n=e.currentTarget;n.value&&n.value&&t.languages[n.name]!==n.value&&a(Object(v.a)(Object(v.a)({},t),{},{languages:Object(v.a)(Object(v.a)({},t.languages),{},Object(x.a)({},n.name,n.value))}))};return r.a.createElement("div",{className:"LanguageInput__wrapper"},r.a.createElement("div",{className:"LanguageInput__header"},"Languages"),r.a.createElement("div",{className:"LanguageInput"},r.a.createElement("div",{className:"LanguageInput__side"},r.a.createElement("label",{htmlFor:"from"},"Main"),r.a.createElement("input",{onBlur:n,type:"text",name:"from"})),r.a.createElement("div",{className:"LanguageInput__side"},r.a.createElement("label",{htmlFor:"to"},"Secondary"),r.a.createElement("input",{onBlur:n,type:"text",name:"to"}))))}))),J=Object(n.memo)((function(e){var t=E().params,a=Object(n.useState)(10),c=Object(u.a)(a,2),l=c[0],s=c[1],o=[],i=Object(n.useState)((function(){return{listName:"",languages:{from:"",to:""},content:new Array(l)}})),m=Object(u.a)(i,2),f=m[0],d=m[1];Object(n.useEffect)((function(){(f.content.filter((function(e){return null!==e})).length>0||""!==f.languages.from||""!==f.languages.to)&&console.log(f)}),[f]);for(var p=0;p<l;p++)o.push(r.a.createElement("div",{key:"NewList-term-".concat(p),className:"NewList__Terms-term"},r.a.createElement("div",{className:"NewList__Terms-index"},p+1),r.a.createElement(U,{index:p+1,formOutput:f,setFormOutput:d})));return r.a.createElement("div",{className:"NewList"},r.a.createElement("header",null,r.a.createElement("h1",{className:"PageHeader"},"New List")),r.a.createElement("form",{className:"Form"},r.a.createElement(Y,{formOutput:f,setFormOutput:d}),r.a.createElement("div",{className:"NewList__name"},r.a.createElement("label",{htmlFor:"name"},"List name"),r.a.createElement("input",{onBlur:function(e){e.preventDefault();var t=e.currentTarget;console.log(t),t.value&&t.value!==f.listName&&(console.log(t.value),d(Object(v.a)(Object(v.a)({},f),{},{listName:t.value})))},type:"text",name:"name",id:""})),r.a.createElement("div",{className:"NewList__Terms"},o.length>0&&o),r.a.createElement("input",{onClick:function(e){e.preventDefault(),g.a.post("/db/list",{newList:{owner:t.username,name:f.listName,from:f.languages.from,to:f.languages.to,content:f.content.filter((function(e){return null!==e}))}})},type:"button",value:"Create list"})),r.a.createElement("input",{onClick:function(e){e.preventDefault(),s(l+10)},type:"button",value:"Add rows"}))})),q=Object(n.memo)((function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(f,null,r.a.createElement(s.a,null,r.a.createElement(d,null),r.a.createElement("div",{className:"App__wrapper"},r.a.createElement("div",{className:"App"},r.a.createElement(R,null,r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/",element:r.a.createElement("div",null,"Home")}),r.a.createElement(o.a,{path:"/u/:username"},r.a.createElement(o.a,{path:"/",element:r.a.createElement(H,null)}),r.a.createElement(o.a,{path:"/sets",element:r.a.createElement(P,null)}),r.a.createElement(o.a,{path:"/lists"},r.a.createElement(o.a,{path:"/",element:r.a.createElement(V,null)}),r.a.createElement(o.a,{path:"/new",element:r.a.createElement(J,null)})),r.a.createElement(o.a,{path:"/list"},r.a.createElement(o.a,{path:"/:id"},r.a.createElement(o.a,{path:"/review",element:r.a.createElement(k,null)}),r.a.createElement(o.a,{path:"/",element:r.a.createElement(I,null)})))),r.a.createElement(o.a,{path:"*",element:r.a.createElement("div",null,"404")}))))))))}));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(q,null)),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.2d3dd19f.chunk.js.map