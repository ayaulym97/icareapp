import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileStuffComponent from "./personalProfileStuff.component";

let personalProfileStuffModule = angular.module("personalProfileStuff", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.profileStuff", {
				url: "/profileStuff/:id",
				views: {
					"personal": {
						component: "personalProfileStuff"
					}
				},
				data: {
					id: null
				}
			});
	})

	.component("personalProfileStuff", personalProfileStuffComponent)

	.name;

export default personalProfileStuffModule;
