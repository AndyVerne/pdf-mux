(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(46),r=a.n(i),o=(a(58),a(19)),l=a(20),c=a(22),u=a(21),g=a(23),h=(a(60),a(52)),p=a(51),d=a(31),f=a(47);a(110);d.pdfjs.GlobalWorkerOptions.workerSrc="pdf.worker.js";var m={cMapUrl:"cmaps/",cMapPacked:!0},P=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onDocumentLoadSuccess=function(e){e.getPage(1).then(function(t){var n=t.getViewport(1);a.props.getNumPages(e.numPages),a.props.getSetPage(a.setPage),a.listRef=s.a.createRef(),a.setState({pdf:e,numPages:e.numPages,itemScale:n.height/n.width,loaded:!0})})},a.updateCurrentVisiblePage=function(e){var t=e.visibleStopIndex;!0===a.state.loaded&&0!==a.state.currentPage&&(a.state.currentPage=t+1,a.props.getCurrentPage(a.state.currentPage))},a.setPage=function(e){a.state.currentPage=e,a.props.getCurrentPage(a.state.currentPage),a.listRef.current.scrollToItem(e-1,"start")},a.componentDidUpdate=function(){!0===a.state.loaded&&0===a.state.currentPage&&a.setPage(a.props.currentPage)},a.componentWillUnmount=function(){a.state.pdf.destroy(),console.log("unmout pdf")},a.onItemClick=function(e){var t=e.pageNumber;a.props.pushStack(a.state.currentPage),a.setPage(t)},a.state={pdf:null,width:0,height:0,itemScale:0,loaded:!1,numPages:null,currentPage:0},a}return Object(g.a)(t,e),Object(l.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return(this.props.file!==e.file||!1===this.state.loaded)&&(this.state.currentPage=0,this.state.loaded=!1,!0)}},{key:"render",value:function(){var e=this;return s.a.createElement(f.a,{bounds:!0,onResize:function(t){e.setState({width:t.bounds.width,height:t.bounds.height})}},function(t){var a=t.measureRef;return s.a.createElement("div",{className:"viewer",style:{width:"100%",height:"100%",display:"block",position:"absolute"},ref:a},s.a.createElement("div",{className:"document_container"},s.a.createElement(d.Document,{file:e.props.file,onLoadSuccess:e.onDocumentLoadSuccess,onItemClick:e.onItemClick,options:m,noData:"",loading:""},e.state.loaded?s.a.createElement(p.a,{ref:e.listRef,height:e.state.height,width:e.state.width,itemSize:e.state.itemScale*e.state.width,itemCount:e.state.numPages,onItemsRendered:e.updateCurrentVisiblePage,overscanCount:1},function(t){var a=t.style,n=t.index;return s.a.createElement("div",{style:a,key:n},s.a.createElement(d.Page,{pageNumber:n+1,width:e.state.width-20,renderAnnotationLayer:!0,loading:""}))}):null)))})}}]),t}(n.Component),v=a(49),S=a.n(v),w=a(50),y=a.n(w),k=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).cachePage=function(){a.localStorage.setItem(a.state.value,a.state.currentPage.toString()),console.log("cached")},a.onFileChange=function(e){a.cachePage();var t=e.target.files[0];if(null!==t){var n=e.target.value,s=parseInt(a.localStorage.getItem(n));a.setState({file:t,value:n,currentPage:isNaN(s)?1:s})}},a.componentWillMount=function(){a.setState(function(){return{file:null!==a.props.file?a.props.file:null,value:"none"!==a.props.value?a.props.value:"none",currentPage:0!==a.props.currentPage?a.props.currentPage:0}})},a.componentWillUnmount=function(){a.cachePage(),console.log("unmount viewer")},a.vSplit=function(){a.setState(function(){return{split:"vertical"}})},a.hSplit=function(){a.setState(function(){return{split:"horizontal"}})},a.lClose=function(){a.state.close>=1&&a.props.handle(),a.setState(function(e){return{size:"0%",allowResize:!1,resizerStyle:{display:"none"},lr:"left",close:e.close+1}})},a.rClose=function(){a.state.close>=1&&a.props.handle(),a.setState(function(e){return{size:"100%",allowResize:!1,resizerStyle:{display:"none"},lr:"right",close:e.close+1}})},a.getNumPages=function(e){a.setState({numPages:e})},a.getCurrentPage=function(e){e!==a.state.currentPage&&a.setState({currentPage:e})},a.getPage=function(e){if(13===e.keyCode){var t=parseInt(a.state.page);NaN!==t&&t>0&&t<=a.state.numPages&&a.setPage(t),a.setState({page:""})}},a.getSetPage=function(e){a.setPage=e},a.pushStack=function(e){a.stack.push(e),console.log(a.stack)},a.goBack=function(){if(a.stack.length>0){var e=a.stack.pop();a.setPage(e)}},a.state={split:"",size:"50%",resizerStyle:"",allowResize:!0,close:0,lr:"",file:null,value:"none",currentPage:0,numPages:0,page:""},a.setPage=null,a.stack=[],a.localStorage=window.localStorage,a}return Object(g.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,a=y.a.uniqueId();return s.a.createElement("div",null,s.a.createElement(S.a,{onBeforeunload:function(){e.cachePage()}}),""===this.state.split?s.a.createElement("div",null,s.a.createElement("div",{style:{width:"100%",background:"#white",display:"flex",justifyContent:"center"}},s.a.createElement("button",{style:{marginRight:"auto",marginLeft:"20px"},onClick:this.goBack}),s.a.createElement("button",{onClick:this.vSplit}),s.a.createElement("button",{onClick:this.hSplit}),s.a.createElement("button",{onClick:this.props.close}),s.a.createElement("input",{type:"file",onChange:this.onFileChange,style:{display:"none"},id:a}),s.a.createElement("label",{htmlFor:a}),s.a.createElement("div",{style:{marginLeft:"auto"}},s.a.createElement("div",{style:{marginRight:"20px",textAlign:"right",color:"gray",fontSize:"14px"}},s.a.createElement("input",{type:"text",style:{width:"30px"},value:this.state.page,placeholder:this.state.currentPage,onChange:function(t){return e.setState({page:t.target.value})},onKeyDown:this.getPage}),"(",this.state.currentPage," of ",this.state.numPages,")"))),s.a.createElement(P,{file:this.state.file,currentPage:this.state.currentPage,getNumPages:this.getNumPages,getCurrentPage:this.getCurrentPage,getSetPage:this.getSetPage,pushStack:this.pushStack})):s.a.createElement(h.a,{split:this.state.split,size:this.state.size,resizerStyle:this.state.resizerStyle,paneStyle:{background:"white"},pane2Style:"vertical"===this.state.split?{width:"0%"}:null,allowResize:this.state.allowResize,onDragFinished:this.update},"left"===this.state.lr?s.a.createElement("div",null):s.a.createElement("div",{style:{flex:1}},s.a.createElement(t,{close:this.lClose,handle:this.rClose,file:this.state.file,value:this.state.value,currentPage:this.state.currentPage})),"right"===this.state.lr?s.a.createElement("div",null):s.a.createElement(t,{close:this.rClose,handle:this.lClose,file:this.state.file,value:this.state.value,currentPage:this.state.currentPage})))}}]),t}(n.Component),b=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).state={close:!1},e}return Object(g.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,this.state.close?null:s.a.createElement(k,{handle:function(){},file:null,value:"none",currentPage:0}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},29:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=29},53:function(e,t,a){e.exports=a(112)},58:function(e,t,a){},60:function(e,t,a){},68:function(e,t){},70:function(e,t){},71:function(e,t){},72:function(e,t){},73:function(e,t){}},[[53,2,1]]]);
//# sourceMappingURL=main.d55b4e9e.chunk.js.map