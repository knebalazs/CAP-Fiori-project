/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/m/HBox","sap/m/Link","sap/ui/core/Icon"],function(t,e,n,i){"use strict";const o=t.extend("sap.m.LinkTileContent",{metadata:{library:"sap.m",properties:{iconSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},linkText:{type:"string",group:"Data",defaultValue:""},linkHref:{type:"sap.ui.core.URI",group:"Data",defaultValue:null}},events:{linkPress:{allowPreventDefault:true,parameters:{ctrlKey:{type:"boolean"},metaKey:{type:"boolean"}}}}}});o.prototype.init=function(){this._linkTileContent=null};o.prototype.getLinkTileContentInstance=function(){if(!this._linkTileContent){this._linkTileContent=new e;this._addItem(this._linkTileContent);this._linkTileContent.addStyleClass("sapLTC")}return this._linkTileContent};o.prototype._addItem=function(t){const{iconSrc:e,linkText:o,linkHref:s}=this.mProperties;this._oIcon=new i({size:"1rem",src:e});this._oLink=new n({text:o,href:s,press:this._onLinkPress.bind(this)});t.addItem(this._oIcon);t.addItem(this._oLink)};o.prototype._getLink=function(){return this._oLink};o.prototype._getIcon=function(){return this._oIcon};o.prototype._onLinkPress=function(t){const{ctrlKey:e,metaKey:n}=t.mParameters;this.fireLinkPress({ctrlKey:e,metaKey:n})};return o});
//# sourceMappingURL=LinkTileContent.js.map