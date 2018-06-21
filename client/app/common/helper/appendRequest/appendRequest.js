import angular from "angular";
import uiRouter from "angular-ui-router";
import appendRequestComponent from "./appendRequest.component";

let appendRequestModule = angular.module("appendRequest", [
	uiRouter
])

	.component("appendRequest", appendRequestComponent)

	.name;

export default appendRequestModule;
