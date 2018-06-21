import angular from "angular";
import uiRouter from "angular-ui-router";
import adminStatisticsComponent from "./adminStatistics.component";

let adminStatisticsModule = angular.module("adminStatistics", [
	uiRouter,
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("admin.statistics", {
				url: "/statistics",
				views: {
					"admin@admin": {
						component: "adminStatistics"
					}
				}
			});
	})

	.component("adminStatistics", adminStatisticsComponent)

	.name;

export default adminStatisticsModule;
