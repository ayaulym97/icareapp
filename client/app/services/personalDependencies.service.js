/**
 * Created by amirkaaa on 7/14/17.
 */

import APIConfig from "../utils/config";

class PersonalDependenciesService {
	constructor($http) {
		"ngInject";
		this.$http = $http;
	}

	// Specify id in url and required fields ['description']
	updateQualification(data) {
		return this.$http.patch(APIConfig.API_URL + "qualification/" + data.id + "/", {description: data.description}).then((response) => response, (error) => error);
	}

	// required fields ['doctor', 'description']
	createQualification(data) {
		return this.$http.post(APIConfig.API_URL + "qualification/", data).then((response) => response, (error) => error);
	}

	// Specify id in url
	deleteQualification(data) {
		return this.$http.delete(APIConfig.API_URL + "qualification/" + data.id + "/").then((response) => response, (error) => error);
	}

	// Specify id in url and required fields ['description']
	updateEducation(data) {
		return this.$http.patch(APIConfig.API_URL + "education/" + data.id + "/", {description: data.description}).then((response) => response, (error) => error);
	}

	// required fields ['doctor', 'description']
	createEducation(data) {
		return this.$http.post(APIConfig.API_URL + "education/", data).then((response) => response, (error) => error);
	}

	// Specify id in url
	deleteEducation(data) {
		return this.$http.delete(APIConfig.API_URL + "education/" + data.id + "/").then((response) => response, (error) => error);
	}

}

export default PersonalDependenciesService;
