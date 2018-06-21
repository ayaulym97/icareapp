import angular from "angular";
import uiRouter from "angular-ui-router";
import appendClinicModalComponent from "./appendClinicModal.component";

let appendClinicModalModule = angular.module("appendClinicModal", [
	uiRouter
])

	.component("appendClinicModal", appendClinicModalComponent)

	.name;

export default appendClinicModalModule;
