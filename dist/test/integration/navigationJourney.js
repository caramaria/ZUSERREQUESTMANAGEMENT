sap.ui.define(["sap/ui/test/opaQunit","ZUSERREQUESTMANAGEMENT/ZUSERREQUESTMANAGEMENT/test/integration/pages/ZUSERREQUESTMANAGEMENT"],function(e){"use strict";QUnit.module("Navigation Journey");e("Should see the initial page of the app",function(e,i,t){e.iStartTheApp();i.onTheAppPage.iLookAtTheScreen();t.onTheAppPage.iShouldSeeTheApp();t.iTeardownMyAppFrame()});e("Should check additional UI elements",function(e,i,t){e.iStartTheApp();i.onTheAppPage.iDoMyAction();t.onTheAppPage.iDoMyAssertion();t.iTeardownMyAppFrame()})});