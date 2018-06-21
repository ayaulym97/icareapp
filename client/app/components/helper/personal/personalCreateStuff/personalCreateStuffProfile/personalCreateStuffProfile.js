import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateStuffProfileComponent from "./personalCreateStuffProfile.component";

let personalCreateStuffProfileModule = angular.module("personalCreateStuffProfile", [
	uiRouter
])

	.component("personalCreateStuffProfile", personalCreateStuffProfileComponent)

	.name;

export default personalCreateStuffProfileModule;
