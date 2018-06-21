import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileWorktimeComponent from "./personalProfileWorktime.component";

let personalProfileWorktimeModule = angular.module("personalProfileWorktime", [
	uiRouter
])

	.component("personalProfileWorktime", personalProfileWorktimeComponent)

	.name;

export default personalProfileWorktimeModule;
