import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateProceduresComponent from "./personalCreateProcedures.component";

let personalCreateProceduresModule = angular.module("personalCreateProcedures", [
	uiRouter
])

	.component("personalCreateProcedures", personalCreateProceduresComponent)

	.name;

export default personalCreateProceduresModule;
