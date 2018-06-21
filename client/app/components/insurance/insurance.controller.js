import _find from "lodash/find";

class InsuranceController {
	constructor($scope, PreloadService, $timeout) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.$scope = $scope;
		this.$timeout = $timeout;

		this.placeList = [];
		this.placeText = "";
		this.addressText = "";
		this.modal = null;
		this.selectedCity = null;
		this.cities = [];
		this.preloader = true;
		this.selectedClinic = null;
		this.MODAL_CANCEL = this.$scope.$on("modal:cancel", (event) => this.cancel());
		this.globalTimeout = this.$timeout();
	}

	$onInit(){
		//Setting the list to the dropdown
		this.PreloadService.getCities().then((response)=>{
			this.cities = response;
			this.selectedCity = this.cities[0];
		});
		ymaps.ready(() => {
			// Get location via yandex api IP detecting
			ymaps.geolocation.get({
				provider: "yandex",
				mapStateAutoApply: true
			}).then((result) => {
				this.getAddress(result.geoObjects.position);
			}, (error) => {
				console.warn(error);
			});
		});
	}

	getAddress(coordinates){
		ymaps.geocode(coordinates, {result: 1}).then((result) => {

			// Get first result
			let nearest = result.geoObjects.get(0);

			// Get city from nearest result
			let city = nearest.getLocalities()[0];

			// Get address from nearest result
			let address = nearest.properties.get("name");
			let currentCity = _find(this.cities, (item)=>{
				return item.name === city;
			});
			if(typeof currentCity !== "undefined"){
				this.selectedCity = currentCity;
			}
			this.addressText = address;
			this.findPlace();
		});
	}

	findPlace(){
		let data = {
			city: this.selectedCity.id,
			all_places: false,
			page: 1,
			page_size: 30
		};
		if(this.addressText.trim().length !== 0){
			data["address"] = this.addressText;
		}
		if(this.placeText.trim().length !== 0){
			data["name"] = this.placeText;
		}
		this.$timeout.cancel(this.globalTimeout);
		this.globalTimeout = this.$timeout(()=>{
			this.preloader = true;
			let serv = this.PreloadService.getClinicByName(data);
			serv.then((response)=>{
				this.placeList = response.data;
				this.preloader = false;
			});
		}, 500);
	}

	// open clinic by clicking the header content
	changeModalClinic(data){
		this.selectedClinic = data;
		this.modal = "clinic";
	}

	changeModalConnect(data){
		this.modal = "auth";
	}

	// select city by dropdown
	selectCity(city){
		if(this.selectedCity.id !== city.id){
			this.selectedCity = city;
			this.findPlace();
		}
	}

	cancel(){
		this.modal = null;
	}
}

export default InsuranceController;
