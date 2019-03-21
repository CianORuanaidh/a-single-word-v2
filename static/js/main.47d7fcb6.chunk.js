(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{165:function(e,t,a){},166:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(26),s=a.n(r),l=(a(82),a(34)),i=a(15),c=a(16),m=a(18),u=a(17),p=a(19),d=a(76),h=a.n(d),g=a(56),b=a.n(g);b.a.initializeApp({apiKey:"AIzaSyB2bD8kgHnvlqYpPK9QERgE-hDleHBT9tk",authDomain:"one-word-246c8.firebaseapp.com",databaseURL:"https://one-word-246c8.firebaseio.com",projectId:"one-word-246c8",storageBucket:"one-word-246c8.appspot.com",messagingSenderId:"461388693078"});var f=b.a,E=a(55),v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).scrollToTop=function(){E.animateScroll.scrollToTop()},a.handleSubmit=function(e){console.log(e),e.preventDefault(),a.props.poem[0]=a.state.poemTitle,a.props.poem.push("Author: "+a.state.poemAuthor),f.database().ref("poems").push(a.props.poem),a.setState({canSubmit:!1})},a.handleChange=function(e){a.setState(Object(l.a)({},e.target.name,e.target.value))},a.handleClick=function(){console.log("CLICKED"),a.scrollToTop()},a.state={poemTitle:"",poemAuthor:"",canSubmit:!0},a}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{id:"created-poem"},this.props.poem.length>1&&this.state.canSubmit?o.a.createElement("div",{className:"poemHolder"},o.a.createElement("ul",null,o.a.createElement("h2",null,"Created Poem"),this.props.poem.map(function(e,t){return o.a.createElement("li",{key:t},e)})),o.a.createElement("form",{action:"submit",onSubmit:this.handleSubmit},o.a.createElement("label",{className:"visuallyHidden",htmlFor:""},"Add Title to Poem"),o.a.createElement("input",{id:"poemTitle",type:"text",placeholder:"Poem title:",onChange:this.handleChange,name:"poemTitle",value:this.state.poemTitle,required:!0}),o.a.createElement("input",{id:"poemAuthor",type:"text",placeholder:"Authors name:",onChange:this.handleChange,name:"poemAuthor",value:this.state.poemAuthor,required:!0}),o.a.createElement("button",{type:"submit",value:"save"},"Save poem")),o.a.createElement("button",{className:"tryAgain",onClick:this.handleClick},"Try again?")):o.a.createElement("h2",null))}}]),t}(n.Component),S=(a(165),function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(m.a)(this,Object(u.a)(t).call(this))).showPoem=function(){console.log("CLICKED!"),"togglePoem"===e.state.toggleClass?(console.log("NOT YET"),e.setState({toggleClass:"showPoems",readHide:"Hide"})):(console.log("NOW"),e.setState({toggleClass:"togglePoem",readHide:"Read"}))},e.state={toggleClass:"togglePoem",readHide:"Read"},e}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"poemCollection wrapper"},o.a.createElement("h1",null,"Poem Catalog"),this.props.poemList.slice(0).reverse().map(function(e,t){var a="poem poem".concat(t);return o.a.createElement("ul",{key:e[0],className:a},e[1].map(function(e,t){return o.a.createElement("li",{key:t},e)}))}))}}]),t}(n.Component)),y=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(m.a)(this,Object(u.a)(t).call(this))).getPoems=function(){var t=e.state.searchWord.trim().toLocaleLowerCase();if(t.length>2){if(!0===/\s/g.test(t))return e.setState({userMessage:"Please enter only one word",userPoem:[],badInput:!0}),"Please enter only one word";if(null!==/[^A-Za-z0-9]/.exec(t))return e.setState({userMessage:"No special characters please",userPoem:[],badInput:!0}),"No special characters please";e.setState({isLoading:!0}),h()({method:"GET",url:"https://proxy.hackeryou.com",dataResponse:"json",params:{reqUrl:"http://poetrydb.org/lines/".concat(t,"/lines.json")},xmlToJSON:!1}).then(function(t){console.log("RESULT",t);var a=t.data;if(404===a.status)return e.setState({isLoading:!1,searchWord:"",badInput:!0,userMessage:"Sorry no results try again?"}),"Sorry no results try again?";e.setState({badInput:!1});var n=[],o=[],r=["[Title]"],s=0,l=/[!@#$%^&*()_?:{}|<>[]/;a.forEach(function(t){t.lines.forEach(function(t){""!==t&&(l.exec(t)||(!0===t.includes(e.state.searchWord)?n.push(t):o.push(t)))})});for(var i=n.length,c=o.length,m=0;m<10;m++)0===m||9===m?(s=Math.floor(Math.random()*i),r.push(n[s].trim())):(s=Math.floor(Math.random()*c),r.push(o[s].trim()));e.setState({isLoading:!1,userPoem:r,searchWord:""}),document.getElementById("created-poem").scrollIntoView({behavior:"smooth"})}).catch(function(e){console.log(e.message)})}else console.log("Word must be at least three letters"),e.setState({userMessage:"Word must be at least three letters",userPoem:[],badInput:!0})},e.handleSubmit=function(t){t.preventDefault(),e.setState({newSubmit:!0}),e.getPoems()},e.handleChange=function(t){e.setState(Object(l.a)({},t.target.name,t.target.value))},e.state={searchWord:"",isLoading:!1,userPoem:[],dbPoems:[],userMessage:"",badInput:!1},e}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.database().ref("poems").on("value",function(t){var a=t.val(),n=[];for(var o in a)n.push([o,a[o]]);e.setState({dbPoems:n})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"wrapper"},o.a.createElement("h1",null,"A Single Word"),o.a.createElement("h2",{className:"appInfo"},"Enter a single word below. Using that word, we create a poem for you, using lines from the back catalog of classic poets."),this.state.isLoading?o.a.createElement("div",{className:"loadingScreen"},o.a.createElement("p",{className:"patience"},"\u201cPatience, my friend, patience!\u201d"),o.a.createElement("p",null,o.a.createElement("div",{className:"ripple lds-ripple"},o.a.createElement("div",null),o.a.createElement("div",null)))):o.a.createElement("form",{className:"inputForm",action:"submit",onSubmit:this.handleSubmit},o.a.createElement("label",{className:"visuallyHidden",htmlFor:"userInput"},"Enter word to generate poem"),o.a.createElement("input",{id:"userInput",type:"text",placeholder:"enter one word",onChange:this.handleChange,name:"searchWord",value:this.state.searchWord}),o.a.createElement("button",{type:"submit"},"get poem"),this.state.badInput?o.a.createElement("p",{className:"inputCheck"},this.state.userMessage):o.a.createElement("p",null))),o.a.createElement("main",{className:"wrapper"},o.a.createElement(v,{poem:this.state.userPoem}),o.a.createElement(S,{poemList:this.state.dbPoems})),o.a.createElement("footer",null,"Cian O'Ruanaidh \xa9 2019"))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},77:function(e,t,a){e.exports=a(166)},82:function(e,t,a){}},[[77,1,2]]]);
//# sourceMappingURL=main.47d7fcb6.chunk.js.map