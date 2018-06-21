import alertify from "alertifyjs/build/alertify";
import _remove from "lodash/remove";
import _map from "lodash/map";
import Fuse from "fuse.js/dist/fuse";

class PersonalMedtestsController {
	constructor(AuthorizationService, PreloadService, PlaceService, $stateParams, $rootScope, $timeout, $q) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.$q = $q;
		this.PreloadService = PreloadService;
		this.$rootScope = $rootScope;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.PlaceService = PlaceService;
		this.medtestsStatus = null;
		this.autofocus = null;
		this.itemChange = null;
		this.oldPrice = 0;


		// For disabling when button clicked request
		this.saveButtonState = false;


		this.$rootScope.$on("Preload.Completed", () => this.preloadInit());

		this.selectedMedtests = [];

		// For not duplicating DOM element
		let anchor = $("#scrollToTop");

		$(document).ready(function() {
			$(".personal-medtests").scroll(function () {
				$(this).scrollTop() > 500 ? anchor.fadeIn() : anchor.fadeOut();
			});

			//Click event, scroll to top
			$("#scrollToTop").click(function () {
				$(".personal-medtests").animate({scrollTop: 0}, 1000);
			});
		});

		this.medtestsState = "normal";
	}

	$onInit() {
		if (this.$rootScope.loading !== true && typeof this.$rootScope.loading !== "undefined") {
			this.filterAbsentClinicMedtests();
			this.matchedMedtests = this.PreloadService.clinicMedtests;
			this.matchedAbsentMedtest = this.PreloadService.absentClinicMedtests.slice(0, 500);
		}
	}

	preloadInit() {
		this.filterAbsentClinicMedtests();
		this.matchedMedtests = this.PreloadService.clinicMedtests;
		this.matchedAbsentMedtest = this.PreloadService.absentClinicMedtests.slice(0, 500);
	}

	filterAbsentClinicMedtests() {

		_map(this.PreloadService.clinicMedtests, (medtest) => {
			_remove(this.PreloadService.absentClinicMedtests, (item) => item.id === medtest.service.id);
		});

	}

	editMedtests (item) {
		this.$timeout(() => {
			document.getElementsByClassName("medtest" + item.id)[0].focus();
		}, 10);
		this.medtestsStatus = this.medtestsStatus === item ? null: item;
		this.oldPrice = item.price;
	}

	//Save medtest price if was changed
	priceSave (item) {

		// If price changed
		if (item.price !== this.oldPrice) {
			this.PlaceService.changeService(item).then(() => {
				alertify.success("Сохранено", 3);
			});
		}

		this.medtestsStatus = null;
	}

	cancelEdit (item) {
		item.price = this.oldPrice;
		this.autofocus = false;
		this.medtestsStatus = null;

	}

	removeMedtests (item) {
		this.PlaceService.removeService(item).then(() => {
			this.PreloadService.absentClinicMedtests.push(item.service);
			this.PreloadService.clinicMedtests = _remove(this.PreloadService.clinicMedtests, procedure => procedure.id != item.id);
			this.matchedMedtests = this.PreloadService.clinicMedtests;

			alertify.success("Удалено", 3);
		});

	}

	changeState (state) {
		this.medtestsState = this.medtestsState === "edit" ? "normal" : "edit";
		this.selectedMedtests = [];
		this.saveButtonState = false;
	}



	// When you click checkbox to choose new services, this function appends or removes from the global list
	addToSelectedMedtests (item) {

		if (this.selectedMedtests.includes(item)) {
			_remove(this.selectedMedtests, (obj) => obj.id === item.id);
		}
		else {
			this.selectedMedtests.push(item);
		}
	}

	saveServices () {
		if (this.selectedMedtests.length === 0) return this.changeState();

		this.saveButtonState = true;

		this.PlaceService.addComplexService(this.selectedMedtests).then((response) => {
			_map(response, (medtest) => this.PreloadService.clinicMedtests.push(medtest));
			this.filterAbsentClinicMedtests();
			this.changeState();
		});

	}

	searchMedtest(searchInput){

	  let options = {

			// shouldSort: true,
			threshold: 0.3,
			location: 0,
			distance: 500,
			maxPatternLength: 64,
			minMatchCharLength: 1,
			keys: ["service.name"]
	  };

	  let fuse = new Fuse(this.PreloadService.clinicMedtests, options);

	  this.$timeout(() => {

	    if(searchInput === "") {
	      this.matchedMedtests = this.PreloadService.clinicMedtests;
			}
			else {
	      this.matchedMedtests = fuse.search(searchInput);
			}

	  });

	}

	searchAbsentMedtests(searchInput){

	  let options = {
			// shouldSort: true,
			threshold: 0.3,
			location: 0,
			distance: 500,
			maxPatternLength: 64,
			minMatchCharLength: 1,
			keys: ["name"]
	  };

	  let fuse = new Fuse(this.PreloadService.absentClinicMedtests, options);

	  this.$timeout(() => {
	    if(searchInput === ""){
	      this.matchedAbsentMedtest = this.PreloadService.absentClinicMedtests.slice(0, 500);
			}
			else {
	      this.matchedAbsentMedtest = fuse.search(searchInput);
			}
	  });
	}
}

export default PersonalMedtestsController;
