import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileStuffProfileComponent from "./personalProfileStuffProfile.component";

let personalProfileStuffProfileModule = angular.module("personalProfileStuffProfile", [
	uiRouter
])

	.component("personalProfileStuffProfile", personalProfileStuffProfileComponent)

	.name;

export default personalProfileStuffProfileModule;
