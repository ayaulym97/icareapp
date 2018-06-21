import angular from "angular";
import uiRouter from "angular-ui-router";
import chatSidebarComponent from "./chatSidebar.component";

let chatSidebarModule = angular.module("chatSidebar", [
	uiRouter
])

	.component("chatSidebar", chatSidebarComponent)

	.name;

export default chatSidebarModule;
