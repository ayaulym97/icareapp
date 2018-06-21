import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateStuffComponent from "./personalCreateStuff.component";

let personalCreateStuffModule = angular.module("personalCreateStuff", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.createStuff", {
				url: "/createStuff",
				views: {
					"personal": {
						component: "personalCreateStuff"
					}
				}
			});
	})

	.component("personalCreateStuff", personalCreateStuffComponent)

	.name;

export default personalCreateStuffModule;
