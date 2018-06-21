/**
 * Created by amirkaaa on 5/11/17.
 */
import APIConfig from "../utils/config";

class ClinicService {
	constructor($http, $q, AuthorizationService) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.ApiConfig = APIConfig;
		this.$http = $http;
		this.$q = $q;
	}

	createClinic(data) {
		return this.$http.post(this.ApiConfig.API_URL + "place/", data).then((response) => response.data);
	}

	list() {
		return this.$http.get(this.ApiConfig.API_URL + "place/", {params: {admin: this.AuthorizationService.user.id}}).then((response) => {
			return response.data;
		});
	}

	updateClinic(id, data) {
		return this.$http.patch(this.ApiConfig.API_URL + "place/" + id + "/", data).then((response) => {
			return response;
		});
	}

	deleteClinic(id) {
		return this.$http.delete(this.ApiConfig.API_URL + "place/" + id + "/").then((response) => response);
	}
}

export default ClinicService;
