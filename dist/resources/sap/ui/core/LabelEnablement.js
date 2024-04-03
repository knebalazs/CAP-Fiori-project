/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/ManagedObject","sap/base/assert"],function(e,t){"use strict";var r={};var i=["sap.ui.comp.navpopover.SmartLink","sap.m.Link","sap.m.Label","sap.m.Text","sap.m.Select","sap.ui.webc.main.Label","sap.ui.webc.main.Link"];var n;function a(e,t){if(!e){return null}n=n?n:sap.ui.require("sap/ui/core/Element");var r=n.getElementById(e);if(r&&t&&(!r.isA("sap.ui.core.Control")||r.getDomRef())){r.invalidate()}return r}function s(e){var t=e.getLabelFor()||e._sAlternativeId||"";return t}function u(e,t){var i=e.getId();var n=e.__sLabeledControl;var u=t?null:s(e);if(n==u){return}if(!t){e.invalidate()}if(u){e.__sLabeledControl=u}else{delete e.__sLabeledControl}var o;if(n){o=r[n];if(o){o=o.filter(function(e){return e!=i});if(o.length){r[n]=o}else{delete r[n]}}}if(u){o=r[u]||[];o.push(i);r[u]=o}var l=a(n,true);var f=a(u,true);if(l){e.detachRequiredChange(l)}if(f){e.attachRequiredChange(f)}}function o(e){if(!e){throw new Error("sap.ui.core.LabelEnablement cannot enrich null")}var t=e.getMetadata();if(!t.isInstanceOf("sap.ui.core.Label")){throw new Error("sap.ui.core.LabelEnablement only supports Controls with interface sap.ui.core.Label")}var r=t.getAssociation("labelFor");if(!r||r.multiple){throw new Error("sap.ui.core.LabelEnablement only supports Controls with a to-1 association 'labelFor'")}}function l(e){if(!e){return true}var t=e.getMetadata().getName();return i.indexOf(t)<0}var f={};f.writeLabelForAttribute=function(e,t){if(!t||!t.getLabelForRendering){return}var r=t.getLabelForRendering();if(!r){return}var i=a(r);if(i&&i.getIdForLabel){r=i.getIdForLabel()}if(r&&l(i)){e.attr("for",r)}};f.getReferencingLabels=function(e){var t=e?e.getId():null;if(!t){return[]}return r[t]||[]};f.isRequired=function(e){if(g(e)){return true}var t=f.getReferencingLabels(e),r;n=n?n:sap.ui.require("sap/ui/core/Element");for(var i=0;i<t.length;i++){r=n.getElementById(t[i]);if(g(r)){return true}}return false};function g(e){return!!(e&&e.getRequired&&e.getRequired())}f.enrich=function(i){o(i);i.__orig_setLabelFor=i.setLabelFor;i.setLabelFor=function(e){var t=this.__orig_setLabelFor.apply(this,arguments);u(this);return t};i.__orig_exit=i.exit;i.exit=function(){this._sAlternativeId=null;u(this,true);if(i.__orig_exit){i.__orig_exit.apply(this,arguments)}};i.setAlternativeLabelFor=function(r){if(r instanceof e){r=r.getId()}else if(r!=null&&typeof r!=="string"){t(false,"setAlternativeLabelFor(): sId must be a string, an instance of sap.ui.base.ManagedObject or null");return this}this._sAlternativeId=r;u(this);return this};i.getLabelForRendering=function(){var e=this.getLabelFor()||this._sAlternativeId;var t=a(e);var r;n=n?n:sap.ui.require("sap/ui/core/Element");if(t&&t.getIdForLabel&&t.getIdForLabel()){r=n.getElementById(t.getIdForLabel());if(r){t=r}}return l(t)?e:""};i.isLabelFor=function(e){var t=e.getId();var i=r[t];return i&&i.indexOf(this.getId())>-1};if(!i.getMetadata().getProperty("required")){return}i.__orig_setRequired=i.setRequired;i.setRequired=function(e){var t=this.getRequired(),r=this.__orig_setRequired.apply(this,arguments);if(this.getRequired()!==t){a(this.__sLabeledControl,true)}return r};i.isRequired=function(){var e=a(this.getLabelForRendering(),false);return g(this)||g(e)};i.isDisplayOnly=function(){if(this.getDisplayOnly){return this.getDisplayOnly()}else{return false}};i.isWrapping=function(){if(this.getWrapping){return this.getWrapping()}else{return false}};i.disableRequiredChangeCheck=function(e){this._bNoRequiredChangeCheck=e};i.attachRequiredChange=function(e){if(e&&!this._bNoRequiredChangeCheck){if(e.getMetadata().getProperty("required")){e.attachEvent("_change",s,this)}this._bRequiredAttached=true}};i.detachRequiredChange=function(e){if(e&&!this._bNoRequiredChangeCheck){if(e.getMetadata().getProperty("required")){e.detachEvent("_change",s,this)}this._bRequiredAttached=false}};function s(e){if(e.getParameter("name")=="required"){this.invalidate()}}i.__orig_onAfterRendering=i.onAfterRendering;i.onAfterRendering=function(e){var t;if(this.__orig_onAfterRendering){t=this.__orig_onAfterRendering.apply(this,arguments)}if(!this._bNoRequiredChangeCheck&&!this._bRequiredAttached&&this.__sLabeledControl){var r=a(this.__sLabeledControl,false);this.attachRequiredChange(r)}return t}};return f},true);
//# sourceMappingURL=LabelEnablement.js.map