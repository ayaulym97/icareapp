import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateStuffWorktimeComponent from "./personalCreateStuffWorktime.component";

let personalCreateStuffWorktimeModule = angular.module("personalCreateStuffWorktime", [
	uiRouter
])

	.component("personalCreateStuffWorktime", personalCreateStuffWorktimeComponent)

	.name;

export default personalCreateStuffWorktimeModule;
