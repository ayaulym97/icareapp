import angular from "angular";
import uiRouter from "angular-ui-router";
import deleteClinicModalComponent from "./deleteClinicModal.component";

let deleteClinicModalModule = angular.module("deleteClinicModal", [
	uiRouter
])

	.component("deleteClinicModal", deleteClinicModalComponent)

	.name;

export default deleteClinicModalModule;
