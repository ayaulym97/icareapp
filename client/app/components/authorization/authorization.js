import angular from "angular";
import uiRouter from "angular-ui-router";
import authorizationComponent from "./authorization.component";

let authorizationModule = angular.module("authorization", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("authorization", {
				url: "/",
				views: {
					"app": {
						component: "authorization"
					}
				},
				data: {
					permissions: {
						only: "ANONYM",
						except: ["HELPER", "ADMIN", "SUPPORT"],
						redirectTo: {
							HELPER: "helper.calendar",
							ADMIN: "admin.clinics",
              SUPPORT: "support"
						}
					}
				}
			});
	})

	.component("authorization", authorizationComponent)

	.name;

export default authorizationModule;
