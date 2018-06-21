import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateComponent from "./personalCreate.component";

let personalCreateModule = angular.module("personalCreate", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.create", {
				url: "/create",
				views: {
					"personal": {
						component: "personalCreate"
					}
				}
			});
	})

	.component("personalCreate", personalCreateComponent)

	.name;

export default personalCreateModule;
