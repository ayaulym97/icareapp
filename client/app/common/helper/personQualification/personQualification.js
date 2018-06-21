import angular from "angular";
import uiRouter from "angular-ui-router";
import personQualificationComponent from "./personQualification.component";

let personQualificationModule = angular.module("personQualification", [
	uiRouter
])

	.component("personQualification", personQualificationComponent)

	.name;

export default personQualificationModule;
