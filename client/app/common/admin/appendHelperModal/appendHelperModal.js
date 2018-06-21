import angular from "angular";
import uiRouter from "angular-ui-router";
import appendHelperModalComponent from "./appendHelperModal.component";

let appendHelperModalModule = angular.module("appendHelperModal", [
	uiRouter
])

	.component("appendHelperModal", appendHelperModalComponent)

	.name;

export default appendHelperModalModule;
