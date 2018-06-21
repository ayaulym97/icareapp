import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateStuffMedtestsComponent from "./personalCreateStuffMedtests.component";

let personalCreateStuffMedtestsModule = angular.module("personalCreateStuffMedtests", [
	uiRouter
])

	.component("personalCreateStuffMedtests", personalCreateStuffMedtestsComponent)

	.name;

export default personalCreateStuffMedtestsModule;
