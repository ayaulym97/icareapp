/**
 * Created by amirkaaa on 6/28/17.
 */
import APIConfig from "../utils/config";
import find from "lodash/find";
import _filter from "lodash/filter";
// import _forEach from "lodash/forEach";
import moment from "moment";

class PreloaderService {
	constructor($http, $q, AuthorizationService, $timeout, $rootScope) {
		"ngInject";
		this.$http = $http;
		this.$q = $q;
		this.AuthorizationService = AuthorizationService;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.loadedCalendarDates = [];
		// this.findedDatePromise = this.$q.defer();


		this.calendarDate = null;

		this.globalProceduresPromise = null;
		this.globalProcedures = null;

		this.clinicProceduresPromise = null;
		this.clinicProcedures = null;
		this.absentClinicProcedures = null;

		this.globalMedtestsPromise = null;
		this.globalMedtests = null;

		this.clinicMedtestsPromise = null;
		this.clinicMedtests = null;
		this.absentClinicMedtests = null;

		this.citiesPromise = null;
		this.cities = null;

		this.specialitiesPromise = null;
		this.specialities = null;

		this.clinicsListPromise = null;
		this.clinicsList = null;

		this.clinicDoctorListPromise = null;
		this.clinicDoctorList = null;

		this.clinicStuffListPromise = null;
		this.clinicStuffList = null;

		this.helperDoctorListPromise = null;
		this.helperDoctorList = null;

		this.helperStuffListPromise = null;
		this.helperStuffList = null;

		this.globalCategoryPromise = null;
		this.categories = null;


		// this.doctorSpecialities = null;
		// this.stuffSpecialities = null;


		this.helperChatPromise = null;
		this.helperChat = null;

		this.clinicsHelperListPromise = null;
		this.clinicsHelperList = null;


	}

	preloadAdmin() {
		return this.$q.all([
			this.getCities(),
			this.getClinicsList(this.AuthorizationService.user.id)
		]).then((data) => {
		});
	}

	preloadSuperHelper() {
		return this.$q.all([
			this.getGlobalProcedures(),
			this.getGlobalMedtests(),
			this.getClinicProcedures(this.AuthorizationService.user.place),
			this.getClinicMedtests(this.AuthorizationService.user.place),

			this.getClinicDoctorList({
				place: this.AuthorizationService.user.place
			}),
			this.getClinicsHelperList(this.AuthorizationService.user.place),
			this.getHelperDoctorList({
				place: this.AuthorizationService.user.place,
				helper: this.AuthorizationService.user.id,
			}),
			this.getClinicStuffList({
				place: this.AuthorizationService.user.place,
			}),
			this.getSpecialities(),
			this.getCategory(),
			// this.getHelperChat(),
			this.getCalendarDate(moment().format("YYYY-MM-DD")),
			this.getHelperStuffList({
				place: this.AuthorizationService.user.place,
				helper: this.AuthorizationService.user.id,
			}),
			this.$rootScope.lastSelectedHelper = null
		]).then((data) => {
		});
	}

	preloadHelper() {
		return this.$q.all([
			this.getClinicProcedures(this.AuthorizationService.user.place),
			this.getClinicMedtests(this.AuthorizationService.user.place),
			this.getSpecialities(),
			this.getClinicDoctorList({
				place: this.AuthorizationService.user.place
			}),
			this.getHelperDoctorList({
				place: this.AuthorizationService.user.place,
				helper: this.AuthorizationService.user.id
			}),
			// this.getHelperChat(),
			this.getCalendarDate(moment().format("YYYY-MM-DD")),
			this.getClinicStuffList({
				place: this.AuthorizationService.user.place
			}),
			this.getCategory(),

			this.getHelperStuffList({
				place: this.AuthorizationService.user.place,
				helper: this.AuthorizationService.user.id
			}),

		]).then((data) => {
		});
	}

	getGlobalProcedures() {
		if (this.globalProceduresPromise === null) {
			this.globalProceduresPromise = this.$http.get(APIConfig.API_URL + "list_service/?type=0&all=1").then((response) => {
				this.globalProcedures = response.data;
				this.absentClinicProcedures = response.data;
				return response.data;
			});
		}
		return this.globalProceduresPromise;
	}

	getClinicProcedures(place) {
		if (this.clinicProceduresPromise === null) {
			this.clinicProceduresPromise = this.$http.get(APIConfig.API_URL + "place_service/?place=" + place + "&type=0").then((response) => {
				this.clinicProcedures = response.data;
				return response.data;
			});
		}
		return this.clinicProceduresPromise;
	}


	getCategory() {
		if (this.globalCategoryPromise === null) {
			this.globalCategoryPromise = this.$http.get(APIConfig.API_URL + "category_list/").then((response) => {
				this.categories = response.data;
				return response.data;
			});
		}
		return this.globalCategoryPromise;
	}

	getGlobalMedtests() {
		if (this.globalMedtestsPromise === null) {
			this.globalMedtestsPromise = this.$http.get(APIConfig.API_URL + "list_service/?type=1&all=1").then((response) => {
				this.globalMedtests = response.data;
				this.absentClinicMedtests = response.data;
				return response.data;
			});
		}
		return this.globalMedtestsPromise;
	}

	getClinicMedtests(place) {
		if (this.clinicMedtestsPromise === null) {
			this.clinicMedtestsPromise = this.$http.get(APIConfig.API_URL + "place_service/?place=" + place + "&type=1").then((response) => {
				this.clinicMedtests = response.data;
				return response.data;
			});
		}
		return this.clinicMedtestsPromise;
	}

	getCities() {
		if (this.citiesPromise === null) {
			this.citiesPromise = this.$http.get(APIConfig.API_URL + "cities/").then((response) => {
				this.cities = response.data;
				return response.data;
			});
		}
		return this.citiesPromise;
	}

	getSpecialities() {
		if (this.specialitiesPromise === null) {
			this.specialitiesPromise = this.$http.get(APIConfig.API_URL + "list_speciality/").then((response) => {
				this.specialities = response.data;
				// this.doctorSpecialities = _filter(this.specialities,(spec) => spec.type == 0 );
				// this.stuffSpecialities = _filter(this.specialities,(spec) => spec.type == 1 );
				return response.data;
			});
		}
		return this.specialitiesPromise;
	}

	getClinicsList(id) {
		if (this.clinicsListPromise === null) {
			this.clinicsListPromise = this.$http.get(APIConfig.API_URL + "place/", {params: {admin: id}}).then((response) => {
				this.clinicsList = response.data;
				return response.data;
			});
		}
		return this.clinicsListPromise;
	}

	getClinicDoctorList(data) {
		if (this.clinicDoctorListPromise === null) {
			this.clinicDoctorListPromise = this.$http.post(APIConfig.API_URL + "personal/get_doctors/", data, {params: {type: 0}}).then((response) => {
				this.clinicDoctorList = response.data;
				return response.data;
			});
		}
		return this.clinicDoctorListPromise;
	}

	getClinicStuffList(data) {
		if (this.clinicStuffListPromise === null) {
			this.clinicStuffListPromise = this.$http.post(APIConfig.API_URL + "personal/get_doctors/", data, {params: {type: 2}}).then((response) => {
				this.clinicStuffList = response.data;
				return response.data;
			});
		}
		return this.clinicStuffListPromise;
	}

	getHelperDoctorList(data) {
		if (this.helperDoctorListPromise === null) {
			this.helperDoctorListPromise = this.$http.post(APIConfig.API_URL + "personal/get_doctors/", data, {params: {type: 0}}).then((response) => {
				this.helperDoctorList = response.data;
				return response.data;
			});
		}
		return this.helperDoctorListPromise;
	}

	getHelperStuffList(data) {
		if (this.helperStuffListPromise === null) {
			this.helperStuffListPromise = this.$http.post(APIConfig.API_URL + "personal/get_doctors/", data, {params: {type: 2}}).then((response) => {
				this.helperStuffList = response.data;
				return response.data;
			});
		}
		return this.helperStuffListPromise;
	}

	getHelperChat() {
		if (this.helperChatPromise === null) {
			this.helperChatPromise = this.$http.get(APIConfig.API_URL + "chat/").then((response) => {
				this.helperChat = response.data;
				return response.data;
			});
		}
		return this.helperChatPromise;
	}

	getClinicsHelperList(id) {
		if (this.clinicsHelperListPromise === null) {
			this.clinicsHelperListPromise = this.$http.post(APIConfig.API_URL + "personal/get_helpers/", {place: id}).then((response) => {
				this.clinicsHelperList = response.data;
				return response.data;
			});
			return this.clinicsHelperListPromise;
		}
	}

	getCalendarDate(date) {
		return this.$http.post(APIConfig.API_URL + "calendar/get_full/", {date: date}).then((response) => {
			let findedDate = find(this.loadedCalendarDates, (item) => item.date === date);
			if (typeof findedDate === "undefined") {
				this.loadedCalendarDates.push({
					date: date,
					data: response.data
				});
			}
			return response.data;
		});
	}

	// else {
	//   this.findedDatePromise.resolve(findedDate.data);
	//   return this.findedDatePromise.promise;
	// }

}

export default PreloaderService;

// TODO: Для предварительной подгрузки аватаров пользователей.

// var images = new Array()
// function preload() {
//   for (i = 0; i < preload.arguments.length; i++) {
//     images[i] = new Image()
//     images[i].src = preload.arguments[i]
//   }
// }
// preload(
//   "http://domain.tld/gallery/image-001.jpg",
//   "http://domain.tld/gallery/image-002.jpg",
//   "http://domain.tld/gallery/image-003.jpg"
// )
