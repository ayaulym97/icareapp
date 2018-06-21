import angular from "angular";
import uiRouter from "angular-ui-router";
import medbookMapComponent from "./medbookMap.component";

let medbookMapModule = angular.module("medbookMap", [
	uiRouter
])

	.component("medbookMap", medbookMapComponent)

	.name;

export default medbookMapModule;
