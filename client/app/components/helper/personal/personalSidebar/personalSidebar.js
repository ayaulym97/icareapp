import angular from "angular";
import uiRouter from "angular-ui-router";
import personalSidebarComponent from "./personalSidebar.component";

let personalSidebarModule = angular.module("personalSidebar", [
	uiRouter
])

	.component("personalSidebar", personalSidebarComponent)

	.name;

export default personalSidebarModule;
