import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileProceduresComponent from "./personalProfileProcedures.component";

let personalProfileProceduresModule = angular.module("personalProfileProcedures", [
	uiRouter
])

	.component("personalProfileProcedures", personalProfileProceduresComponent)

	.name;

export default personalProfileProceduresModule;
