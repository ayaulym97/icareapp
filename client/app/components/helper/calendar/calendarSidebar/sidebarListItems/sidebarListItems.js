import angular from "angular";
import uiRouter from "angular-ui-router";
import sidebarListItemsComponent from "./sidebarListItems.component";

let sidebarDateRequestModule = angular.module("sidebarDateRequest", [
	uiRouter
])

	.component("sidebarListItems", sidebarListItemsComponent)

	.name;

export default sidebarDateRequestModule;
