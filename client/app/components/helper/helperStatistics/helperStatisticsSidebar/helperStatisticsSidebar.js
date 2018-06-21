import angular from "angular";
import uiRouter from "angular-ui-router";
import helperStatisticsSidebarComponent from "./helperStatisticsSidebar.component";

let helperStatisticsSidebarModule = angular.module("helperStatisticsSidebar", [
	uiRouter
])

	.component("helperStatisticsSidebar", helperStatisticsSidebarComponent)

	.name;

export default helperStatisticsSidebarModule;
