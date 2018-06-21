import angular from "angular";
import uiRouter from "angular-ui-router";
import calendarSidebarComponent from "./calendarSidebar.component";

let calendarSidebarModule = angular.module("calendarSidebar", [
	uiRouter
])

	.component("calendarSidebar", calendarSidebarComponent)

	.name;

export default calendarSidebarModule;
