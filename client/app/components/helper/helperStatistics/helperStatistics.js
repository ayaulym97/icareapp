import angular from "angular";
import uiRouter from "angular-ui-router";
import helperStatisticsComponent from "./helperStatistics.component";

let helperStatisticsModule = angular.module("helperStatistics", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.statistics", {
				url: "/statistics",
				views: {
					"helper@helper": {
						component: "helperStatistics"
					}
				}
			});
	})

	.component("helperStatistics", helperStatisticsComponent)

	.name;

export default helperStatisticsModule;
