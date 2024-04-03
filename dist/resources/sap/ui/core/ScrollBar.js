/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","./Control","./library","./ScrollBarRenderer","sap/ui/performance/trace/Interaction","sap/base/Log","sap/ui/events/jquery/EventSimulation","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(t,e,o,i,r,s,l,jQuery,h){"use strict";var n=o.ScrollBarAction;var c=e.extend("sap.ui.core.ScrollBar",{metadata:{library:"sap.ui.core",properties:{vertical:{type:"boolean",group:"Behavior",defaultValue:true},scrollPosition:{type:"int",group:"Behavior",defaultValue:null},size:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},steps:{type:"int",group:"Dimension",defaultValue:null}},events:{scroll:{parameters:{action:{type:"sap.ui.core.ScrollBarAction"},forward:{type:"boolean"},newScrollPos:{type:"int"},oldScrollPos:{type:"int"}}}}},renderer:i});c.prototype.init=function(){this.ontouchstart=this.ontouchstart.bind(this);this.ontouchmove=this.ontouchmove.bind(this);this.ontouchend=this.ontouchend.bind(this);this.ontouchcancel=this.ontouchcancel.bind(this);this.onmousewheel=this.onmousewheel.bind(this);this.onscroll=this.onscroll.bind(this);this._$ScrollDomRef=null;this._iOldScrollPos=0;this._iOldStep=0;this._bScrollPosIsChecked=false;this._bRTL=h.getRTL();this._bSuppressScroll=false;this._iMaxContentDivSize=1e6;if(l.touchEventMode==="ON"){sap.ui.requireSync("sap/ui/thirdparty/zyngascroll");this._iLastTouchScrollerPosition=null;this._iTouchStepTreshold=24;this._bSkipTouchHandling=false;this._oTouchScroller=new window.Scroller(this._handleTouchScroll.bind(this),{bouncing:false})}};c.prototype.onBeforeRendering=function(){this.$("sb").off("scroll",this.onscroll)};c.prototype.onAfterRendering=function(){this._iSteps=this.getSteps();var e=this.getContentSize();this._bStepMode=!e;var o=this.getSize();if(o.endsWith("px")){o=o.substr(0,o.length-2)}else{o=this.getVertical()?this.$().height():this.$().width()}var i=null;var r=this.$("ffsize");if(t.browser.firefox){i=r.outerHeight();if(i===0){i=window.getComputedStyle(jQuery("body").get(0))["font-size"];if(i.endsWith("px")){i=i.substr(0,i.length-2)}i=parseInt(i)}}r.remove();if(t.browser.webkit){if(!document.width){i=Math.round(40/(window.outerWidth/jQuery(document).width()))}else{i=Math.round(40/(document.width/jQuery(document).width()))}}if(this.getVertical()){if(t.browser.firefox){this._iFactor=i}else if(t.browser.webkit){this._iFactor=i}else{this._iFactor=Math.floor(o*.125)}this._iFactorPage=t.browser.firefox?o-i:Math.floor(o*.875)}else{if(t.browser.firefox){this._iFactor=10;this._iFactorPage=Math.floor(o*.8)}else if(t.browser.webkit){this._iFactor=i;this._iFactorPage=Math.floor(o*.875)}else{this._iFactor=7;this._iFactorPage=o-14}}this._$ScrollDomRef=this.$("sb");if(this._bStepMode){if(this.getVertical()){var s=this._iSteps*this._iFactor;if(s>this._iMaxContentDivSize){this._iFactor=this._iFactor/(s/this._iMaxContentDivSize)}var h=this._$ScrollDomRef.height()+Math.ceil(this._iSteps*this._iFactor);this._$ScrollDomRef.find("div").height(h)}else{var h=this._$ScrollDomRef.width()+this._iSteps*this._iFactor;this._$ScrollDomRef.find("div").width(h)}}this.setCheckedScrollPosition(this.getScrollPosition()?this.getScrollPosition():0,true);this._$ScrollDomRef.on("scroll",this.onscroll);if(l.touchEventMode==="ON"){this._bSkipTouchHandling=true;var n={width:0,height:0};n[this.getVertical()?"height":"width"]=this._bStepMode?this.getSteps()*this._iTouchStepTreshold:parseInt(this.getContentSize());this._oTouchScroller.setDimensions(0,0,n.width,n.height);var c=this._$ScrollDomRef.get(0);if(c){var a=c.getBoundingClientRect();this._oTouchScroller.setPosition(a.left+c.clientLeft,a.top+c.clientTop);this._bSkipTouchHandling=false}}};c.prototype.onmousewheel=function(t){if(this.$().is(":visible")){var e=t.originalEvent;var o=e.detail?e.detail:e.wheelDelta*-1/40;var i=o>0?true:false;if(this._$ScrollDomRef[0]&&this._$ScrollDomRef[0].contains(t.target)){this._doScroll(n.MouseWheel,i)}else{this._bMouseWheel=true;var r=null;if(this._bStepMode){r=o+this._iOldStep}else{r=o*this._iFactor+this._iOldScrollPos}this.setCheckedScrollPosition(r,true)}t.preventDefault();t.stopPropagation();return false}};c.prototype.ontouchstart=function(t){var e=t.touches;var o=e[0];if(o&&o.target&&o.target.tagName.match(/input|textarea|select/i)){return}if(this._oTouchScroller){this._oTouchScroller.doTouchStart(e,t.timeStamp)}if(e.length==1){t.preventDefault()}};c.prototype.ontouchmove=function(t){if(this._oTouchScroller){this._oTouchScroller.doTouchMove(t.touches,t.timeStamp,t.scale)}};c.prototype.ontouchend=function(t){if(this._oTouchScroller){this._oTouchScroller.doTouchEnd(t.timeStamp)}};c.prototype.ontouchcancel=function(t){if(this._oTouchScroller){this._oTouchScroller.doTouchEnd(t.timeStamp)}};c.prototype.onscroll=function(e){if(this._bSuppressScroll){this._bSuppressScroll=false;e.preventDefault();e.stopPropagation();return false}var o=null;if(this._$ScrollDomRef){if(this.getVertical()){o=Math.round(this._$ScrollDomRef.scrollTop())}else{o=Math.round(this._$ScrollDomRef.scrollLeft());if(t.browser.firefox&&this._bRTL){o=Math.abs(o)}else if(t.browser.webkit&&this._bRTL){var i=this._$ScrollDomRef.get(0);o=i.scrollWidth-i.clientWidth-i.scrollLeft}}}var r=o-this._iOldScrollPos;var s=r>0?true:false;if(r<0){r=r*-1}var l=n.Drag;if(r==this._iFactor){l=n.Step}else if(r==this._iFactorPage){l=n.Page}else if(this._bMouseWheel){l=n.MouseWheel}if(this._bLargeDataScrolling&&l===n.Drag){this._eAction=l;this._bForward=s}else{this._doScroll(l,s)}e.preventDefault();e.stopPropagation();return false};c.prototype._onScrollTimeout=function(){this._scrollTimeout=undefined;this._doScroll(this._eAction,this._bForward);this._eAction=undefined;this._bForward=undefined;this._bTouchScroll=undefined};c.prototype.onmouseup=function(){if(this._bLargeDataScrolling&&(this._eAction||this._bForward||this._bTouchScroll)){this._doScroll(this._eAction,this._bForward);this._eAction=undefined;this._bForward=undefined;this._bTouchScroll=undefined}};c.prototype.ontouchend=c.prototype.onmouseup;c.prototype._handleTouchScroll=function(t,e,o){if(this._bSkipTouchHandling){return}var i=this.getVertical()?e:t;var r;if(this._bStepMode){r=Math.max(Math.round(i/this._iTouchStepTreshold),0)}else{r=Math.round(i)}if(this._iLastTouchScrollerPosition!==r){this._iLastTouchScrollerPosition=r;this.setCheckedScrollPosition(r,true);if(this._bLargeDataScrolling){this._bTouchScroll=true}else{this.fireScroll()}}};c.prototype.unbind=function(e){if(e){this._$OwnerDomRef=jQuery(e);if(this.getVertical()){this._$OwnerDomRef.off(t.browser.firefox?"DOMMouseScroll":"mousewheel",this.onmousewheel)}if(l.touchEventMode==="ON"){this._$OwnerDomRef.off(this._getTouchEventType("touchstart"),this.ontouchstart);this._$OwnerDomRef.off(this._getTouchEventType("touchmove"),this.ontouchmove);this._$OwnerDomRef.off(this._getTouchEventType("touchend"),this.ontouchend);this._$OwnerDomRef.off(this._getTouchEventType("touchcancel"),this.ontouchcancel)}}};c.prototype.bind=function(e){if(e){this._$OwnerDomRef=jQuery(e);if(this.getVertical()){this._$OwnerDomRef.on(t.browser.firefox?"DOMMouseScroll":"mousewheel",this.onmousewheel)}if(l.touchEventMode==="ON"){this._$OwnerDomRef.on(this._getTouchEventType("touchstart"),this.ontouchstart);this._$OwnerDomRef.on(this._getTouchEventType("touchmove"),this.ontouchmove);this._$OwnerDomRef.on(this._getTouchEventType("touchend"),this.ontouchend);this._$OwnerDomRef.on(this._getTouchEventType("touchcancel"),this.ontouchcancel)}}};c.prototype._getTouchEventType=function(t){return l.touchEventMode==="SIM"?"sap"+t:t};c.prototype.pageUp=function(){this._doScroll(n.Page,false)};c.prototype.pageDown=function(){this._doScroll(n.Page,true)};c.prototype.setScrollPosition=function(t){if(this._$ScrollDomRef){this.setCheckedScrollPosition(t,true)}else{this.setProperty("scrollPosition",t)}return this};c.prototype.setCheckedScrollPosition=function(e,o){var i=Math.max(e,0);if(this._bStepMode===undefined){this._bStepMode=!this.getContentSize()}var r=i;if(this._bStepMode){i=Math.min(i,this.getSteps());r=i*this._iFactor}i=Math.round(i);this._bSuppressScroll=!o;this.setProperty("scrollPosition",i,true);if(this.getVertical()){this._$ScrollDomRef.scrollTop(r)}else{if(t.browser.firefox&&this._bRTL){this._$ScrollDomRef.scrollLeft(-r)}else if(t.browser.webkit&&this._bRTL){var s=this._$ScrollDomRef.get(0);this._$ScrollDomRef.scrollLeft(s.scrollWidth-s.clientWidth-r)}else{this._$ScrollDomRef.scrollLeft(r)}}if(l.touchEventMode==="ON"){var h=i;if(this._bStepMode){h=Math.round(i*this._iTouchStepTreshold)}this._oTouchScroller.__scrollTop=this.getVertical()?h:0;this._oTouchScroller.__scrollLeft=this.getVertical()?0:h}};c.prototype.setContentSize=function(t){this.setProperty("contentSize",t,true);this._bStepMode=false;var e=this.$("sbcnt");if(e){if(this.getVertical()){e.height(t)}else{e.width(t)}}return this};c.prototype._doScroll=function(e,o){var i=null;if(this._$ScrollDomRef){if(this.getVertical()){i=Math.round(this._$ScrollDomRef.scrollTop())}else{i=Math.round(this._$ScrollDomRef.scrollLeft());if(t.browser.firefox&&this._bRTL){i=Math.abs(i)}else if(t.browser.webkit&&this._bRTL){var l=this._$ScrollDomRef.get(0);i=l.scrollWidth-l.clientWidth-l.scrollLeft}}}if(this._bStepMode){var h=Math.round(i/this._iFactor);var n=this._iOldStep;if(n!==h){this.setCheckedScrollPosition(h,false);s.debug("-----STEPMODE-----: New Step: "+h+" --- Old Step: "+n+" --- Scroll Pos in px: "+i+" --- Action: "+e+" --- Direction is forward: "+o);this.fireScroll({action:e,forward:o,newScrollPos:h,oldScrollPos:n});this._iOldStep=h}}else{i=Math.round(i);this.setProperty("scrollPosition",i,true);s.debug("-----PIXELMODE-----: New ScrollPos: "+i+" --- Old ScrollPos: "+this._iOldScrollPos+" --- Action: "+e+" --- Direction is forward: "+o);this.fireScroll({action:e,forward:o,newScrollPos:i,oldScrollPos:this._iOldScrollPos})}this._bSuppressScroll=false;this._iOldScrollPos=i;this._bMouseWheel=false;r.notifyScrollEvent({type:e})};c.prototype.onThemeChanged=function(){this.rerender()};c.prototype.getNativeScrollPosition=function(){if(this._$ScrollDomRef){if(this.getVertical()){return Math.round(this._$ScrollDomRef.scrollTop())}else{return Math.round(this._$ScrollDomRef.scrollLeft())}}return 0};c.prototype.setNativeScrollPosition=function(t){var e=Math.round(t);if(this._$ScrollDomRef){if(this.getVertical()){this._$ScrollDomRef.scrollTop(e)}else{this._$ScrollDomRef.scrollLeft(e)}}};return c});
//# sourceMappingURL=ScrollBar.js.map