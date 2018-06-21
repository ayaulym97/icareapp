import angular from "angular";
import uiRouter from "angular-ui-router";
import personalStuffComponent from "./personalStuff.component";

let personalStuffModule = angular.module("personalStuff", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.stuff", {
				url: "/stuff",
				views: {
					"personal": {
						component: "personalStuff"
					}
				}
			});
	})

	.component("personalStuff", personalStuffComponent)

	.name;

export default personalStuffModule;
