import angular from "angular";
import uiRouter from "angular-ui-router";
import editHelperModalComponent from "./editHelperModal.component";

let editHelperModalModule = angular.module("editHelperModal", [
	uiRouter
])

	.component("editHelperModal", editHelperModalComponent)

	.name;

export default editHelperModalModule;
