import angular from "angular";
import uiRouter from "angular-ui-router";
import clinicsSidebarComponent from "./clinicsSidebar.component";

let clinicsSidebarModule = angular.module("clinicsSidebar", [
	uiRouter
])

	.component("clinicsSidebar", clinicsSidebarComponent)

	.name;

export default clinicsSidebarModule;
