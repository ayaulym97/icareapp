import angular from "angular";
import uiRouter from "angular-ui-router";
import clinicsComponent from "./clinics.component";

let clinicsModule = angular.module("clinics", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("admin.clinics", {
				url: "/clinics",
				views: {
					"admin@admin": {
						component: "clinics"
					}
				}
			});
	})

	.component("clinics", clinicsComponent)

	.name;

export default clinicsModule;
