import angular from "angular";
import ngStorage from "ngstorage";

import AuthorizationService from "./authorization.service";
import CalendarService from "./calendar.service";
import PlaceService from "./place.service";
import PreloadService from "./preload.service";
import {Chat as ChatService} from "./chat.service";
import {Message as MessageService} from "./chat.service";
import RealtimeService from "./realtime.service";
import ClinicService from "./clinic.service";
import HelperService from "./helper.service";
import StatisticService from "./statistic.service";
import HelperSocketService from "./helper.socket.service";
import SuperhelperSocketService from "./superhelper.socket.service";
import AdminSocketService from "./admin.socket.service";
import PersonalDependenciesService from "./personalDependencies.service";
import SupportSocketService        from "./support.socket.service";

let serviceModule = angular.module("app.services", [
	ngStorage.name
])
	.service("AuthorizationService", AuthorizationService)
	.service("CalendarService", CalendarService)
	.service("PlaceService", PlaceService)
	.service("PreloadService", PreloadService)
	.service("ChatService", ChatService)
	.service("MessageService", MessageService)
	.service("RealtimeService", RealtimeService)
	.service("ClinicService", ClinicService)
	.service("HelperService", HelperService)
	.service("StatisticService", StatisticService)
	.service("HelperSocketService", HelperSocketService)
	.service("SuperhelperSocketService", SuperhelperSocketService)
	.service("AdminSocketService", AdminSocketService)
	.service("PersonalDependenciesService", PersonalDependenciesService)
	.service("SupportSocketService", SupportSocketService)

	.run((AuthorizationService, RealtimeService) => {
		"ngInject";

		if (AuthorizationService.setTokenHeader()) {
			AuthorizationService.restoreUser();
			AuthorizationService.getMe();
			// RealtimeService.connect();
		}
	})
	.name;


export default serviceModule;
