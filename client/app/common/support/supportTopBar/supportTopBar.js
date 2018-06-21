import angular from "angular";
import uiRouter from "angular-ui-router";
import supportTopBarComponent from "./supportTopBar.component";

let supportTopBarModule = angular.module("supportTopBar", [
	uiRouter
])

	.component("supportTopBar", supportTopBarComponent)

	.name;

export default supportTopBarModule;
