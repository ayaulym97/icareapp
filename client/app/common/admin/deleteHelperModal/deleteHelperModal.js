import angular from "angular";
import uiRouter from "angular-ui-router";
import deleteHelperModalComponent from "./deleteHelperModal.component";

let deleteHelperModalModule = angular.module("deleteHelperModal", [
	uiRouter
])

	.component("deleteHelperModal", deleteHelperModalComponent)

	.name;

export default deleteHelperModalModule;
