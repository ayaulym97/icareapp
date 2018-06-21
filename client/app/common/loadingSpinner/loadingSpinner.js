import angular from "angular";
import uiRouter from "angular-ui-router";
import loadingSpinnerComponent from "./loadingSpinner.component";

let loadingSpinnerModule = angular.module("loadingSpinner", [
	uiRouter
])

	.component("loadingSpinner", loadingSpinnerComponent)

	.name;

export default loadingSpinnerModule;
