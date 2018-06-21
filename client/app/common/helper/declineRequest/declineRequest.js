import angular from "angular";
import uiRouter from "angular-ui-router";
import declineRequestComponent from "./declineRequest.component";

let declineRequestModule = angular.module("declineRequest", [
	uiRouter
])

	.component("declineRequest", declineRequestComponent)

	.name;

export default declineRequestModule;
