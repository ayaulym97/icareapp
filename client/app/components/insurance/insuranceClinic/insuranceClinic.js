import angular from "angular";
import uiRouter from "@uirouter/angularjs";
import insuranceClinicComponent from "./insuranceClinic.component";

let insuranceClinicModule = angular.module("insuranceClinic", [
	uiRouter
])

	.component("insuranceClinic", insuranceClinicComponent)

	.name;

export default insuranceClinicModule;
