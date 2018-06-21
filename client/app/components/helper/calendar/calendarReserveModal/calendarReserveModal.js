import angular from "angular";
import uiRouter from "angular-ui-router";
import calendarReserveModalComponent from "./calendarReserveModal.component";

let calendarReserveModalModule = angular.module("calendarReserveModal", [
	uiRouter
])

	.component("calendarReserveModal", calendarReserveModalComponent)

	.name;

export default calendarReserveModalModule;
