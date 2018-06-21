import angular from "angular";
import uiRouter from "angular-ui-router";
import deleteDoctorModalComponent from "./deleteDoctorModal.component";

let deleteDoctorModalModule = angular.module("deleteDoctorModal", [
	uiRouter
])

	.component("deleteDoctorModal", deleteDoctorModalComponent)

	.name;

export default deleteDoctorModalModule;
