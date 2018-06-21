import angular from "angular";
import uiRouter from "angular-ui-router";
import helperIndicatorsSidebarComponent from "./helperIndicatorsSidebar.component";

let helperIndicatorsSidebarModule = angular.module("helperIndicatorsSidebar", [
	uiRouter
])

	.component("helperIndicatorsSidebar", helperIndicatorsSidebarComponent)

	.name;

export default helperIndicatorsSidebarModule;
