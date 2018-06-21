import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileMedtestsComponent from "./personalProfileMedtests.component";

let personalProfileMedtestsModule = angular.module("personalProfileMedtests", [
	uiRouter
])

	.component("personalProfileMedtests", personalProfileMedtestsComponent)

	.name;

export default personalProfileMedtestsModule;
