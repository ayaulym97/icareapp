import angular from "angular";
import uiRouter from "angular-ui-router";
import adminComponent from "./admin.component";

import adminTopBar from "../../common/admin/adminTopBar/adminTopBar";

import clinics from "./clinics/clinics";
import clinicsSidebar from "./clinics/clinicsSidebar/clinicsSidebar";

import adminStatistics from "./adminStatistics/adminStatistics";
import adminStatisticsSidebar from "./adminStatistics/adminStatisticsSidebar/adminStatisticsSidebar";

import helperIndicators from "./helperIndicators/helperIndicators";
import helperIndicatorsSidebar from "./helperIndicators/helperIndicatorsSidebar/helperIndicatorsSidebar";

let adminModule = angular.module("admin", [
	uiRouter,
	adminTopBar,

	clinics,
	clinicsSidebar,

	adminStatistics,
	adminStatisticsSidebar,

	helperIndicators,
	helperIndicatorsSidebar,
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("admin", {
				abstract: true,
				url: "/admin",
				views: {
					"app": {
						component: "admin"
					}
				},
				data: {
					permissions: {
						only: "ADMIN",
						except: ["HELPER", "ANONYM", "SUPPORT"],
						redirectTo: {
							HELPER: "helper.calendar",
							ANONYM: "authorization"
						}
					}
				}
			});
	})

	.component("admin", adminComponent)

	.name;

export default adminModule;
