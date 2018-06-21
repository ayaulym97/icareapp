import angular from "angular";
import uiRouter from "angular-ui-router";
import adminStatisticsSidebarComponent from "./adminStatisticsSidebar.component";

let adminStatisticsSidebarModule = angular.module("adminStatisticsSidebar", [
	uiRouter
])

	.component("adminStatisticsSidebar", adminStatisticsSidebarComponent)

	.name;

export default adminStatisticsSidebarModule;
