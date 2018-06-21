import angular from "angular";
import uiRouter from "angular-ui-router";
import editClinicModalComponent from "./editClinicModal.component";

let editClinicModalModule = angular.module("editClinicModal", [
	uiRouter
])

	.component("editClinicModal", editClinicModalComponent)

	.name;

export default editClinicModalModule;
