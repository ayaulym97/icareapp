class MedbookMapController {
	constructor($rootScope, $timeout) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;

		this.myMap = null;
		this.myPlacemark = null;

		this.ADDRESS_TYPED = this.$rootScope.$on("address:typed", (event, address) => this.geocodeNewAddress(address));
	}

	$onDestroy() {
		this.ADDRESS_TYPED();
	}


	// Get geolocation via browser and yandex api if browser will fail
	$onInit() {

		ymaps.ready(() => {

			// Get location through browser native geolocation
			ymaps.geolocation.get({
				provider: "browser",
				mapStateAutoApply: true
			}).then((result) => {
				this.initMap(result.geoObjects.position);
			}, (error) => {
				console.warn(error);

				// If something wrong run yandex provided geolocation api
				ymaps.geolocation.get({
					provider: "yandex",
					mapStateAutoApply: true
				}).then((result) => {
					this.initMap(result.geoObjects.position);
				});

			});
		});
	}

	// Init map with given position
	initMap(position) {
		this.myMap = new ymaps.Map("map", {
			center: position,
			zoom: 17
		}, {suppressMapOpenBlock: true});

		this.myPlacemark = new ymaps.Placemark(position);

		this.myMap.controls.remove("geolocationControl");
		this.myMap.controls.remove("searchControl");
		this.myMap.controls.remove("trafficControl");
		this.myMap.controls.remove("typeSelector");
		this.myMap.controls.remove("fullscreenControl");
		this.myMap.controls.remove("rulerControl");

		this.myMap.geoObjects.add(this.myPlacemark);

		this.myMap.events.add("click", (e) => {
			// Get clicked coordinates
			let coords = e.get("coords");

			// Set placemarket from coord
			this.setPlacemark(coords);

			// Get address by coordinates
			this.geocodeCoordinates(coords);
		});
	}

	// Set placemark with given coordinates
	setPlacemark(coordinates) {
		this.myPlacemark.geometry.setCoordinates(coordinates);
	}

	// Geocode coordinates when clicked on the map and return address to input
	geocodeCoordinates(coordinates) {

		ymaps.geocode(coordinates, {result: 1}).then((result) => {

			// Get first result
			let nearest = result.geoObjects.get(0);

			// Get city from nearest result
			let city = nearest.getLocalities()[0];

			// Get address from nearest result
			let address = nearest.properties.get("name");

			// Prepare data for broadcast
			let data = {
				city: city,
				address: address,
				coordinates: coordinates
			};

			// Transfer address to input
			this.$timeout(() => this.$rootScope.$broadcast("geocoded:address", data));
		});

	}

	// Geocode address when typed on input and return coordinated to map
	geocodeNewAddress(address) {

		ymaps.geocode(address, {results: 1}).then((result) => {

			// Get first result
			let coordinates = result.geoObjects.get(0).geometry.getCoordinates();

			// Transfer map view to geocoded coordinates
			this.myMap.panTo(coordinates, {flying: true});

			// Set placemark from geocoded coordinates
			this.setPlacemark(coordinates);

			this.$timeout(() => this.$rootScope.$broadcast("geocoded:coordinates", coordinates));
		});

	}
}

export default MedbookMapController;
