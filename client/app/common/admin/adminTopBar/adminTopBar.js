import angular from "angular";
import uiRouter from "angular-ui-router";
import adminTopBarComponent from "./adminTopBar.component";

let adminTopBarModule = angular.module("adminTopBar", [
	uiRouter
])

	.component("adminTopBar", adminTopBarComponent)

	.name;

export default adminTopBarModule;
