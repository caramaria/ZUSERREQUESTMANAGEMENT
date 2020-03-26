function initModel() {
	var sUrl = "/sap/opu/odata/iwbep/USERREQUESTMANAGEMENT/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}