import angular from "angular";
import uiRouter from "@uirouter/angularjs";
import insuranceComponent from "./insurance.component";

import insuranceAuth from "./insuranceAuth/insuranceAuth";

import insuranceClinic from "./insuranceClinic/insuranceClinic";

let insuranceModule = angular.module("insurance", [
	uiRouter,

	insuranceClinic,
])

	.config(($stateProvider) => {
		"ngInject";

		$stateProvider
			.state("insurance", {
				url: "/insurance",
				views: {
					"app": {
						component: "insurance"
					}
				}
			});
	})

	.component("insurance", insuranceComponent)

	.name;

export default insuranceModule;
