sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createAnredeDataModel: function () {
			var oModel = new JSONModel(
				[{
					key: "0001",
					text: "Frau"
				}, {
					key: "0002",
					text: "Herr"
				}, {
					key: "Z000",
					text: "Divers"
				}]
			);

			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createTitelDataModel: function () {
			var oModel = new JSONModel(
				[{
					key: "010",
					text: "Dr."
				}, {
					key: "050",
					text: "Prof."
				}]
			);

			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createDataSecurityModel: function () {
			var oModel = new JSONModel({
				HTML: "<p>Ich habe die <a href=\"///www.stadt-koeln.de/service/kontakt/impressum/datenschutzerklaerung\" style=\"color:green; font-weight:600;\">Datenschutzerklärung</a> der Stadt Köln zur Kenntnis genommen und erkläre mich einverstanden mit der dort beschriebenen Verwendung meiner Daten.</p>"
			});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}

	};
});