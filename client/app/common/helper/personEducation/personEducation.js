import angular from "angular";
import uiRouter from "angular-ui-router";
import personEducationComponent from "./personEducation.component";

let personEducationModule = angular.module("personEducation", [
	uiRouter
])

	.component("personEducation", personEducationComponent)

	.name;

export default personEducationModule;
