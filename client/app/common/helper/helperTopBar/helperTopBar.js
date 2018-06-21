import angular from "angular";
import uiRouter from "angular-ui-router";
import helperTopBarComponent from "./helperTopBar.component";

let helperTopBarModule = angular.module("helperTopBar", [
	uiRouter
])

	.component("helperTopBar", helperTopBarComponent)

	.name;

export default helperTopBarModule;
