import angular from "angular";
import uiRouter from "angular-ui-router";
import personalMedtestsComponent from "./personalMedtests.component";

let personalMedtestsModule = angular.module("personalMedtests", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.medtests", {
				url: "/medtests",
				views: {
					"personal": {
						component: "personalMedtests"
					}
				}
			});
	})

	.component("personalMedtests", personalMedtestsComponent)

	.name;

export default personalMedtestsModule;
