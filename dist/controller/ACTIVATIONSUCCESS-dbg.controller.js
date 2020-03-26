sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZUSERREQUESTMANAGEMENT.ZUSERREQUESTMANAGEMENT.controller.ACTIVATIONSUCCESS", {

		onInit: function () {
			var oActivatodel = new sap.ui.model.json.JSONModel();
			var activteData = {
				"RequestID": "",
				"ActivationKey": ""
			};

			activteData.RequestID = jQuery.sap.getUriParameters().get("RequestID");
			activteData.ActivationKey = jQuery.sap.getUriParameters().get("ActivationKey");
			oActivatodel.setData(activteData);
		
			//enforce Put
			var oModel = this.getOwnerComponent().getModel("userRequestModel");
			oModel.sDefaultUpdateMethod = "PUT";

			var collection = "/UserRequestActivationRequestCollection";
			var collectionUpdate = collection + "('" + activteData.RequestID + "')";

			oModel.update(collectionUpdate, {
					RequestID: activteData.RequestID,
					ActivationKey: activteData.ActivationKey
				}, {

					success: function (oData, response) {
						MessageBox.success("Aktivierung wurde erfolgreich durchgeführt");
					}.bind(this),

					error: function (oError) {
						var errorJson = JSON.parse(oError.responseText);
						var messageText = errorJson.error.message.value;
						MessageBox.error(messageText);
					}.bind(this)
				}

			);

		}, //end of onInit

		onNavToOA: function () {
			window.location.href = "/oa#zonlineapplication-maintain";
		}
	});
});