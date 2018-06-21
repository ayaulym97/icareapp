import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileComponent from "./personalProfile.component";

let personalProfileModule = angular.module("personalProfile", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.profile", {
				url: "/profile/:id",
				views: {
					"personal": {
						component: "personalProfile"
					}
				},
				data: {
					id: null
				}
			});
	})

	.component("personalProfile", personalProfileComponent)

	.name;

export default personalProfileModule;
