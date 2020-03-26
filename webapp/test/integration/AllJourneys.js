/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"ZUSERREQUESTMANAGEMENT/ZUSERREQUESTMANAGEMENT/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ZUSERREQUESTMANAGEMENT/ZUSERREQUESTMANAGEMENT/test/integration/pages/ZUSERREQUESTMANAGEMENT",
	"ZUSERREQUESTMANAGEMENT/ZUSERREQUESTMANAGEMENT/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ZUSERREQUESTMANAGEMENT.ZUSERREQUESTMANAGEMENT.view.",
		autoWait: true
	});
});