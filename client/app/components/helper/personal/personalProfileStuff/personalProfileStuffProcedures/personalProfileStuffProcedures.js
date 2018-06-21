import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileStuffProceduresComponent from "./personalProfileStuffProcedures.component";

let personalProfileStuffProceduresModule = angular.module("personalProfileStuffProcedures", [
	uiRouter
])

	.component("personalProfileStuffProcedures", personalProfileStuffProceduresComponent)

	.name;

export default personalProfileStuffProceduresModule;
