sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZUSERREQUESTMANAGEMENT.ZUSERREQUESTMANAGEMENT.controller.REGISTERSUCCESS", {

		onInit: function () {

		},

		onNavToOA: function () {
			window.location.href = "/oa#zonlineapplication-maintain";
		}

	});

});