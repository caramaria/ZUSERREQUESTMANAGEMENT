sap.ui.define([
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/mvc/Controller"

], function (MessageToast, MessageBox,Controller) {
	"use strict";

	return Controller.extend("ZUSERREQUESTMANAGEMENT.ZUSERREQUESTMANAGEMENT.controller.ZUSERREQUESTMANAGEMENT", {

		onBeforeRendering: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var mParams = jQuery.sap.getUriParameters();
			if (mParams.get("pwreset") === "true") {
				this.oRouter.navTo("RESETPASSWORD");
			} else if (mParams.get("RequestID") !== null) {
				this.oRouter.navTo("ACTIVATIONSUCCESS");
			} else {
				return;
			}
		},

		onInit: function () {
			var oBasicDataModel = new sap.ui.model.json.JSONModel();

			var basicData = {
				"gender": "",
				"prefix": "",
				"firstName": "",
				"lastName": "",
				"email": "",
				"phoneWork": "",
				"phone": "",
				"street": "",
				"housenumber": "",
				"city": "",
				"plz": "",
				"birthday": undefined,
				"birthplace": "",
				"fax": "",
				"password1": "",
				"password2": "",
				"privacyCheck": false
			};

			oBasicDataModel.setData(basicData);
			this.getView().setModel(oBasicDataModel, "basicInfo");
		}, //end of onInit

		onSubmit: function (oEvent) {

			var _basicData = this.getView().getModel("basicInfo").getData();
			var _iGender = this.getView().byId("Select_Anrede_id").getSelectedKey();
			var _iPrefix = this.getView().byId("Select_Titel_id").getSelectedKey();

			var _iFirstName = _basicData.firstName;
			var _iLastname = _basicData.lastName;
			var _iBirthday = _basicData.birthday; //Edm.DateTime
			var _iBirthplace = _basicData.birthplace;

			var _iStreet = _basicData.street;
			var _iHouseNumber = _basicData.housenumber;
			var _iCity = _basicData.city;
			var _iPLZ = _basicData.plz;

			var _iEmail = _basicData.email;
			var _iPhoneWork = _basicData.phoneWork;
			var _iPhone = _basicData.phone;
			var _iFax = _basicData.fax;

			var _iPassword1 = _basicData.password1;
			var _iPassword2 = _basicData.password2;

			var _iDSVO; //Boolean
			if (_basicData.privacyCheck === true) {
				_iDSVO = "1";
			} else {
				_iDSVO = 0;
			}

			var checkFieldStatus = this.checkRequiredFields(_basicData);

			if (checkFieldStatus == true) {
				var oModel = this.getOwnerComponent().getModel("userRequestModel");
				oModel.create("/UserRequestCollection", {
					UserName: _iEmail,
					FirstName: _iFirstName,
					LastName: _iLastname,
					EmailAddress: _iEmail,
					PhoneNumber: _iPhoneWork,
					UsrCategory: "001",
					Password: _iPassword2,
					Street: _iStreet,
					PLZ: _iPLZ,
					City: _iCity,
					Birthdate: _iBirthday,
					Birthplace: _iBirthplace,
					Fax: _iFax,
					Gender: _iGender,
					Housenumber: _iHouseNumber,
					Mobile: _iPhone,
					DSVO: _iDSVO

				}, {

					success: function (oData, response) {

						MessageToast.show("Benutzeranfrage wurde erfolgreich gesendet");
						//clear OA Model
						this.getView().getModel("basicInfo").setData(null);
						this.oRouter.navTo("REGISTERSUCCESS");

					}.bind(this),

					error: function (oError) {
						var errorJson = JSON.parse(oError.responseText);
						var messageText = errorJson.error.message.value;
						MessageBox.error(messageText);
					}.bind(this)
				});
			}
		}, //end of onSubmit()

		onCancel: function (oEvent) {
			window.location.href = "/oa#zonlineapplication-maintain";
		}, // end of onCancel

		checkRequiredFields: function (_basicData) {

			if (this.getView().byId("Select_Anrede_id").getSelectedKey() == "") {
				MessageToast.show("Bitte wählen Sie eine Anrede aus");
				this.getView().byId("Select_Anrede_id").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.lastName == "") {
				MessageToast.show("Bitte geben Sie einen Familiennamen an");
				this.getView().byId("inputLastName").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.firstName == "") {
				MessageToast.show("Bitte geben Sie einen Vornamen an");
				this.getView().byId("inputFirstname").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.street == "") {
				MessageToast.show("Bitte geben Sie eine Straße an");
				this.getView().byId("inputSreet").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.housenumber == "") {
				MessageToast.show("Bitte geben Sie eine Hausnummer an");
				this.getView().byId("no").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.city == "") {
				MessageToast.show("Bitte geben Sie einen Ort an");
				this.getView().byId("no").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.plz == "") {
				MessageToast.show("Bitte geben Sie eine Postleitzahl an");
				this.getView().byId("inputCity").setValueState(sap.ui.core.ValueState.Error);
			} else if (_basicData.phoneWork == "") {
				MessageToast.show("Bitte geben Sie eine Telefonnummer an");
				this.getView().byId("inputPhoneWork").setValueState(sap.ui.core.ValueState.Error);

			} else if (_basicData.email == "") {
				MessageToast.show("Bitte geben Sie eine E-Mail Adresse an");
				this.getView().byId("inputEmail").setValueState(sap.ui.core.ValueState.Error);

			} else if (_basicData.password1 == "") {
				MessageToast.show("Bitte geben Sie ein Passwort an");
				this.getView().byId("inputPasswprd").setValueState(sap.ui.core.ValueState.Error);

			} else if (_basicData.password2 == "") {
				MessageToast.show("Bitte wiederholen Sie Ihr Passwort");
				this.getView().byId("password2").setValueState(sap.ui.core.ValueState.Error);

			} else if (_basicData.privacyCheck == false) {
				MessageToast.show("Bitte akzeptieren Sie die Datenschutzbestimmungen");
				this.getView().byId("privacyCheckbox").setValueState(sap.ui.core.ValueState.Error);

			} else {
				if (_basicData.password1 != _basicData.password2) {
					MessageToast.show("Passwörter stimmen nicht überein");
					this.getView().byId("inputPasswprd").setValueState(sap.ui.core.ValueState.Error);
					this.getView().byId("password2").setValueState(sap.ui.core.ValueState.Error);
				} else {
					return true;
				}
			}
		}, // checkRequiredFields

		emailVerification: function () {
			var email = this.getView().byId("inputEmail").getValue();
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!mailregex.test(email)) {
				MessageBox.error(email + " is not a valid email address");
				this.getView().byId("inputEmail").setValueState(sap.ui.core.ValueState.Error);
			}

		}//end of emailVerification

	});
});