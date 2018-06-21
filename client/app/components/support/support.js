import angular from "angular";
import uiRouter from "angular-ui-router";
import supportComponent from "./support.component";

import supportTopBar from "../../common/support/supportTopBar/supportTopBar";

let supportModule = angular.module("support", [
	uiRouter,
	supportTopBar
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("support", {
				// abstract: true,
				url: "/support",
				views: {
					"app": {
						component: "support",
					}
				},
				data: {
					permissions: {
						only: "SUPPORT",
						except: ["ADMIN", "ANONYM", "HELPER"],
						redirectTo: {
							ADMIN: "admin.clinics",
							ANONYM: "authorization",
							HELPER: "helper.personal.doctors"
						}
					}
				}
			});
	})

	.component("support", supportComponent)

	.name;

export default supportModule;
