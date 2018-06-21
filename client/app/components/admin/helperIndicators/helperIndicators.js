import angular from "angular";
import uiRouter from "angular-ui-router";
import helperIndicatorsComponent from "./helperIndicators.component";

let helperIndicatorsModule = angular.module("helperIndicators", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("admin.helperIndicators", {
				url: "/helper/:id",
				views: {
					"admin@admin": {
						component: "helperIndicators"
					}
				}
			});
	})

	.component("helperIndicators", helperIndicatorsComponent)

	.name;

export default helperIndicatorsModule;
