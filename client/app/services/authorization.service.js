/**
 * Created by amirkaaa on 6/28/17.
 */

import APIConfig from "../utils/config";
import _omit from "lodash/omit";
import msgpack from "msgpack-lite";

class Authorization {
	constructor ($http, $localStorage, $rootScope, $state, $q) {
		"ngInject";
		this.$http = $http;
		this.$localStorage = $localStorage;
		this.$rootScope = $rootScope;
		this.$state = $state;
		this.$q = $q;

		this.baseUrl = APIConfig.API_URL + "auth";

		this.token = null;

		this.user = {
			type: null
		};

		$rootScope.$on("Auth.Unauthorized", () => {
			console.log("Unauthorized");
		});

		$rootScope.$on("Auth.ClearUserInfo", () => {
			console.log("Clearing information");
			this.clearData();
		});

		$rootScope.$on("Auth.CheckUser", () => {
			if (!this.validateTokenHeader()) {
				this.logout(true);
			}
		});
	}

	// validateUser (params) {
	// 	/*
	// * Finding user in system
	// * */
	// 	let deffered = this.$q.defer();
	//
	// 	this.$http.post(this.baseUrl + "/validate_user/", params).then((response) => {
	//
	// 		if (response.data.hasOwnProperty("type")) {
	// 			this.user = { type: null };
	// 			this.user.type = response.data.type;
	// 		}
	// 		deffered.resolve(response.data);
	// 	}, (response) => {
	// 		let data = ! response.data.hasOwnProperty("status")
	// 			? { error: 1 } // Server error
	// 			: response.data;
	// 		deffered.reject(data);
	// 	});
	//
	// 	return deffered.promise;
	// }

	clearData () {
		delete this.$localStorage.token;
		delete this.$localStorage.uid;
		this.$http.defaults.headers.common["Authorization"] = "";
		this.token = null;
		this.user = null;
	}

	logout(force = false) {
		if (force) {
			this.clearData();
			this.$rootScope.$broadcast("Realtime.Disconnect");

			this.$state.go("authorization");
		}
	}

	validateTokenHeader () {
		let serviceToken = null;

		if (this.token !== null) {
			serviceToken = this.token || null;
		}

		let storageToken = this.$localStorage.token || null;

		if (storageToken !== null) {
			this.token = storageToken;
			return (serviceToken !== null && storageToken !== null) && serviceToken === storageToken;
		} else {
			return storageToken !== null;
		}
	}

	validateUserType () {

		if (this.validateTokenHeader()) {
			if (this.user.type === 0) {
				return "ANONYM";
			}
			if (this.user.type === 2 || this.user.type === 1) {
				return "HELPER";
			}
			if (this.user.type === 3) {
				return "ADMIN";
			}
			if (this.user.type === 4) {
				return "SUPPORT";
			}
		}
		else {
			return "ANONYM";
		}

	}

	setTokenHeader (token = null) {
		/*
     * Set up token from local storage or from args
     * */
		// from args
		if (token === null) token = this.$localStorage.token || null;


		if (token !== null) { // after condition
			this.token = token;
			this.$localStorage.token = this.token;
			this.$http.defaults.headers.common["Authorization"] = `Token ${ this.token }`;

			return true;
		}

		return false;
	}

	storeUser () {
		try {
			this.$localStorage.uid = msgpack.encode(this.user);

		} catch (e) {
			console.warn("Error saving data");
		}
	}

	restoreUser () {
		let storedData = this.$localStorage.uid || null;

		if (storedData !== null && storedData.hasOwnProperty("data") && storedData.hasOwnProperty("type") && storedData["type"] === "Buffer") {
			try {
				let uid = storedData["data"];

				let decoded = msgpack.decode(uid);

				if (typeof (decoded) !== "object") {
					throw "Something changed in data";
				} else if (typeof (decoded === "object")) {
					this.user = decoded;
				}
			} catch (e) {
				// console.warn("Error with restore data");
				this.clearData();
			}
		}
	}

	updatePerson(data) {
		this.user = _omit(data, "auth_token");

		this.storeUser(this.user);

		this.setTokenHeader(data["auth_token"]);
		this.$rootScope.$broadcast("Authorization.Logged");
	}

	getMe() {
		this.$http.get(this.baseUrl + "/get_me/").then((response) => {
			this.user = _omit(response.data, "auth_token");

			this.storeUser(this.user);

			this.$rootScope.$broadcast("User.Updated");
		}, () => {
			this.logout(true);
		});
	}

	login (data) {
		/*
     * Authorize user
     * */

		return this.$http.post(this.baseUrl + "/login/", data).then((response) => {
			this.updatePerson(response.data);
			return response;
		}, (error) => {
			return error;
		});
	}
}

export default Authorization;
