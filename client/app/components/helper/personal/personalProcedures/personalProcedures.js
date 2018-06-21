import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProceduresComponent from "./personalProcedures.component";

let personalProceduresModule = angular.module("personalProcedures", [
	uiRouter,
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.procedures", {
				url: "/procedures",
				views: {
					"personal": {
						component: "personalProcedures"
					}
				}
			});
	})

	.component("personalProcedures", personalProceduresComponent)

	.name;

export default personalProceduresModule;
