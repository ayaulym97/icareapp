/**
 * Created by askhat on 12.05.17.
 */
import APIConfig from "../utils/config";
import _forEach from "lodash/forEach";

class PlaceService {
	constructor($http, $rootScope, AuthorizationService, $q) {
		"ngInject";

		this.$rootScope = $rootScope;
		this.AuthorizationService = AuthorizationService;
		this.$http = $http;
		this.$q = $q;

		this.addServicePromise = null;

		this._lastPlace = null;

	}


	addComplexService(servicesArray) {
		let ComplexPromiseArray = [];
		// Собираем в массив ComplexPromiseArray запросы на сервер в одном месте.
		_forEach(servicesArray, (service) => {
			ComplexPromiseArray.push(this.addService({
				place: this.AuthorizationService.user.place,
				price: null,
				service: service.id
			}));
		});

		//Запускаем все запросы на сервер одновременно и получаем response когда все запросы придут успешно, если один запрос вернется с ошибкой. то все запросы будут как fail.
		return this.$q.all(ComplexPromiseArray).then((response) => {
			return response;
		});
	}

	getPlacePhone(data) {
		return this.$http.get(APIConfig.API_URL + "place_phone/?place=" + data.place).then(response => response);
	}

	addPlacePhone(data) {
		return this.$http.post(APIConfig.API_URL + "place_phone/", data).then(response => response);
	}

	updatePlacePhone(id, data) {
		return this.$http.patch(APIConfig.API_URL + "place_phone/" + id + "/", data).then(response => response);
	}

	addService(data) {
		this.addServicePromise = this.$http.post(APIConfig.API_URL + "place_service/", data).then(response => response.data);

		return this.addServicePromise;
	}

	removeService(data) {
		return this.$http.delete(APIConfig.API_URL + "place_service/" + data.id + "/").then(response => response.data);
	}

	changeService(data) {
		return this.$http.patch(APIConfig.API_URL + "place_service/" + data.id + "/", {
			price: data.price
		}).then(response => response.data);
	}

	getService(data) {
		return this.$http.get(APIConfig.API_URL + "place_service/" + data.id).then(response => response.data);
	}

}

export default PlaceService;
