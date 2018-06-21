import angular from "angular";
import uiRouter from "angular-ui-router";
import statisticsComponent from "./statistics.component";

let statisticsModule = angular.module("statistics", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.statistics.statistics", {
				url: "/statistic",
				views: {
					"statistics": {
						component: "statistics"
					}
				}
			});
	})

	.component("statistics", statisticsComponent)

	.name;

export default statisticsModule;
