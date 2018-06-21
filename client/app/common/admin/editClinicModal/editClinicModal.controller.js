import alertify from "alertifyjs/build/alertify.min";
import _forEach from "lodash/forEach";
import _find from "lodash/find";

class EditClinicModalController {
	constructor(ClinicService, $rootScope, PreloadService, PlaceService, $timeout) {
		"ngInject";
		this.ClinicService = ClinicService;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.PlaceService = PlaceService;
		this.$timeout = $timeout;

		this.stateDistrict = false;
		this.stateCity = false;

		this.districtChosen = true;

		this.cityList = [];

		this.invalidAddress = false;
		this.invalidDistrict = false;

		this.SELECTED_COORDINATES = this.$rootScope.$on("geocoded:address", (event, data) => this.changeAddress(data));
		this.GEOCODED_COORDINATES = this.$rootScope.$on("geocoded:coordinates", (event, data) => this.changeCoordinates(data));

		// If there is no current district
		if (this.$rootScope.selectedClinic.district === null) {
			this.currentDistrict = {
				id: null,
				name: "Не указан"
			};
		}

		// If we previously had a district
		else {
			this.currentDistrict = {
				id: this.$rootScope.selectedClinic.district.id,
				name: this.$rootScope.selectedClinic.district.name
			};
		}

		// If there is no current city
		if (this.$rootScope.selectedClinic.city === null) {
			this.currentCity = {
				id: null,
				name: "Не указан"
			};
		}

		// If we previously had a city
		else {
			_forEach(this.PreloadService.cities, (city) => {
				if (city.id === this.$rootScope.selectedClinic.city) {
					this.currentCity = {
						name: city.name,
						id: city.id
					};
				}
			});
		}
		this.editClinicButton = false;
	}

	$onInit() {
		// Phone number format validation
		$(document).ready(function () {
			$(".pacient-phone").mask("+A(YYY)-YYY-YY-YY", {
				"translation": {
					A: {pattern: /[7,8]/},
					Y: {pattern: /[0-9]/}
				}
			});
		});

		// Setting data of the clinic that will be edited
		this.cityList = this.PreloadService.cities;
		this.districtList = this.PreloadService.cities.district;
		this.id = this.$rootScope.selectedClinic.id;
		this.address = this.$rootScope.selectedClinic.address;
		this.name = this.$rootScope.selectedClinic.name;
		this.district = this.$rootScope.selectedClinic.district;
		this.city = this.$rootScope.selectedClinic.district.city;
		this.location_x = this.$rootScope.selectedClinic.location_x;
		this.location_y = this.$rootScope.selectedClinic.location_y;
		this.description = this.$rootScope.selectedClinic.description;

		// calling function to set initial (preset) coordinates of clinic
		this.refreshMapLocation();

		this.PlaceService.getPlacePhone({place: this.id}).then((response) => {
			if (response.data.length >= 1) {
				this.phone = response.data[0].number;
				this.phoneId = response.data[0].id;
			}
		});
	}

	// Resets map based on address
	refreshMapLocation() {
		if (this.currentDistrict.id === 0) {
			this.$timeout(() => this.$rootScope.$broadcast("address:typed", `г.${this.currentCity.name}`), 750);
		}
		else {
			this.$timeout(() => this.$rootScope.$broadcast("address:typed", `г.${this.currentCity.name}, ${this.currentDistrict.name}, ${this.address}`), 750);
		}
	}

	// toggles "city" dropdown
	toggleCityDropdown() {
		this.stateCity = !this.stateCity;
		this.stateDistrict = false;
	}


	// Select city from the list and set district dropdown for this city
	selectCity(city) {
		this.invalidCity = false;
		this.$timeout(() => this.stateCity = false, 0);
		this.currentCity = city;
		this.currentDistrict.id = 0;
		this.address = null;
		this.districtList = this.PreloadService.cities[this.currentCity.id - 1].district;
		this.districtChosen = false;
		this.refreshMapLocation();
	}

	// toggles "district" dropdown
	toggleDistrictDropdown() {
		this.stateDistrict = !this.stateDistrict;
		this.stateCity = false;
		this.districtList = this.PreloadService.cities[this.currentCity.id - 1].district;
	}

	// CurrentDistrict equals to district from List
	selectDistrict(district) {
		this.$timeout(() => this.stateDistrict = false, 0);
		this.currentDistrict = district;
		this.refreshMapLocation();
		this.districtChosen = true;
	}

	// Change address text when clicked on yandex map
	changeAddress(data) {
		// Assigning latitude and longitude
		this.address = data.address;
		this.location_x = parseFloat(data.coordinates[0]);
		this.location_y = parseFloat(data.coordinates[1]);
	}

	// Returns coordinates from map when we typed address in input
	changeCoordinates(data) {
		this.location_x = parseFloat(data[0]);
		this.location_y = parseFloat(data[1]);
	}

	editAddress(address) {
		this.address = address;
		this.refreshMapLocation();
	}

	editName(name) {
		this.name = name;
	}

	editPhone(phone) {
		this.phone = phone;
	}

	editDescription(description) {
		this.description = description;
	}

	cancelModal() {
		this.$rootScope.$broadcast("modal:cancel");
	}

	// Accepts changes, saves and closes the modal window
	saveChanges() {
		if (this.currentCity.id === 0 || this.currentDistrict.id === 0 || this.address === undefined || this.address === null || this.name === undefined || this.name === null || this.name.length ===0 || this.description.length === 0|| this.phone === undefined || this.phone.length !== 17) {
			this.invalidCity = this.currentCity.id === 0;
			this.invalidDistrict = this.currentDistrict.id === 0;
			this.invalidAddress = this.address === undefined || this.address === null;
			this.invalidClinicsName = this.name === undefined || this.name === null || this.name.length ===0;

			this.invalidDescription = this.description.length === 0;
			this.invalidNumber = this.phone === undefined || this.phone !== 17;
			return false;
		}

		let editClinic = alertify.notify("Сохранение...", "custom", 20);

		let data = {
			address: this.address,
			name: this.name,
			district: this.currentDistrict.id,
			city: this.currentDistrict.city,
			location_x: this.location_x,
			location_y: this.location_y,
			description: this.description,
		};

		// Updates changes
		this.ClinicService.updateClinic(this.id, data).then((response) => {

			if (this.phoneId === undefined) {
				this.PlaceService.addPlacePhone({
					place: response.data.id,
					number: this.phone
				}).then((response) => {
					editClinic.delay(5).setContent("Данные успешно сохранены!");
					this.cancelModal();
				});
			}
			else {

				this.PlaceService.updatePlacePhone(this.phoneId, {number: this.phone}).then((phoneRes) => {
					_forEach(this.PreloadService.clinicsList, (clinic) => {
						if (clinic.id === response.data.id) {
							clinic.address = response.data.address;
							clinic.name = response.data.name;
							clinic.description = response.data.description;

							// Compare two districts IDs and replace it
							clinic.city = _find(this.cityList, {id: response.data.city});
							clinic.district = _find(clinic.city.district, {id: response.data.district});
							clinic.city = _find(this.cityList, {id: response.data.city}).id;
						}
					});
					editClinic.delay(5).setContent("Данные успешно сохранены!");
					this.cancelModal();
				});
			}

		});
	}
}

export default EditClinicModalController;
