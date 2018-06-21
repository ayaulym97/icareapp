import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateProfileComponent from "./personalCreateProfile.component";

let personalCreateProfileModule = angular.module("personalCreateProfile", [
	uiRouter
])

	.component("personalCreateProfile", personalCreateProfileComponent)

	.name;

export default personalCreateProfileModule;
