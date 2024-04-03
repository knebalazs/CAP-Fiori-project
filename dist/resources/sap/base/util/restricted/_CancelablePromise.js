/*!
 * Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
 * Version 2.0.0, see https://github.com/sindresorhus/p-cancelable/tree/v2.0.0
 */
sap.ui.define(function(){"use strict";function e(e,n){var r;if(typeof Symbol==="undefined"||e[Symbol.iterator]==null){if(Array.isArray(e)||(r=t(e))||n&&e&&typeof e.length==="number"){if(r)e=r;var o=0;var i=function e(){};return{s:i,n:function t(){if(o>=e.length)return{done:true};return{done:false,value:e[o++]}},e:function e(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var u=true,c=false,f;return{s:function t(){r=e[Symbol.iterator]()},n:function e(){var t=r.next();u=t.done;return t},e:function e(t){c=true;f=t},f:function e(){try{if(!u&&r.return!=null)r.return()}finally{if(c)throw f}}}}function t(e,t){if(!e)return;if(typeof e==="string")return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor)r=e.constructor.name;if(r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}function n(e,t){if(t==null||t>e.length)t=e.length;for(var n=0,r=new Array(t);n<t;n++){r[n]=e[n]}return r}function r(e){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){r=function e(t){return typeof t}}else{r=function e(t){return t&&typeof Symbol==="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t}}return r(e)}function o(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}function u(e,t,n){if(t)i(e.prototype,t);if(n)i(e,n);return e}function c(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function")}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:true,configurable:true}});if(t)d(e,t)}function f(e){var t=y();return function n(){var r=b(e),o;if(t){var i=b(this).constructor;o=Reflect.construct(r,arguments,i)}else{o=r.apply(this,arguments)}return a(this,o)}}function a(e,t){if(t&&(r(t)==="object"||typeof t==="function")){return t}return l(e)}function l(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e}function s(e){var t=typeof Map==="function"?new Map:undefined;s=function e(n){if(n===null||!h(n))return n;if(typeof n!=="function"){throw new TypeError("Super expression must either be null or a function")}if(typeof t!=="undefined"){if(t.has(n))return t.get(n);t.set(n,r)}function r(){return p(n,arguments,b(this).constructor)}r.prototype=Object.create(n.prototype,{constructor:{value:r,enumerable:false,writable:true,configurable:true}});return d(r,n)};return s(e)}function p(e,t,n){if(y()){p=Reflect.construct}else{p=function e(t,n,r){var o=[null];o.push.apply(o,n);var i=Function.bind.apply(t,o);var u=new i;if(r)d(u,r.prototype);return u}}return p.apply(null,arguments)}function y(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true}catch(e){return false}}function h(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function d(e,t){d=Object.setPrototypeOf||function e(t,n){t.__proto__=n;return t};return d(e,t)}function b(e){b=Object.setPrototypeOf?Object.getPrototypeOf:function e(t){return t.__proto__||Object.getPrototypeOf(t)};return b(e)}var v=function(e){c(n,e);var t=f(n);function n(e){var r;o(this,n);r=t.call(this,e||"Promise was canceled");r.name="CancelError";return r}u(n,[{key:"isCanceled",get:function e(){return true}}]);return n}(s(Error));var m=function(){u(t,null,[{key:"fn",value:function e(n){return function(){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++){r[o]=arguments[o]}return new t(function(e,t,o){r.push(o);n.apply(void 0,r).then(e,t)})}}}]);function t(e){var n=this;o(this,t);this._cancelHandlers=[];this._isPending=true;this._isCanceled=false;this._rejectOnCancel=true;this._promise=new Promise(function(t,r){n._reject=r;var o=function e(r){n._isPending=false;t(r)};var i=function e(t){n._isPending=false;r(t)};var u=function e(t){if(!n._isPending){throw new Error("The `onCancel` handler was attached after the promise settled.")}n._cancelHandlers.push(t)};Object.defineProperties(u,{shouldReject:{get:function e(){return n._rejectOnCancel},set:function e(t){n._rejectOnCancel=t}}});return e(o,i,u)})}u(t,[{key:"then",value:function e(t,n){return this._promise.then(t,n)}},{key:"catch",value:function e(t){return this._promise.catch(t)}},{key:"finally",value:function e(t){return this._promise.finally(t)}},{key:"cancel",value:function t(n){if(!this._isPending||this._isCanceled){return}if(this._cancelHandlers.length>0){try{var r=e(this._cancelHandlers),o;try{for(r.s();!(o=r.n()).done;){var i=o.value;i()}}catch(e){r.e(e)}finally{r.f()}}catch(e){this._reject(e)}}this._isCanceled=true;if(this._rejectOnCancel){this._reject(new v(n))}}},{key:"isCanceled",get:function e(){return this._isCanceled}}]);return t}();Object.setPrototypeOf(m.prototype,Promise.prototype);m.CancelError=v;return m});
//# sourceMappingURL=_CancelablePromise.js.map