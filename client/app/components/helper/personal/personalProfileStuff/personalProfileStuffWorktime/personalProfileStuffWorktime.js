import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileStuffWorktimeComponent from "./personalProfileStuffWorktime.component";

let personalProfileStuffWorktimeModule = angular.module("personalProfileStuffWorktime", [
	uiRouter
])

	.component("personalProfileStuffWorktime", personalProfileStuffWorktimeComponent)

	.name;

export default personalProfileStuffWorktimeModule;
