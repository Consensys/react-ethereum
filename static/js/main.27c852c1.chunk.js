(this["webpackJsonpreact-ethereum-example"]=this["webpackJsonpreact-ethereum-example"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),i=n.n(o),u=n(3),c=n.n(u),l=n(2),s=n.n(l),h=n(1),d=n.n(h);function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function w(e){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(c){a=!0,o=c}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function C(){return"undefined"!==typeof window}var y={ethereum:d.a.object,accounts:d.a.arrayOf(d.a.string).isRequired,error:d.a.object,chainId:d.a.number.isRequired,awaiting:d.a.bool.isRequired,requestConnection:d.a.func.isRequired},E=(d.a.shape(y),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=s.a.createContext(e);t.displayName="EthereumContext";var n=t.Provider,r=function(e){function t(e){var n,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=w(t).call(this,e),n=!a||"object"!==typeof a&&"function"!==typeof a?b(r):a,m(b(n),"handleConnect",(function(){var e;return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n.setState({awaiting:!0}),t.next=4,c.a.awrap(window.ethereum.send("eth_requestAccounts"));case 4:return e=t.sent,n.setState({accounts:e.result,awaiting:!1,error:null}),t.abrupt("return",{ethereum:window.ethereum,accounts:e.result,error:null});case 9:return t.prev=9,t.t0=t.catch(0),n.setState({error:t.t0,awaiting:!1}),t.abrupt("return",{ethereum:window.ethereum,accounts:[],error:t.t0});case 13:case"end":return t.stop()}}),null,null,[[0,9]])})),m(b(n),"handleChainChange",(function(e){e?n.setState({chainId:Number(e)}):n.setState({chainId:null})})),m(b(n),"handleChainChangeError",(function(e){n.setState({error:e})})),m(b(n),"handleAccountChange",(function(e){return c.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:n.setState({accounts:e});case 1:case"end":return t.stop()}}))})),m(b(n),"handleAccountChangeError",(function(e){n.setState({error:e})})),m(b(n),"handleClose",(function(e,t){var r=new Error("Connection closed");r.code=e,r.reason=t,n.setState({accounts:[],chainId:null,error:r})})),n.state={ethereum:C()?window.ethereum:null,chainId:null,accounts:[],awaiting:!1,error:null},n.listenerClose=null,n.listenerNetwork=null,n.listenerChain=null,n.listenerAccount=null,n}var r,a,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),r=t,(a=[{key:"componentDidMount",value:function(){var e,t,n,r;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(C()){a.next=2;break}return a.abrupt("return",void 0);case 2:return this.listenerClose=window.ethereum.on("close",this.handleClose),this.listenerNetwork=window.ethereum.on("networkChanged",this.handleChainChange),this.listenerChain=window.ethereum.on("chainChanged",this.handleChainChange),this.listenerAccount=window.ethereum.on("accountsChanged",this.handleAccountChange),a.next=8,c.a.awrap(Promise.all([window.ethereum.send("eth_chainId"),window.ethereum.send("eth_accounts")]));case 8:e=a.sent,t=g(e,2),n=t[0].result,r=t[1].result,this.setState({chainId:Number(n)||null,accounts:r});case 13:case"end":return a.stop()}}),null,this)}},{key:"shouldComponentUpdate",value:function(e,t){return this.state.ethereum!==t.ethereum||!(this.state.chainId===t.chainId&&this.state.accounts[0]===t.accounts[0]&&this.state.awaiting===t.awaiting&&this.state.error===t.error)}},{key:"componentWillUnmount",value:function(){window.ethereum.removeListener("close",this.handleClose),window.ethereum.removeListener("networkChanged",this.handleChainChange),window.ethereum.removeListener("chainChanged",this.handleChainChange),window.ethereum.removeListener("accountsChanged",this.handleAccountChange)}},{key:"render",value:function(){var e={ethereum:this.state.ethereum,accounts:this.state.accounts,error:this.state.error,chainId:this.state.chainId,awaiting:this.state.awaiting,requestConnection:this.handleConnect};return s.a.createElement(n,p({},this.props,{value:e}))}}])&&f(r.prototype,a),o&&f(r,o),t}(l.Component);return t.Provider=r,t}());function j(e){var t=Object(r.useContext)(E),n=t.ethereum,o=t.accounts,i=t.chainId,u=t.awaiting,c=t.error,l=t.requestConnection;return a.a.createElement("div",e,a.a.createElement("p",null,"Press here:"),a.a.createElement("button",{type:"button",onClick:l},"Action"),a.a.createElement("ul",null,a.a.createElement("li",null,"Ethereum object with: ",a.a.createElement("code",null,Object.keys(n).join(", "))),a.a.createElement("li",null,"Account: ",o.join(", ")),a.a.createElement("li",null,"Network: ",i),a.a.createElement("li",null,"Waiting for user: ",String(u)),a.a.createElement("li",null,"Error: ",c&&c.message)))}i.a.render(a.a.createElement((function(){return a.a.createElement("div",null,a.a.createElement("h3",null,"Hello d-app user"),a.a.createElement(E.Provider,null,a.a.createElement(j,null)))}),null),document.getElementById("root"))},6:function(e,t,n){e.exports=n(16)}},[[6,1,2]]]);
//# sourceMappingURL=main.27c852c1.chunk.js.map