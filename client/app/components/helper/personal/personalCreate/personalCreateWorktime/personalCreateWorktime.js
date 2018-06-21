import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateWorktimeComponent from "./personalCreateWorktime.component";

let personalCreateWorktimeModule = angular.module("personalCreateWorktime", [
	uiRouter
])

	.component("personalCreateWorktime", personalCreateWorktimeComponent)

	.name;

export default personalCreateWorktimeModule;
