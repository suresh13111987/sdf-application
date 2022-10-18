"use strict";(self.webpackChunkholcimui=self.webpackChunkholcimui||[]).push([[605],{81605:function(e,s,n){n.r(s),n.d(s,{default:function(){return C}});var a=n(72791),t=n(29439),r=n(16871),o=(n(53297),n(33168)),c=n(97948),i=n.n(c),l=n(60389),d=n(95048),u=n(24686),m=n(82932),p=n(63919),g=n(44266),h=n(89743),x=n(2677),f=n(43360),j=n(9806),w=n(11632),v=(n(763),n(9085)),Z=n(80184),N=function(){var e=window.location.pathname,s=(0,o.$)(),n=s.t,c=s.i18n,N=(0,a.useState)(!1),C=(0,t.Z)(N,2),y=C[0],b=C[1],k=(0,a.useState)(""),A=(0,t.Z)(k,2),I=A[0],L=A[1],_=(0,a.useState)(""),S=(0,t.Z)(_,2),E=S[0],G=S[1],D=(0,d.I0)();(0,a.useEffect)((function(){c.changeLanguage(window.sessionStorage.getItem("language"))}),[]);var T=(0,d.v9)((function(e){return{changePasswordres:e.loginDataReducer.loginfetchStateresponse.data}}),d.wU).changePasswordres;(0,a.useEffect)((function(){void 0!==T&&(void 0===T.status?!0===T.success&&(alert("Please login again"),sessionStorage.clear(),window.location.replace("/"),b(!1)):!1===T.status&&v.Am.error("Enter new password and confirm password properly"))}),[T]);var F=(0,r.s0)();return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(i(),{isOpen:y,id:"modalvalue",children:(0,Z.jsxs)(h.Z,{className:"m-0",children:[(0,Z.jsx)(x.Z,{sm:8,md:8,className:"p-0",children:(0,Z.jsx)("img",{src:"images/loginPageimg.png",className:"changepass-img",alt:"loginLogo"})}),(0,Z.jsxs)(x.Z,{sm:4,md:4,style:{position:"relative"},children:[(0,Z.jsx)(h.Z,{children:(0,Z.jsx)(x.Z,{sm:12,md:12,children:(0,Z.jsx)("span",{className:"close-pass-btn",onClick:function(){return b(!1)},children:(0,Z.jsx)(j.G,{icon:w.g82,color:"#484036",style:{fontSize:"22px"}})})})}),(0,Z.jsxs)(h.Z,{className:"p-4 mt-4",children:[(0,Z.jsx)(x.Z,{sm:12,md:12,className:"mt-5",children:(0,Z.jsx)("p",{className:"change-password-heading text-center",children:n("Change Password")})}),(0,Z.jsxs)(x.Z,{sm:12,md:12,className:"mt-5",children:[(0,Z.jsx)("label",{children:n("New Password")}),(0,Z.jsx)("input",{type:"password",placeholder:n("Enter your new password"),className:"w-100 pt-2 pb-2 ps-2 addBorderradiusforinputs",onChange:function(e){G(e.target.value)}})]}),(0,Z.jsxs)(x.Z,{sm:12,md:12,className:"mt-5",children:[(0,Z.jsx)("label",{children:n("Confirm Password")}),(0,Z.jsx)("input",{type:"password",placeholder:n("Enter confirm password"),className:"w-100 pt-2 pb-2 ps-2 addBorderradiusforinputs",onChange:function(e){L(e.target.value)}})]})]}),(0,Z.jsx)(h.Z,{children:(0,Z.jsx)(x.Z,{sm:12,md:12,className:"change-pass-row",children:(0,Z.jsx)(f.Z,{variant:"info",className:"change-pass-btn",onClick:function(){E===I?D((0,l.j)({password:E,email:window.sessionStorage.getItem("username"),token:window.sessionStorage.getItem("accesstoken")})):alert("Confirm password and new password are not same")},children:n("Submit")})})})]})]})}),(0,Z.jsxs)(m.Z,{className:"p-2 mx-2 align-items-center",expand:"lg",children:[(0,Z.jsx)(m.Z.Brand,{href:"#",children:(0,Z.jsx)("img",{src:"images/Holcimlogo.svg",className:"holCimfontcolor",alt:"holcimLogo.svg"})}),(0,Z.jsx)(m.Z.Toggle,{"aria-controls":"basic-navbar-nav"}),(0,Z.jsxs)(m.Z.Collapse,{id:"basic-navbar-nav",children:[(0,Z.jsx)(u.Z,{className:"w-100 justify-content-center",children:(0,Z.jsx)("div",{className:"fontStyledata fontSizeofstatistical",children:n("Statistical Demand Forecasting")})}),(0,Z.jsx)(u.Z,{className:"mx-5 text-center navbar-dropdown",children:(0,Z.jsxs)(g.Z,{direction:"horizontal",gap:1,children:[(0,Z.jsx)("div",{children:(0,Z.jsx)(j.G,{icon:w.ILF,color:"#484036"})}),(0,Z.jsx)("div",{children:(0,Z.jsxs)(p.Z,{title:window.sessionStorage.getItem("username"),id:"nav-dropdown",children:[(0,Z.jsxs)(p.Z.Item,{onClick:function(){b(!0)},href:"#",children:[(0,Z.jsx)(j.G,{icon:w.DD4,style:{marginRight:"0.5em"},color:"#484036"}),n("Change Password")]}),(0,Z.jsxs)(p.Z.Item,{onClick:function(){window.location.replace("/"),sessionStorage.clear()},href:"#",children:[(0,Z.jsx)(j.G,{icon:w.SJh,style:{marginRight:"0.5em"},color:"#484036"}),n("Logout")]})]})})]})})]})]}),(0,Z.jsxs)(u.Z,{variant:"tabs",defaultActiveKey:"/collaborativetool",style:{marginBottom:"1em"},children:[(0,Z.jsx)(u.Z.Item,{children:(0,Z.jsxs)(u.Z.Link,{className:"/collaborativetool"===e.toLowerCase()?"activeBtn":"navButton",onClick:function(){F("/Collaborativetool")},href:"#",children:[(0,Z.jsx)("img",{src:"icons/Collaborative_Tool.png",className:"menu-icon",alt:"loginLogo"}),n("Collaborative Tool")]})}),(0,Z.jsx)(u.Z.Item,{children:(0,Z.jsxs)(u.Z.Link,{className:"/forecastaccuracyreport"===e.toLowerCase()?"activeBtn":"navButton",onClick:function(){F("/ForecastAccuracyReport")},href:"#",children:[(0,Z.jsx)("img",{src:"icons/Forecast_Accuracy_Report_black.png",className:"menu-icon",alt:"loginLogo"}),n("Forecast Accuracy Report")]})})]})]})},C=(n(78253),function(){return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(N,{}),(0,Z.jsx)(a.Suspense,{fallback:!0,children:(0,Z.jsx)(r.j3,{})})]})})},60389:function(e,s,n){n.d(s,{B:function(){return d},j:function(){return u}});var a=n(74165),t=n(15861),r=n(74569),o=n.n(r),c=n(66913),i=n(27700),l=window.sessionStorage.getItem("accesstoken"),d=function(e){return function(){var s=(0,t.Z)((0,a.Z)().mark((function s(n){var t,r;return(0,a.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,n({type:i.a.LOGIN_DATA_FETCHING}),t=c.Z.loginUser(),console.log("--------\x3eurl",t),s.next=6,o().post(t,e,{});case 6:r=s.sent,console.log("------\x3eresponse",r),n({type:i.a.LOGIN_DATA_FETCHED,payload:r}),s.next=15;break;case 11:s.prev=11,s.t0=s.catch(0),console.log("err",s.t0),n({type:i.a.LOGIN_DATA_FAILED});case 15:case"end":return s.stop()}}),s,null,[[0,11]])})));return function(e){return s.apply(this,arguments)}}()},u=function(e){return function(){var s=(0,t.Z)((0,a.Z)().mark((function s(n){var t,r;return(0,a.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,n({type:i.a.LOGIN_CHANGE_DATA_FETCHING}),t=c.Z.changeLoginuser(),s.next=5,o().post(t,e,{headers:{Token:l}});case 5:r=s.sent,n({type:i.a.LOGIN_CHANGE_DATA_FETCHED,payload:r}),s.next=12;break;case 9:s.prev=9,s.t0=s.catch(0),n({type:i.a.LOGIN_CHANGE_DATA_FAILED});case 12:case"end":return s.stop()}}),s,null,[[0,9]])})));return function(e){return s.apply(this,arguments)}}()}},53297:function(){}}]);
//# sourceMappingURL=605.6ae565b3.chunk.js.map