/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/base/ManagedObjectRegistry","./Element","./RenderManager","./FocusHandler","sap/ui/performance/trace/Interaction","sap/ui/util/ActivityDetection","sap/ui/events/KeyCodes","sap/base/Log","sap/base/assert","sap/base/config","sap/ui/performance/Measurement","sap/base/util/uid","sap/base/util/isEmptyObject","sap/ui/core/Rendering","sap/ui/events/jquery/EventExtension","sap/ui/events/ControlEvents","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery"],function(e,t,r,o,n,i,s,a,d,u,l,p,f,g,c,h,v,m,jQuery){"use strict";var y=c.getLogger();var C=new o;var b;h.apply();jQuery(document).on("keydown",function(e){m.handleF6GroupNavigation(e,null)});var I=function(e){return e},R=function(){},E=function(){};if(y.isLoggable()){I=function(e){var t;try{throw new Error}catch(e){t=e.stack||e.stacktrace||(e.sourceURL?e.sourceURL+":"+e.line:null);t=t?t.split(/\n\s*/g).slice(2):undefined}return{obj:e,location:t}};R=function(e,t){var o={},n,i;for(n in t){i=r.getElementById(n);o[n]={type:i?i.getMetadata().getName():t[n].obj===e?"UIArea":"(no such control)",location:t[n].location,reason:t[n].reason}}y.debug("  UIArea '"+e.getId()+"', pending updates: "+JSON.stringify(o,null,"\t"))};E=function(e,t){var r;for(r in t){if(e[r]!=null){if(e[r].obj!==t[r].obj){t[r].reason="replaced during rendering"}else{t[r].reason="invalidated again during rendering"}}else{t[r].reason="invalidated during rendering"}}}}var A=e.extend("sap.ui.core.UIArea",{constructor:function(t){if(arguments.length===0){return}e.apply(this);this.bLocked=false;this.bInitial=true;this.aContentToRemove=[];this.bNeedsRerendering=false;if(t!=null){this._setRootNode(t);this.bNeedsRerendering=this.bNeedsRerendering&&!document.getElementById(t.id+"-Init")}this.mInvalidatedControls={};this.mSuppressedControls={};this.iSuppressedControlsLength=0;if(!this.bNeedsRerendering){this.bRenderSelf=false}else{c.invalidateUIArea(this)}},metadata:{publicMethods:["setRootNode","getRootNode","setRootControl","getRootControl","lock","unlock","isLocked"],aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},dependents:{type:"sap.ui.core.Control",multiple:true}}},insertDependent:function(e,t){return this.insertAggregation("dependents",e,t,true)},addDependent:function(e){return this.addAggregation("dependents",e,true)},removeDependent:function(e){return this.removeAggregation("dependents",e,true)},removeAllDependents:function(){return this.removeAllAggregation("dependents",true)},destroyDependents:function(){return this.destroyAggregation("dependents",true)}});A.prototype.getId=function(){return this.oRootNode?this.oRootNode.id:null};A.prototype.getUIArea=function(){return this};A.prototype.setRootNode=function(e){this._setRootNode(e)};A.prototype._setRootNode=function(e){if(this.oRootNode===e){return}u(!e||e.nodeType===1&&!jQuery(e).attr("data-sap-ui-area"),"UIArea root node must be a DOMElement");if(this.oRootNode){this._ondetach()}this.deregister();this.oRootNode=e;this.register();if(this.getContent().length>0){this.invalidate()}if(this.oRootNode){this._onattach()}};A.prototype.getRootNode=function(){return this.oRootNode};A.prototype.setRootControl=function(e){this.removeAllContent();this.addContent(e)};A.prototype.getRootControl=function(e){var t=this.getContent();if(t.length>0){if(e>=0&&e<t.length){return t[e]}return t[0]}return null};A.prototype._addRemovedContent=function(e){if(this.oRootNode&&e){this.aContentToRemove.push(e)}};A.prototype.addContent=function(e,t){this.addAggregation("content",e,t);if(t!==true){this.invalidate()}return this};A.prototype.removeContent=function(e,t){var r=this.removeAggregation("content",e,t);if(!t){var o;if(r&&r.getDomRef){o=r.getDomRef()}this._addRemovedContent(o)}return r};A.prototype.removeAllContent=function(){var e=this.removeAllAggregation("content");for(var t=0;t<e.length;t++){var r;var o=e[t];if(o&&o.getDomRef){r=o.getDomRef()}this._addRemovedContent(r)}return e};A.prototype.destroyContent=function(){var e=this.getContent();for(var t=0;t<e.length;t++){var r;var o=e[t];if(o&&o.getDomRef){r=o.getDomRef()}this._addRemovedContent(r)}this.destroyAggregation("content");return this};A.prototype.lock=function(){this.bLocked=true};A.prototype.unlock=function(){if(this.bLocked&&this.bNeedsRerendering){c.invalidateUIArea(this)}this.bLocked=false};A.prototype.isLocked=function(){return this.bLocked};A.prototype.suppressInvalidationFor=function(e){if(!e||!e.isA||!e.isA("sap.ui.core.Control")){throw new TypeError("Invalid parameter: oControl must be Control instance.")}var t=e.getId();if(!this.mSuppressedControls[t]){this.mSuppressedControls[t]=new Set;this.iSuppressedControlsLength++;return true}return false};A.prototype.resumeInvalidationFor=function(e){if(!e||!e.isA||!e.isA("sap.ui.core.Control")){throw new TypeError("Invalid parameter: oControl must be Control instance.")}var t=e.getId();var o=this.mSuppressedControls[t];if(!o){throw new Error("The invalidation has not yet been suppressed for "+e)}this.iSuppressedControlsLength--;delete this.mSuppressedControls[t];o.forEach(function(e){var t=r.getElementById(e);if(t){this.addInvalidatedControl(t)}},this)};A.prototype.getBindingContext=function(){return null};A.prototype.getEventingParent=function(){return b?b._getEventProvider():undefined};A.prototype.isActive=function(){return!!this.getId()&&document.getElementById(this.getId())!=null};A.prototype.invalidate=function(){this.addInvalidatedControl(this)};A.prototype.addInvalidatedControl=function(e){if(this.bRenderSelf){return}if(!this.bNeedsRerendering){c.invalidateUIArea(this)}var t=e.getId();if(e===this){this.bRenderSelf=true;this.bNeedsRerendering=true;this.mInvalidatedControls={};this.mInvalidatedControls[t]=I(this);return}if(this.mInvalidatedControls[t]){return}if(this.iSuppressedControlsLength){for(var r=e;r;r=r.getParent()){var o=this.mSuppressedControls[r.getId()];if(o){o.add(t);return}}}this.mInvalidatedControls[t]=I(e);this.bNeedsRerendering=true};A.prototype.rerender=function(e){var t=this;function i(){t.bRenderSelf=false;t.aContentToRemove=[];t.mInvalidatedControls={};t.bNeedsRerendering=false}if(e){this.bNeedsRerendering=true}if(this.bLocked||!this.bNeedsRerendering){return false}var s=this.bRenderSelf,a=this.aContentToRemove,u=this.mInvalidatedControls,l=false;i();p.pause("renderPendingUIUpdates");p.start(this.getId()+"---rerender","Rerendering of "+this.getMetadata().getName());R(this,u);if(s){if(this.oRootNode){y.debug("Full Rendering of UIArea '"+this.getId()+"'");o.preserveContent(this.oRootNode,false,this.bInitial);this.bInitial=false;var f=function(e,r){var n=e.length;var i;for(var s=0;s<n;s++){i=r?e[s].getDomRef():e[s];if(i&&!o.isPreservedContent(i)&&t.oRootNode===i.parentNode){jQuery(i).remove()}}return n};var g=document.activeElement;var c=n.getControlFocusInfo();f(a);var h=this.getContent();var v=f(h,true);var m=document.activeElement;for(var b=0;b<v;b++){if(h[b]&&h[b].getParent()===this){C.render(h[b],this.oRootNode,true)}}l=true;if(g&&g!=m&&m===document.activeElement){try{n.restoreFocus(c)}catch(e){d.warning("Problems while restoring the focus after full UIArea rendering: "+e,null,this)}}}else{y.debug("Full Rendering of UIArea '"+this.getId()+"' postponed, no root node")}}else{var I=function(e){for(;;){if(e.getMetadata&&e.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){break}e=e.getParent();if(!e||e===t){return false}if(u.hasOwnProperty(e.getId())){return true}}};var A=[];for(var N in u){var _=r.getElementById(N);if(_){if(!I(_)){_.rerender();l=true}else{A.push(_)}}}
/**
			 * Let us suppose that A is the parent of B, and B is the parent of C. The controls A and C are invalidated, but B isn't.
			 * Controls A and C will be added to the UIArea as invalidated controls. At the next tick, UIArea will be rendered again.
			 * Thanks to the isRenderedTogetherWithAncestor method above, C.rerender will never be executed but only A.rerender.
			 *
			 * In apiVersion 1 or 2:
			 * During the rendering of A, RM.renderControl(B) renders the control B, and during the rendering of B, RM.renderControl(C)
			 * renders the control C. At the end of the UIArea re-rendering, there shall be no control remaining in an invalidated state.
			 *
			 * In apiVersion 4:
			 * During the rendering of A when RM.renderControl(B) is called the RenderManager first checks whether control B is
			 * invalidated. Since it was not invalidated the RenderManager skips the rendering of control B. Consequently, there will be
			 * no RM.renderControl(C) call to render the control C, and it remains in an invalidated state.
			 *
			 * The implementation below re-renders the invalidated controls that are skipped and not rendered with their ancestor.
			 * The re-rendering here is only required for controls that already have DOM output.
			 */A.forEach(function(e){if(!e._bNeedsRendering||e.isDestroyed()){return}if(e.bOutput==true&&e.getDomRef()||e.bOutput=="invisible"&&document.getElementById(o.createInvisiblePlaceholderId(e))){e.rerender()}})}E(u,this.mInvalidatedControls);p.end(this.getId()+"---rerender");p.resume("renderPendingUIUpdates");return l};A.prototype._onControlRendered=function(e){var t=e.getId();if(this.mInvalidatedControls[t]){delete this.mInvalidatedControls[t]}if(this.iSuppressedControlsLength){Object.values(this.mSuppressedControls).forEach(function(e){e.delete(t)})}};A.rerenderControl=function(e){var t=null;if(e){t=e.getDomRef();if(!t||o.isPreservedContent(t)){t=document.getElementById(o.RenderPrefixes.Invisible+e.getId())}}var r=t&&t.parentNode;if(r){var n=e.getUIArea();var i=n?C:new o;y.debug("Rerender Control '"+e.getId()+"'"+(n?"":" (using a temp. RenderManager)"));o.preserveContent(t,true,false,e);i.render(e,r)}else{var n=e.getUIArea();n&&n._onControlRendered(e);y.warning("Couldn't rerender '"+e.getId()+"', as its DOM location couldn't be determined")}};var N=/^(mousedown|mouseup|click|keydown|keyup|keypress|touchstart|touchend|tap)$/;var _=[],k=[];var w={mousemove:1,mouseover:1,mouseout:1,scroll:1,dragover:1,dragenter:1,dragleave:1};A.addEventPreprocessor=function(e){_.push(e)};A.getEventPreprocessors=function(){return _};A.addEventPostprocessor=function(e){k.push(e)};A.getEventPostprocessors=function(){return k};A.configureEventLogging=function(e){Object.assign(w,e);return Object.assign({},w)};A.prototype._handleEvent=function(e){var t,o,n;t=o=r.closestTo(e.target);s.refresh();if(t==null){return}if(e.isMarked("delayedMouseEvent")){return}var a=e.getMark("handledByUIArea"),u=this.getId();if(a&&a!==u){e.setMark("firstUIArea",false);return}e.setMarked("firstUIArea");e.srcControl=t;if(e.type==="contextmenu"&&e.shiftKey&&e.altKey&&(e.metaKey||e.ctrlKey)){d.info("Suppressed forwarding the contextmenu event as control event because CTRL+SHIFT+ALT is pressed!");return}_.forEach(function(t){t(e)});if(b){b._handleControlEvent(e,u)}if(this.bLocked){return}if(i.getActive()){n=e.type.match(N);if(n){i.notifyEventStart(e)}}var l=[];if(e.getPseudoTypes){l=e.getPseudoTypes()}l.push(e.type);var p=false;while(o instanceof r&&o.isActive()&&!e.isPropagationStopped()){var f=e.getMark("scopeCheckId"),g=f&&window.document.getElementById(f),c=o.getDomRef();if(!g||c&&c.contains(g)){for(var h=0,v=l.length;h<v;h++){var m=l[h];e.type=m;e.currentTarget=o.getDomRef();o._handleEvent(e);if(e.isImmediatePropagationStopped()){break}}if(!p&&!e.isMarked("enterKeyConsumedAsContent")){p=this._handleGroupChange(e,o)}if(e.isPropagationStopped()){break}if(o.bStopEventBubbling){break}c=o.getDomRef();if(!c){break}}c=c.parentNode;o=null;if(e.isMarked("fromMouseout")&&(c&&c.contains(e.relatedTarget))){break}while(c&&c!==this.getRootNode()){if(c.id){o=r.closestTo(c);if(o){break}}c=c.parentNode}}k.forEach(function(t){t(e)});if(n){i.notifyEventEnd(e)}e.currentTarget=this.getRootNode();e.setMark("handledByUIArea",u);if(e.isPropagationStopped()){d.debug("'"+e.type+"' propagation has been stopped")}var y=e.type;if(!w[y]){if(t){d.debug("Event fired: '"+y+"' on "+t,"","sap.ui.core.UIArea")}else{d.debug("Event fired: '"+y+"'","","sap.ui.core.UIArea")}}};A.prototype._onattach=function(){var e=this.getRootNode();if(e==null){return}jQuery(e).attr("data-sap-ui-area",e.id).on(v.events.join(" "),this._handleEvent.bind(this))};A.prototype._ondetach=function(){var e=this.getRootNode();if(e==null){return}jQuery(e).removeAttr("data-sap-ui-area").off()};A.prototype.clone=function(){throw new Error("UIArea can't be cloned")};A.prototype._handleGroupChange=function(e,t){var o=A._oFieldGroupValidationKey;if(e.type==="focusin"||e.type==="focusout"){if(e.type==="focusout"){t=r.closestTo(document.activeElement)}if(A._iFieldGroupDelayTimer){clearTimeout(A._iFieldGroupDelayTimer);A._iFieldGroupDelayTimer=null}A._iFieldGroupDelayTimer=setTimeout(this.setFieldGroupControl.bind(this,t),0);return true}else if(this.getFieldGroupControl()&&e.type==="keyup"&&e.keyCode===o.keyCode&&e.shiftKey===o.shiftKey&&e.altKey===o.altKey&&e.ctrlKey===o.ctrlKey){if(A._iFieldGroupTriggerDelay){clearTimeout(A._iFieldGroupTriggerDelay)}var n=this.getFieldGroupControl(),i=n?n._getFieldGroupIds():[];if(i.length>0){n.triggerValidateFieldGroup(i)}return true}return false};A.prototype.setFieldGroupControl=function(e){var t=e;while(t&&!(t instanceof r&&t.isA("sap.ui.core.Control"))){t=t.getParent()}var o=this.getFieldGroupControl();if(t!=o&&document.activeElement&&document.activeElement.id!=="sap-ui-static-firstfe"){var n=o?o._getFieldGroupIds():[],i=t?t._getFieldGroupIds():[],s=n.filter(function(e){return i.indexOf(e)<0});if(s.length>0){o.triggerValidateFieldGroup(s)}A._oFieldGroupControl=t}return this};A.prototype.getFieldGroupControl=function(){if(A._oFieldGroupControl&&!A._oFieldGroupControl.bIsDestroyed){return A._oFieldGroupControl}return null};t.apply(A,{onDuplicate:function(e,t,r){var o="adding UIArea with duplicate id '"+e+"'";d.error(o);throw new Error("Error: "+o)}});A._oFieldGroupControl=null;A._iFieldGroupDelayTimer=null;A._oFieldGroupValidationKey={keyCode:a.ENTER,shiftKey:false,altKey:false,ctrlKey:false};A._oRenderLog=y;A.create=function(e){u(typeof e==="string"||typeof e==="object","vDomRef must be a string or object");if(!e){throw new Error("vDomRef must not be null")}var t;if(typeof e==="string"){var r=e;t=document.getElementById(r);if(!t){throw new Error("DOM element with ID '"+r+"' not found in page, but application tries to insert content.")}}else{t=e}if(!t.id||t.id.length==0){t.id=f()}var o=t.id;var n=A.registry.get(o);if(!n){n=new A(t);if(b&&!g(b.oModels)){var i={oModels:Object.assign({},b.oModels),oBindingContexts:{},aPropagationListeners:[]};n._propagateProperties(true,n,i,true)}}else{n._setRootNode(t)}return n};A.setCore=function(e){b=e;var t=l.get({name:"sapUiAreas",type:l.Type.StringArray,defaultValue:null,freeze:true});if(t){for(var r=0,o=t.length;r<o;r++){A.create(t[r])}}};return A});
//# sourceMappingURL=UIArea.js.map