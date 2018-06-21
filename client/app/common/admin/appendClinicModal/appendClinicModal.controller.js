import alertify from "alertifyjs/build/alertify.min";
import _forEach from "lodash/forEach";
import _map from"lodash/map";


class AppendClinicModalController {
	constructor(PreloadService, AuthorizationService, ClinicService, PlaceService, $scope, $timeout, $rootScope) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.ClinicService = ClinicService;
		this.PlaceService = PlaceService;
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;

		// Here will be the data of cities
		this.citiesList = [];

		// Do not allow to open both dropdowns
		this.stateDistrict = false;
		this.stateCity = false;

		this.currentDistrict = {
			id: 0,
			name: "Выберите район"
		};
		this.currentCity = {
			id: 0,
			name: "Выберите город"
		};

		// The name of current clinic
		this.clinicName = null;

		// The limit of helper counters
		this.helperCount = 1;
		this.minHelperCount = 1;
		this.maxHelperCount = 5;

		// ng-disabled variable, when button is submitted
		this.acceptClinic = false;

		this.data = {
			// If status of request is 0, we are creating online requests
			status: 0,
		};


		this.SELECTED_COORDINATES = this.$rootScope.$on("geocoded:address", (event, data) => this.changeAddress(data));
		this.GEOCODED_COORDINATES = this.$rootScope.$on("geocoded:coordinates", (event, data) => this.changeCoordinates(data));
	}

	$onInit() {
	  // Phone number format validation
		$(document).ready(function() {
			$(".pacient-phone").mask("+A(YYY)-YYY-YY-YY", {"translation": {
				A: {pattern: /[7,8]/},
				Y: {pattern: /[0-9]/}
			}
			});
		});

		// Generating cities list
		_forEach(this.PreloadService.cities, (city) => {
	    this.citiesList.push(city);
		});
	}

	$onDestroy() {
		this.SELECTED_COORDINATES();
		this.GEOCODED_COORDINATES();
	}

	// Resets map based on address
	refreshMapLocation() {
		if(this.currentDistrict.id === 0) {
			this.$timeout(() => this.$rootScope.$broadcast("address:typed", `г.${this.currentCity.name}`), 750);
		}
		else {
			this.$timeout(() => this.$rootScope.$broadcast("address:typed", `г.${this.currentCity.name}, ${this.currentDistrict.name}, ${this.selectedAddress}`), 750);
		}
	}

	// Opens dropdown for cities and closes dropdown for districts
	showCity() {
		this.stateCity = !this.stateCity;
		this.stateDistrict = false;
	}

	// Opens dropdown for districts and closes dropdown for cities
	showDistrict() {
		this.stateDistrict = !this.stateDistrict;
		this.stateCity = false;
	}

	// Selects city from dropdown
	selectCity(city) {
		this.data.city = city.id;
		this.data.districts = _map(city.district, (district) => district.id);
		this.currentCity = city;
		this.districtList = this.PreloadService.cities[this.currentCity.id-1].district;
		this.refreshMapLocation();
	}

	// Selects district from district dropdown
	selectDistrict(district) {
		this.$timeout(() => this.stateDistrict = false);
		this.currentDistrict = district;
		this.refreshMapLocation();
	}

	// Changes address text when clicked on yandex map
	changeAddress(data) {
		// Assigning latitude and longitude
		this.selectedAddress = data.address;
		this.data.location_x = parseFloat(data.coordinates[0]);
		this.data.location_y = parseFloat(data.coordinates[1]);
	}

	// Changes location on map when we typed address in input
	changeCoordinates(data) {
		this.data.location_x = parseFloat(data[0]);
		this.data.location_y = parseFloat(data[1]);
	}

	// Closes the modal
	cancel() {
		this.$rootScope.$broadcast("modal:cancel");
	}

	// Saves and creates clinic
	submit() {
		this.acceptClinic = true;

		// Checking whether all inputs are filled
		if(this.currentCity.id === 0 || this.currentDistrict.id === 0 || this.selectedAddress === undefined || this.clinicName === undefined || this.clinicName === null || this.clinicName.length ===0 || this.clinicDescription === undefined || this.clinicDescription.length === 0 || this.phone === undefined || this.phone.length !== 17) {
			this.invalidCity = this.currentCity.id === 0;
			this.invalidDistrict = this.currentDistrict.id === 0;
			this.invalidAddress = this.selectedAddress === undefined;
			this.invalidClinicName = this.clinicName === undefined || this.clinicName === null || this.clinicName.length === 0;
			this.invalidDescription = this.clinicDescription === undefined || this.clinicDescription.length === 0;
			this.invalidNumber = this.phone === undefined || this.phone.length !==17;
			this.acceptClinic = false;
			return false;
		}

		// Data which will be sent to server
		let data = {
			address: this.selectedAddress,
			name: this.clinicName,
			city: this.currentCity.id,
			district: this.currentDistrict.id,
			location_x: this.data.location_x,
			location_y: this.data.location_y,
			description: this.clinicDescription,
			phone: this.phone,
			type: 0,
		};

		let helperList = [];

		let saveAlert = alertify.notify("Добавление клиники...", "custom", 20);

		// Sending data to server and creating clinic
		this.ClinicService.createClinic(data).then((response) => {
			saveAlert.delay(5).setContent("Клиника добавлена");
			console.log("[Admin] Clinic added");

			this.PlaceService.addPlacePhone({place: response.id, number: this.phone}).then((phoneRes) => {

				this.PreloadService.clinicsList.push(response);
				this.$rootScope.selectedClinic = response;
				if (this.helperCount >= 2) {
					for (let i = 0; i < this.helperCount; i++) {
						helperList.push({
							place: response.id,
							username: this.AuthorizationService.user.username + "-" + response.id + "-" + (i + 1),
							password: this.AuthorizationService.user.username + (i + 1),
							email: null,
							phone: null,
							type: 1
						});
					}
					helperList[0].type = 2;
				}
				else {
					helperList.push({
						place: response.id,
						username: this.AuthorizationService.user.username + "-" + response.id + "-" + 1,
						password: this.AuthorizationService.user.username + 1,
						email: null,
						phone: null,
						type: 2
					});
				}

				this.$timeout(() => this.$rootScope.$broadcast("modal:state", "appendHelper"), 0);
				this.$timeout(() => this.$rootScope.$broadcast("helper:append", {data: helperList, from: "appendClinic"}), 0);

			});

		}, () => {
			this.acceptClinic = false;
			this.cancel();
			saveAlert.dismiss();
			alertify.error("Ошибка!");
		});
	}
}

export default AppendClinicModalController;
