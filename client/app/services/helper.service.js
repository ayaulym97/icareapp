/**
 * Created by amirkaaa on 5/8/17.
 */

// import alertify from "alertifyjs/build/alertify.min";
import APIConfig from "../utils/config";

class HelperService {
	constructor($http, $rootScope, AuthorizationService, MessageService) {
		"ngInject";
		this.ApiConfig = APIConfig;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.AuthorizationService = AuthorizationService;
		this.id = this.AuthorizationService.user.place;
		this.MessageService = MessageService;
	}

	create(data) {

		let changedData = angular.copy(data);

		// Clear from username all "()-" symbols
		changedData.phone = changedData.phone.replace(/[-()]/g, "");

		return this.$http.post(this.ApiConfig.API_URL + "auth/register_helper/", changedData).then((response) => response, (error) => error);
	}


	updatePersonal(data) {
		return this.$http.patch(this.ApiConfig.API_URL + "doctor/" + data.id + "/", data).then((response) => {
			return response;
		},
		(error) => error);
	}

	updateProcedures(data, id) {
		return this.$http.patch(this.ApiConfig.API_URL + "doctor/" + id + "/", data).then((response) => {
			return response;
		},
		(error) => error);
	}

	updateConsultation(data, id) {
		return this.$http.patch(this.ApiConfig.API_URL + "consultation" + "/" + id + "/", data).then((response) => {
			return response;
		},
		(error) => error
		);
	}

	updateDoctor(id) {
		return this.$http.get(this.ApiConfig.API_URL + "doctor/" + id + "/").then((response) => {
			return response.data;
		});
	}

	createPersonal(data) {
		return this.$http.post(this.ApiConfig.API_URL + "doctor/", data).then((response) => {
			return response;
		}, (error) => error);
	}

	deleteHelper(data) {
		return this.$http.post(this.ApiConfig.API_URL + "auth/delete_helper/", data).then((response) => {
			return response;
		}, (error) => error);
	}

	deleteDoctor(id) {
		return this.$http.delete(this.ApiConfig.API_URL + "doctor/" + id + "/").then((response) => {
			return response;
		}, (error) => error);
	}

	getDoctor(id) {
		return this.$http.get(APIConfig.API_URL + "doctor/" + id + "/").then((response) => {
			return response.data;
		});
	}

	updateHelperList(id) {
		return this.$http.get(this.ApiConfig.API_URL + "auth/" + id + "/").then((response) => {
			return response;
		});
	}

	updateHelper(data){
		return this.$http.post(this.ApiConfig.API_URL + "auth/update_helper/", data).then((response) => {
			return response;
		});
	}


	list(data) {
		return this.$http.post(this.ApiConfig.API_URL + "personal/get_helpers/", data).then((response) => {
			return response.data;
		});
	}

	helper(data) {
		return this.$http.get(this.ApiConfig.API_URL + "helper/" + data.id).then((response) => {
			return response.data;
		});
	}

	saveWorktime(data) {
		return this.$http.post(this.ApiConfig.API_URL + "work_time/", data).then((response) => {
			return response.data;
		});
	}

	deleteWorktime(data) {
		return this.$http.delete(this.ApiConfig.API_URL + "work_time/" + data + "/").then((response) => {
			return response.data;
		});
	}

	deleteWorktimeByList(data) {
		return this.$http.post(this.ApiConfig.API_URL + "work_time/delete_worktimes/", {
			worktimes: data
		}).then((response) => {
			return response.data;
		}, (error) => {
			return error.data;
		});
	}

	saveWorktimeByList(data) {
		return this.$http.post(this.ApiConfig.API_URL + "work_time/create_worktimes/", data).then((response) => {
			return response.data;
		}, (error) => {
			return error.data;
		});
	}

	addProcedurePrice(data) {
		return this.$http.post(this.ApiConfig.API_URL + "doctor_service/", data).then((response) => {
			return response.data;
		}, (error) => {
			return error.data;
		});
	}

	removeProcedure(id) {
		return this.$http.delete(this.ApiConfig.API_URL + "doctor_service/" + id).then((response) => {
			return response.data;
		}, (error) => {
			return error.data;
		});
	}
}


export default HelperService;
