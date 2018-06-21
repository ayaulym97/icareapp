/**
 * Created by amirkaaa on 6/29/17.
 */
import APIConfig from "../utils/config";

import io from "socket.io-client";
// import _each from "lodash/each";
// import _uniqueId from "lodash/uniqueId";
// import _remove from "lodash/remove";


class RealtimeService {
	constructor($http, AuthorizationService, $rootScope, HelperSocketService, SuperhelperSocketService, AdminSocketService, SupportSocketService) {
		"ngInject";
		this.$http = $http;
		this.AuthorizationService = AuthorizationService;
		this.$rootScope = $rootScope;
		this.HelperSocketService = HelperSocketService;
		this.SuperhelperSocketService = SuperhelperSocketService;
		this.AdminSocketService = AdminSocketService;
		this.SupportSocketService = SupportSocketService;
		this.socket = null;

		$rootScope.$on("Preload.Completed", () => {
			this.connect();
		});

		$rootScope.$on("Realtime.Disconnect", () => {
			this.disconnect();
		});
	}

	disconnect() {
		if (this.socket !== null) {
			// console.log("[Socket.io] Disconnected");
			this.socket.disconnect();
			this.socket.close();
		}
	}

	// getSocket() {
	// 	return this.socket;
	// }

	connect() {
		this.socket = io(APIConfig.WS_URL, {
			query: "token=" + this.AuthorizationService.token
		});

		this.socket.on("Connection.Status", (data) => {
			if (data.status === "CONNECTED") {
				console.log("[Socket.io] Connected");

				if (this.AuthorizationService.user.type === 3) this.AdminSocketService.getSockets(this.socket);

				if (this.AuthorizationService.user.type === 2) this.SuperhelperSocketService.getSockets(this.socket);

				if (this.AuthorizationService.user.type === 1) this.HelperSocketService.getSockets(this.socket);

				if (this.AuthorizationService.user.type === 4) this.SupportSocketService.getSockets(this.socket);
			}
		});
	}

}

export default RealtimeService;
