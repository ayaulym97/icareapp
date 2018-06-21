import angular from "angular";
import uiRouter from "angular-ui-router";
import approvedRequestComponent from "./approvedRequest.component";

let approvedRequestModule = angular.module("approvedRequest", [
	uiRouter
])

	.component("approvedRequest", approvedRequestComponent)

	.name;

export default approvedRequestModule;
