import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateStuffProceduresComponent from "./personalCreateStuffProcedures.component";

let personalCreateStuffProceduresModule = angular.module("personalCreateStuffProcedures", [
	uiRouter
])

	.component("personalCreateStuffProcedures", personalCreateStuffProceduresComponent)

	.name;

export default personalCreateStuffProceduresModule;
