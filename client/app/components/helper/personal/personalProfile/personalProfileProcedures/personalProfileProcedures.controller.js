// import _reject from "lodash/reject";
import alertify from "alertifyjs/build/alertify";
import _find from "lodash/find";
import _remove from "lodash/remove";
import _uniq from "lodash/uniq";
import c from "lodash/uniq";
// import _map from "lodash/map";
import _forEach from "lodash/forEach";


class PersonalProfileProceduresController {
	constructor($scope, PreloadService, HelperService, $rootScope, $timeout, $stateParams) {
		"ngInject";
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.HelperService = HelperService;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;

		this.clickProcedure = null;

		this.savedPrices = [];
		this.newDoctorProcedures = [];
		this.doctorOwnList = [];

		this.addedProcedure = new Set();


		// Finds the doctor's full information from the clinicDostorList by ID from stateParams.
		this.doctor = _find(this.PreloadService.clinicDoctorList, {id: parseInt(this.$stateParams.id)});
		// this.$rootScope.$on('profile:id', (event,data) => this.setDoctor(data))

		// If doctor has their own ID, then we will
		// Set use finally assign the information by function "setDoctor"
		if (this.doctor.hasOwnProperty("id")) {
			this.$timeout(() => {
				this.setDoctor(this.doctor);
			}, 100);
		}

	}

	$onInit() {
		this.proceduresClone = angular.copy(this.PreloadService.clinicProcedures);
	}

	// go back to profile
	backToProfile() {
		this.$scope.$emit("back");
	}


	consultationAllow() {
		if (this.profileData.allowed_type.includes(0)) {
			_remove(this.profileData.allowed_type, (obj) => obj === 0);
		}
		else {
			this.profileData.allowed_type.push(0);
		}

	}

	// 1. Set all the information from doctor.
	// 2. Push all the information that is services to a list doctorService
	// 3. Push all the information that is procedures to a list newDoctorProcedures
	// 4. Push all the consultation to the list Consultation
	// 5. Push all the prices to the list doctorOwnList
	setDoctor(data) {
		this.profile = data;
		this.doctorService = [];
		this.consultation = [];
		_forEach(this.profile.service, (service) => {
			if (service.type === 1) {
				this.doctorService.push(service.id);
			}
			if (service.type === 0) {
				this.newDoctorProcedures.push(service.id);
			}
		});

		_find(this.profile.consultation, (item) => {
			if (item.consultation.type === 0) {
				this.consultation.push(item);
			}
		});

		if (this.profile.allowed_type.includes(3)) {
			_find(this.profile.consultation, (item) => {
				if (item.consultation.type === 3) {
					this.consultation.push(item);
				}
			});
		}

		this.profile.service.forEach((item) => {
			if (item.hasOwnProperty("doctor_price")) {
				this.doctorOwnList.push(item.id);
			}
		});
	}

	addToDoctorProcedure(procedure) {
		let price = _find(this.PreloadService.clinicProcedures, (item) => item.service.id === procedure.service.id);
		if (this.newDoctorProcedures.includes(procedure.service.id)) {
			_remove(this.newDoctorProcedures, (obj) => obj === procedure.service.id);
			// _remove(this.profile.service ,(item) => item.id === procedure.service.id);
			_find(this.profile.service, (item) => {
				if (item.id === procedure.service.id) {
					item.doctor_price = price.price;
					this.savedPrices.push({
						service: item.id,
						price: price.price
					});
				}
			});
		}
		else {
			this.newDoctorProcedures.push(price.service.id);
		}
	}

	// Pushes all the new and old procedures(money) to a list doctorService, then
	// make the request to a back-end to save all of these information
	saveProcedures() {
		let saveAlert = alertify.notify("Сохранение...", "success", 5);

		_forEach(this.newDoctorProcedures, (procedures) => {
			this.doctorService.push(procedures);
		});
		_forEach(this.consultation, (item) => {
			let price = {
				price: item.price
			};
			this.HelperService.updateConsultation(price, item.id).then((response) => {
				this.profile.consultation = response.data.consultation;

			});
		});

		let data = {
			helper: this.profileData.helper.id ,
			service: this.doctorService,
			place: this.profileData.place.id

		};

		this.savedPrices.forEach((item) => {
			this.HelperService.addProcedurePrice({
				service: item.service,
				price: item.price,
				doctor: this.profile.id
			});
		});

		let profile = {
			helper: this.profileData.helper.id ,
			allowed_type: this.profileData.allowed_type,
			id: this.profileData.id,
			place: this.profileData.place.id

		};

		this.addedProcedure = new Set();

		this.HelperService.updateProcedures(data, this.profile.id).then((response) => {
			let saveAlert = alertify.notify("Данные сохранены", "success", 20);
			this.profile.service = response.data.service;
			this.HelperService.updatePersonal(profile).then(() => {
				this.backToProfile();
			});
		});

		//
	}

	findProcedure(procedure) {
		let serv = _find(this.profile.service, (item) => {
			return item.id === procedure.service.id;
		});

		if (typeof serv === "undefined") {
			return {
				price: procedure.price,
				doctor: false,
				place_off: true
			};
		}
		else {
			if (serv.hasOwnProperty("doctor_price")) {
				return {
					price: serv.doctor_price,
					doctor: true,
					service: serv
				};
			}
			if (serv.hasOwnProperty("place_price")) {
				return {
					price: serv.place_price,
					doctor: false
				};
			}
		}
	}

	// Open input and set autofocus
	changeClickable(procedure) {
		this.$timeout(() => {
			document.getElementsByClassName("medtest" + procedure.id)[0].focus();
		}, 10);
		this.clickProcedure = procedure.id;
	}

	//Cancel the function of changing the price
	cancelPrice() {
		this.clickProcedure = null;
	}

	addProcedure(procedure) {
		if (procedure.price === null) {
			this.cancelPrice();
			return false;
		} else {
			let serv = _find(this.profile.service, (item) => {
				return item.id === procedure.service.id;
			});
			if (typeof serv !== "undefined") {
				let save_price = _find(this.savedPrices, ((price) => {
					return price.service === serv.id;
				}));
				if (typeof save_price === "undefined") {
					this.savedPrices.push({
						service: serv.id,
						price: procedure.price
					});
				} else {
					save_price.price = procedure.price;
				}
				if (serv.hasOwnProperty("doctor_price")) {
					this.$timeout(() => {
						serv.doctor_price = procedure.price;
						this.addedProcedure.add(serv.id);
						this.cancelPrice();
					});
					return false;
				}
				if (serv.hasOwnProperty("place_price")) {
					this.$timeout(() => {
						this.addedProcedure.add(serv.id);
						serv["doctor_price"] = procedure.price;
						this.cancelPrice();
					});
					return false;
				}
			}
		}
	}

	removeProcedure(procedure) {
		let serv = _find(this.profile.service, (item) => {
			return item.id === procedure.service.id;
		});
		if (typeof serv !== "undefined") {
			if (!serv.hasOwnProperty("doctor_price_id")) {
				return;
			}
			this.$timeout(() => {
				delete serv["doctor_price"];
				delete serv["doctor_price_id"];
				serv["place_price"] = procedure.price;
			}, 100);
			this.HelperService.removeProcedure(serv.doctor_price_id).then((response) => {
				if (response.status === 204) {
				}
			});
		}

	}
}

export default PersonalProfileProceduresController;
