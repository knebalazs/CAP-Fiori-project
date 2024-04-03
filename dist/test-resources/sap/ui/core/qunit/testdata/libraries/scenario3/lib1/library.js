sap.ui.define([
	"sap/ui/core/Core",
	"sap/ui/core/library"
], function(oCore) {
	"use strict";
	return oCore.initLibrary({
		name: "testlibs.scenario3.lib1",
		dependencies: [
			"testlibs.scenario3.lib2"
		],
		noLibraryCSS: true
	});
});