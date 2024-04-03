/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/strings/hyphenate"],function(e){"use strict";var t={};t.setFlexItemStyles=function(e,i){e=e||null;var n=""+i.getOrder(),f=""+i.getGrowFactor(),s=""+i.getShrinkFactor(),l=i.getBaseSize().toLowerCase(),r=i.getMinHeight(),y=i.getMaxHeight(),d=i.getMinWidth(),o=i.getMaxWidth();if(typeof n!=="undefined"){t.setStyle(e,i,"order",n)}if(typeof f!=="undefined"){t.setStyle(e,i,"flex-grow",f)}if(typeof s!=="undefined"){t.setStyle(e,i,"flex-shrink",s)}if(typeof l!=="undefined"){t.setStyle(e,i,"flex-basis",l)}if(typeof r!=="undefined"){t.setStyle(e,i,"min-height",r)}if(typeof y!=="undefined"){t.setStyle(e,i,"max-height",y)}if(typeof d!=="undefined"){t.setStyle(e,i,"min-width",d)}if(typeof o!=="undefined"){t.setStyle(e,i,"max-width",o)}};t.setStyle=function(i,n,f,s){if(typeof s==="string"){s=e(s)}else if(typeof s==="number"){s=s.toString()}t.writeStyle(i,n,f,s)};t.writeStyle=function(e,t,i,n){if(e){if(n==="0"||n){e.style(i,n)}}else{if(t.$().length){if(n!=="0"&&!n){t.$().css(i,null)}else{t.$().css(i,n)}}else{if(t.getParent()){if(n!=="0"&&!n){t.getParent().$().css(i,null)}else{t.getParent().$().css(i,n)}}}}};return t},true);
//# sourceMappingURL=FlexBoxStylingHelper.js.map