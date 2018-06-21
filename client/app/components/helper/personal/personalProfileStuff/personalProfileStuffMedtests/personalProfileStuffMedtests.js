import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileStuffMedtestsComponent from "./personalProfileStuffMedtests.component";

let personalProfileStuffMedtestsModule = angular.module("personalProfileStuffMedtests", [
	uiRouter
])

	.component("personalProfileStuffMedtests", personalProfileStuffMedtestsComponent)

	.name;

export default personalProfileStuffMedtestsModule;
