import angular from "angular";
import uiRouter from "angular-ui-router";
import historyComponent from "./history.component";

let historyModule = angular.module("history", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.statistics.history", {
				url: "/history",
				views: {
					"statistics": {
						component: "history"
					}
				}
			});
	})

	.component("history", historyComponent)

	.name;

export default historyModule;
