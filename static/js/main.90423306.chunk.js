(this.webpackJsonpfifo_agenda=this.webpackJsonpfifo_agenda||[]).push([[0],{52:function(e,t,n){},54:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(4),c=n(0),r=n.n(c),i=n(11),s=n.n(i),o=(n(52),n(14)),l=n.n(o),d=n(28),u=n(10),j=(n(54),n(45)),b=n(77),h=n(76),f=n(73),O=n(75),p=n(74),m=n(15),x=n.n(m),g=(n(55),n(59),n(67),n(41)),v=(n(63),n(25)),k=n(42);x.a.initializeApp({apiKey:"AIzaSyDOlBBKrw6M2_PqvDlDXMJjJqr9OBF99xk",authDomain:"fifoagenda.firebaseapp.com",databaseURL:"https://fifoagenda-default-rtdb.europe-west1.firebasedatabase.app",projectId:"fifoagenda",storageBucket:"fifoagenda.appspot.com",messagingSenderId:"402510800265",appId:"1:402510800265:web:ee875372ec76f565776d58",measurementId:"G-NWXREE2YEL"});var y=x.a.auth(),w=x.a.firestore(),A=(x.a.analytics(),"_main_");function C(){return Object(a.jsxs)(a.Fragment,{children:["  ",Object(a.jsx)("div",{id:"h1-signIn"}),Object(a.jsx)("h1",{id:"h1-signIn-h1",children:"Your FIFO agenda"}),Object(a.jsx)(j.a,{variant:"outline-light",className:"sign-in",onClick:function(){var e=new x.a.auth.GoogleAuthProvider;y.signInWithPopup(e)},children:"Sign in with Google"})]})}function N(){return y.currentUser&&Object(a.jsx)(j.a,{variant:"outline-light",className:"sign-out",onClick:function(){return y.signOut()},children:"Sign Out"})}function F(){var e=Object(v.a)(y),t=Object(u.a)(e,1)[0],n=w.collection("users").doc(t.uid).collection("agenda"),i=n.orderBy("createdAt").limit(50),s=Object(k.a)(i,{idField:"id"}),o=Object(u.a)(s,1)[0],O=Object(c.useState)(""),p=Object(u.a)(O,2),m=p[0],g=p[1],A=r.a.forwardRef((function(e,t){var n=e.children,c=e.onClick;return Object(a.jsxs)("a",{href:"",ref:t,onClick:function(e){e.preventDefault(),c(e)},children:[n,"\u25bc"]})})),C=r.a.forwardRef((function(e,t){var n=e.children,i=e.style,s=e.className,o=e["aria-labelledby"],l=Object(c.useState)(""),d=Object(u.a)(l,2),j=d[0],h=d[1];return Object(a.jsxs)("div",{ref:t,style:i,className:s,"aria-labelledby":o,children:[Object(a.jsx)(b.a,{autoFocus:!0,className:"mx-3 my-2 w-auto",placeholder:"Type to filter...",onChange:function(e){return h(e.target.value)},value:j}),Object(a.jsx)("ul",{children:r.a.Children.toArray(n).filter((function(e){return!j||e.props.agenda.name.toLowerCase().startsWith(j)}))})]})})),N=function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,n.add({name:m,createdAt:x.a.firestore.FieldValue.serverTimestamp()});case 3:g("");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsxs)("div",{className:"botHeader",children:[Object(a.jsxs)(h.a,{children:[Object(a.jsx)(h.a.Toggle,{drop:"left",as:A,id:"dropdown-custom-components",children:"Your agendas"}),Object(a.jsx)(h.a.Menu,{as:C,children:o&&o.map((function(e){return Object(a.jsx)(S,{agenda:e},e.id)}))})]}),Object(a.jsx)("form",{onSubmit:N,children:Object(a.jsxs)(f.a,{children:[Object(a.jsx)(b.a,{className:"form-control",value:m,onChange:function(e){return g(e.target.value)},placeholder:"Create a new agenda"}),Object(a.jsx)(f.a.Append,{children:Object(a.jsx)(j.a,{type:"submit",variant:"outline-light",disabled:!m,children:"+"})})]})})]})}function D(){var e=Object(v.a)(y),t=Object(u.a)(e,1)[0];w.collection("users").doc(t.uid).get().then((function(e){e.exists&&(A=e.data().currentAgenda)}));w.collection("users").doc(t.uid).collection("agenda").doc("_main_").get().then((function(e){e.exists||w.collection("users").doc(t.uid).collection("agenda").doc("_main_").set({name:"_main_",createdAt:x.a.firestore.FieldValue.serverTimestamp()})}));var n=w.collection("users").doc(t.uid).collection(A),r=n.orderBy("createdAt"),i=Object(k.a)(r,{idField:"id"}),s=Object(u.a)(i,1)[0],o=Object(c.useState)(""),h=Object(u.a)(o,2),O=h[0],p=h[1],m=Object(c.useState)(!1),g=Object(u.a)(m,2),C=g[0],N=g[1],F=function(){var e=Object(d.a)(l.a.mark((function e(t){var a,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a=y.currentUser,c=a.uid,r=a.photoURL,e.next=4,n.add({text:O,level:C,createdAt:x.a.firestore.FieldValue.serverTimestamp(),uid:c,photoURL:r});case 4:p("");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsxs)("div",{className:"tasks",children:[Object(a.jsx)("h1",{children:A}),Object(a.jsx)("form",{id:"forma",onSubmit:F,children:Object(a.jsxs)(f.a,{children:[Object(a.jsx)(b.a,{className:"formTasks",onSubmit:F,placeholder:"Add a task to "+A,id:"formTodo",value:O,onChange:function(e){return p(e.target.value)}}),Object(a.jsxs)(f.a.Append,{children:[Object(a.jsxs)("p",{className:"onoff",children:[Object(a.jsx)("input",{onChange:function(e){return N(!C)},type:"checkbox",id:"checkboxID"}),Object(a.jsx)("label",{htmlFor:"checkboxID"})]}),Object(a.jsx)(j.a,{variant:"outline-light",type:"submit",disabled:!O,children:"ADD"})]})]})}),Object(a.jsxs)("main",{children:[s&&s.map((function(e){return Object(a.jsx)(I,{imp:!0,todo:e},e.id)})),s&&s.map((function(e){return Object(a.jsx)(I,{imp:!1,todo:e},e.id)}))]})]})}function I(e){var t=e.todo,n=t.text,c=t.level,r=t.id,i=t.createdAt,s=e.imp,o=Object(v.a)(y),b=Object(u.a)(o,1)[0],h=w.collection("users").doc(b.uid).collection(A).doc(r),f=function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(g.confirmAlert)({title:"Confirm to delete",message:"Are you sure to do this.",buttons:[{label:"Yes",onClick:function(){return h.delete()}},{label:"No"}]});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return c==s?Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)("div",{id:"todoElem"+c,children:[Object(a.jsx)("div",{id:"datep",children:i?i.toDate().toDateString():null}),Object(a.jsx)("p",{id:"todoP",children:c?Object(a.jsxs)("div",{id:"ppp",children:["\u26a0 ",Object(a.jsxs)("strong",{children:[" ",n," "]})," \u26a0"]}):Object(a.jsx)("div",{id:"ppp",children:n})}),Object(a.jsx)(O.a,{placement:"right",overlay:Object(a.jsxs)(p.a,{id:"tooltip",children:["click to ",Object(a.jsx)("strong",{children:"delete"}),"."]}),children:Object(a.jsx)(j.a,{className:"todoB",variant:"outline-danger",size:"sm",onClick:f,children:"\u2717"})})]})}):Object(a.jsx)(a.Fragment,{})}function S(e){var t=e.agenda,n=t.name,c=t.id,r=Object(v.a)(y),i=Object(u.a)(r,1)[0],s=w.collection("users").doc(i.uid).collection("agenda").doc(c),o=function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(g.confirmAlert)({title:"Confirm to delete",message:"Are you sure to do this.",buttons:[{label:"Yes",onClick:function(){return s.delete()}},{label:"No"}]});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsxs)(h.a.Item,{name:n,className:"Agendas",children:[Object(a.jsx)(O.a,{placement:"left",overlay:Object(a.jsxs)(p.a,{id:"tooltip",children:["click to ",Object(a.jsx)("strong",{children:"select"}),"."]}),children:Object(a.jsx)("p",{id:"agendaP",onClick:function(){w.collection("users").doc(i.uid).set({currentAgenda:n}).then((function(){window.location.reload()}))},children:Object(a.jsx)("div",{id:"aaa",children:n})})},"left"),Object(a.jsx)(O.a,{placement:"right",overlay:Object(a.jsxs)(p.a,{id:"tooltip",children:["click to ",Object(a.jsx)("strong",{children:"delete"}),"."]}),children:Object(a.jsx)(j.a,{variant:"outline-danger",onClick:o,children:"\u2717"})})]})}var _=function(){var e=Object(v.a)(y),t=Object(u.a)(e,1)[0];return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsxs)("header",{children:[Object(a.jsxs)("div",{className:"topHeader",children:[t?Object(a.jsxs)("p",{className:"pHeader",children:[t.displayName,"'s FIFO Agenda"]}):null,t?Object(a.jsx)(N,{className:"sHeader"}):null]}),t?Object(a.jsx)(F,{className:"botHeader"}):null]}),Object(a.jsx)("section",{children:t?Object(a.jsx)(D,{}):Object(a.jsx)(C,{})})]})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,78)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(_,{})}),document.getElementById("root")),B()}},[[66,1,2]]]);
//# sourceMappingURL=main.90423306.chunk.js.map