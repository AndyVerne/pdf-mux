(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(14),o=a.n(l),s=(a(60),a(21)),r=a(22),c=a(24),u=a(23),g=a(25),p=(a(62),a(54)),d=a(53),f=a(33),h=a(49);a(112);f.pdfjs.GlobalWorkerOptions.workerSrc="pdf.worker.js";var m={cMapUrl:"cmaps/",cMapPacked:!0},P=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onDocumentLoadSuccess=function(e){var t=e.getPage(1);null!==a.state.pdf&&(a.state.pdf.destroy(),a.state.pdf=null),t.then(function(t){var n=t.getViewport(1);a.props.getNumPages(e.numPages),a.props.getSetPage(a.setPage),a.listRef=i.a.createRef(),a.setState({pdf:e,numPages:e.numPages,itemScale:n.height/n.width,loaded:!0})})},a.updateCurrentVisiblePage=function(e){var t=e.visibleStopIndex;!0===a.state.loaded&&0!==a.state.currentPage&&(a.state.currentPage=t+1,a.props.getCurrentPage(a.state.currentPage))},a.setPage=function(e){0!==e&&(a.state.currentPage=e,a.props.getCurrentPage(a.state.currentPage),a.listRef.current.scrollToItem(e-1,"start"))},a.componentDidUpdate=function(){!0===a.state.loaded&&0===a.state.currentPage&&a.setPage(a.props.currentPage)},a.componentWillUnmount=function(){null!==a.state.pdf&&(a.state.pdf.destroy(),a.state.pdf=null,a.setState({loaded:!1})),console.log("unmout pdf")},a.onItemClick=function(e){var t=e.pageNumber;a.props.pushStack(a.state.currentPage),a.setPage(t)},a.state={pdf:null,width:0,height:0,itemScale:0,loaded:!1,numPages:null,currentPage:0},a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return(this.props.file!==e.file||!1===this.state.loaded)&&(this.state.currentPage=0,this.state.loaded=!1,!0)}},{key:"render",value:function(){var e=this;return i.a.createElement(h.a,{bounds:!0,onResize:function(t){e.setState({width:t.bounds.width,height:t.bounds.height})}},function(t){var a=t.measureRef;return i.a.createElement("div",{className:"viewer",style:{width:"100%",height:"100%",display:"block",position:"absolute"},ref:a},i.a.createElement("div",{className:"document_container"},i.a.createElement(f.Document,{file:e.props.file,onLoadSuccess:e.onDocumentLoadSuccess,onItemClick:e.onItemClick,options:m,noData:"",loading:""},e.state.loaded?i.a.createElement(d.a,{ref:e.listRef,height:e.state.height,width:e.state.width,itemSize:e.state.itemScale*e.state.width,itemCount:e.state.numPages,onItemsRendered:e.updateCurrentVisiblePage,overscanCount:1},function(t){var a=t.style,n=t.index;return i.a.createElement("div",{style:a,key:n},i.a.createElement(f.Page,{pageNumber:n+1,width:e.state.width-20,renderAnnotationLayer:!0,loading:""}))}):null)))})}}]),t}(n.Component),v=a(51),S=a.n(v),b=a(19),w=a.n(b),k=a(52),y=a.n(k),C=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).cachePage=function(){a.localStorage.setItem(a.state.value,a.state.currentPage.toString()),console.log("cached")},a.onFileChange=function(e){a.cachePage();var t=e.target.files[0];if(null!==t){var n=e.target.value,i=parseInt(a.localStorage.getItem(n));a.setState({file:t,value:n,currentPage:isNaN(i)?1:i})}},a.componentWillMount=function(){a.setState(function(){return{file:null!==a.props.file?a.props.file:null,value:"none"!==a.props.value?a.props.value:"none",currentPage:0!==a.props.currentPage?a.props.currentPage:0}})},a.cleanUp=function(){a.setPage=null,a.state.file=null},a.componentWillUnmount=function(){a.cachePage(),a.cleanUp(),console.log("unmount viewer")},a.vSplit=function(){a.setState(function(){return{split:"vertical"}},function(){a.cleanUp()})},a.hSplit=function(){a.setState(function(){return{split:"horizontal"}},function(){a.cleanUp()})},a.lClose=function(){a.state.close>=1&&a.props.handle(),a.setState(function(e){return{size:"0%",allowResize:!1,resizerStyle:{display:"none"},lr:"left",close:e.close+1}})},a.rClose=function(){a.state.close>=1&&a.props.handle(),a.setState(function(e){return{size:"100%",allowResize:!1,resizerStyle:{display:"none"},lr:"right",close:e.close+1}})},a.getNumPages=function(e){a.setState({numPages:e})},a.getCurrentPage=function(e){e!==a.state.currentPage&&a.setState({currentPage:e})},a.getPage=function(e){if(13===e.keyCode){var t=parseInt(a.state.page);NaN!==t&&t>0&&t<=a.state.numPages&&a.setPage(t),a.setState({page:""})}},a.getSetPage=function(e){a.setPage=e},a.pushStack=function(e){a.stack.push(e),console.log(a.stack)},a.goBack=function(){if(a.stack.length>0){var e=a.stack.pop();a.setPage(e)}},a.state={split:"",size:"50%",resizerStyle:"",allowResize:!0,close:0,lr:"",file:null,value:"none",currentPage:0,numPages:0,page:""},a.setPage=null,a.stack=[],a.localStorage=window.localStorage,a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,a=y.a.uniqueId();return i.a.createElement("div",null,i.a.createElement(S.a,{onBeforeunload:function(){e.cachePage()}}),""===this.state.split?i.a.createElement("div",null,i.a.createElement("div",{style:{width:"100%",background:"#white",display:"flex",justifyContent:"center"}},i.a.createElement("button",{ref:"back",style:{marginRight:"auto",marginLeft:"20px"},onClick:function(){e.goBack(),w.a.hide(Object(l.findDOMNode)(e.refs.back))},"data-tip":"Back"}),i.a.createElement("button",{ref:"vSplit",onClick:function(){e.vSplit(),w.a.hide(Object(l.findDOMNode)(e.refs.vSplit))},"data-tip":"Split Vertical"}),i.a.createElement("button",{ref:"hSplit",onClick:function(){e.hSplit(),w.a.hide(Object(l.findDOMNode)(e.refs.hSplit))},"data-tip":"Split Horizontal"}),i.a.createElement("button",{ref:"close",onClick:function(){e.props.close(),w.a.hide(Object(l.findDOMNode)(e.refs.close))},"data-tip":"Close Pane"}),i.a.createElement("input",{type:"file",onChange:this.onFileChange,style:{display:"none"},id:a}),i.a.createElement("label",{ref:"open",htmlFor:a,onClick:function(){w.a.hide(Object(l.findDOMNode)(e.refs.open))},"data-tip":"Open File"}),i.a.createElement("div",{style:{marginLeft:"auto"}},i.a.createElement("div",{style:{marginRight:"20px",textAlign:"right",color:"gray",fontSize:"14px"}},i.a.createElement("input",{type:"text",style:{width:"30px"},value:this.state.page,placeholder:this.state.currentPage,"data-tip":"Go to Page",onChange:function(t){return e.setState({page:t.target.value})},onKeyDown:this.getPage}),"(",this.state.currentPage," of ",this.state.numPages,")")),i.a.createElement(w.a,{place:"bottom",effect:"solid"})),i.a.createElement(P,{file:this.state.file,currentPage:this.state.currentPage,getNumPages:this.getNumPages,getCurrentPage:this.getCurrentPage,getSetPage:this.getSetPage,pushStack:this.pushStack})):i.a.createElement(p.a,{split:this.state.split,size:this.state.size,resizerStyle:this.state.resizerStyle,paneStyle:{background:"white"},pane2Style:"vertical"===this.state.split?{width:"0%"}:null,allowResize:this.state.allowResize,onDragFinished:this.update},"left"===this.state.lr?i.a.createElement("div",null):i.a.createElement("div",{style:{flex:1}},i.a.createElement(t,{close:this.lClose,handle:this.rClose,file:this.state.file,value:this.state.value,currentPage:this.state.currentPage})),"right"===this.state.lr?i.a.createElement("div",null):i.a.createElement(t,{close:this.rClose,handle:this.lClose,file:this.state.file,value:this.state.value,currentPage:this.state.currentPage})))}}]),t}(n.Component),E=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={close:!1},e}return Object(g.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,this.state.close?null:i.a.createElement(C,{close:function(){},file:null,value:"none",currentPage:0}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},31:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=31},55:function(e,t,a){e.exports=a(126)},60:function(e,t,a){},62:function(e,t,a){},70:function(e,t){},72:function(e,t){},73:function(e,t){},74:function(e,t){},75:function(e,t){}},[[55,2,1]]]);
//# sourceMappingURL=main.3679c86f.chunk.js.map