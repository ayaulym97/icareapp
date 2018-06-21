import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateMedtestsComponent from "./personalCreateMedtests.component";

let personalCreateMedtestsModule = angular.module("personalCreateMedtests", [
	uiRouter
])

	.component("personalCreateMedtests", personalCreateMedtestsComponent)

	.name;

export default personalCreateMedtestsModule;
