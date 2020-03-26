sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZUSERREQUESTMANAGEMENT.ZUSERREQUESTMANAGEMENT.controller.RESETPASSWORD", {

		
		onInit: function () {
			
			var oPassworReset = new sap.ui.model.json.JSONModel();

			var pwResetData = {"userName": ""};
			oPassworReset.setData(pwResetData);
			this.getView().setModel(oPassworReset, "pwResetModel");

		},

		onPwReset: function(){
			var iUserName =this.getView().getModel("pwResetModel").getData().userName;

			var oModel = this.getOwnerComponent().getModel("userRequestModel");
			oModel.callFunction("/ResetUserCredential", {method:"POST",urlParameters:{"UserName" : iUserName  }, 
                      success: function (oData, response) {
						MessageBox.success("Ihre Passwortanfrage wurde erfolgreich gesendet");
					}.bind(this),

					error: function (oError) {
						var errorJson = JSON.parse(oError.responseText);
						var messageText = errorJson.error.message.value;
						MessageBox.error(messageText);
					}.bind(this)                  
			});

		}// end of onPwReset

	});

});