import angular from "angular";
import uiRouter from "angular-ui-router";
import helperComponent from "./helper.component";
import calendar from "./calendar/calendar";
import calendarSidebar from "./calendar/calendarSidebar/calendarSidebar";
import calendarListItems from "./calendar/calendarSidebar/sidebarListItems/sidebarListItems";
import calendarReserveModal from "./calendar/calendarReserveModal/calendarReserveModal";
// import chat from "./chat/chat";
// import chatSidebar from "./chat/chatSidebar/chatSidebar";
import helperStatistics from "./helperStatistics/helperStatistics";
import statistics from "./helperStatistics/statistics/statistics";
import helperHistory from "./helperStatistics/history/history";
import helperStatisticsSidebar from "./helperStatistics/helperStatisticsSidebar/helperStatisticsSidebar";
import personal from "./personal/personal";
import personalSidebar from "./personal/personalSidebar/personalSidebar";

let helperModule = angular.module("helper", [
	uiRouter,

	calendar,
	calendarSidebar,
	calendarListItems,
	calendarReserveModal,

	// chat,
	// chatSidebar,

	helperStatistics,
	statistics,
	helperHistory,
	helperStatisticsSidebar,

	personal,
	personalSidebar
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper", {
				abstract: true,
				url: "/helper",
				views: {
					"app": {
						component: "helper",
					}
				},
				data: {
					permissions: {
						only: "HELPER",
						except: ["ADMIN", "ANONYM", "SUPPORT"],
						redirectTo: {
							ADMIN: "admin.clinics",
							ANONYM: "authorization"
						}
					}
				}
			});
	})


	.component("helper", helperComponent)

	.name;

export default helperModule;
