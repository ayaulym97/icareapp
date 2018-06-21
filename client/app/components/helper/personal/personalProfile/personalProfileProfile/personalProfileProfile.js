import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileProfileComponent from "./personalProfileProfile.component";

let personalProfileProfileModule = angular.module("personalProfileProfile", [
	uiRouter
])

	.component("personalProfileProfile", personalProfileProfileComponent)

	.name;

export default personalProfileProfileModule;
