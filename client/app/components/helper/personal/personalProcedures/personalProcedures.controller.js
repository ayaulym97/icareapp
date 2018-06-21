import alertify from "alertifyjs/build/alertify";
import _remove from "lodash/remove";
import _map from "lodash/map";
import Fuse from "fuse.js/dist/fuse";

class PersonalProceduresController {
	constructor(AuthorizationService, PreloadService, PlaceService, $stateParams, $rootScope, $timeout, $q) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.$q = $q;
		this.PreloadService = PreloadService;
		this.$rootScope = $rootScope;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.PlaceService = PlaceService;
		this.proceduresStatus = null;
		this.itemChange = null;
		this.oldPrice = 0;


		// For disabling when button clicked request
		this.saveButtonState = false;

		this.$rootScope.$on("Preload.Completed", () => this.preloadInit());

		this.selectedProcedures = [];

		$(document).ready(function() {
			$(".personal-procedures").scroll(function () {
			  let anchor = $("#scrollToTop");
				$(this).scrollTop() > 500 ? anchor.fadeIn() : anchor.fadeOut();
			});

			//Click event to scroll to top
			$("#scrollToTop").click(function () {
				$(".personal-procedures").animate({scrollTop: 0}, 1000);
				return false;
			});
		});

		this.proceduresState = "normal";
	}

	$onInit() {
		if (this.$rootScope.loading != true && typeof this.$rootScope.loading != "undefined") {
			this.filterAbsentClinicProcedures();
			this.matchedProcedures = this.PreloadService.clinicProcedures;
			this.matchedAbsentProcedures = this.PreloadService.absentClinicProcedures.slice(0,500);
		}
	}

	preloadInit() {
		this.filterAbsentClinicProcedures();
		this.matchedProcedures = this.PreloadService.clinicProcedures;
		this.matchedAbsentProcedures = this.PreloadService.absentClinicProcedures.slice(0,500);
	}

	filterAbsentClinicProcedures() {

		_map(this.PreloadService.clinicProcedures, (procedure) => {
			_remove(this.PreloadService.absentClinicProcedures, (item) => item.id == procedure.service.id);
		});

	}

	editProcedures (item) {
		this.$timeout(() => {
			document.getElementsByClassName("medtest" + item.id)[0].focus();
		}, 10);
		this.proceduresStatus = this.proceduresStatus == item ? null: item;
		this.oldPrice = item.price;
	}

	//Save procedure price if was changed
	priceSave (item) {

		// If price changed
		if (item.price != this.oldPrice) {
			this.PlaceService.changeService(item).then(() => {
				alertify.success("Сохранено", 3);
			});
		}

		this.proceduresStatus = null;
	}

	cancelEdit (item) {
		item.price = this.oldPrice;
		this.proceduresStatus = null;
	}

	removeProcedures (item) {
		this.PlaceService.removeService(item).then(() => {

			this.PreloadService.absentClinicProcedures.push(item.service);
			this.PreloadService.clinicProcedures = _remove(this.PreloadService.clinicProcedures, procedure => procedure.id != item.id);
			this.matchedProcedures = this.PreloadService.clinicProcedures;
			// this.matchedProcedures = _remove(this.matchedProcedures, procedure => procedure.id != item.id);
			alertify.success("Удалено", 3);
		});

	}

	changeState () {
		this.proceduresState = this.proceduresState == "edit" ? "normal" : "edit";
		this.selectedProcedures = [];
		this.saveButtonState = false;
	}



	// When you click checkbox to choose new services, this function appends or removes from the global list
	addToSelectedProcedures (item) {

		if (this.selectedProcedures.includes(item)) {
			_remove(this.selectedProcedures, (obj) => obj.id == item.id);
		}
		else {
			this.selectedProcedures.push(item);
		}
	}


	saveProcedures () {
		this.saveButtonState = true;

		if (this.selectedProcedures.length == 0) return this.changeState();


		this.PlaceService.addComplexService(this.selectedProcedures).then((response) => {
			_map(response, (procedure) => this.PreloadService.clinicProcedures.push(procedure));
			this.filterAbsentClinicProcedures();
			this.changeState();
		});

	}

	searchProcedures(searchInput){

	  let options = {

	    // shouldSort: true,
			threshold: 0.3,
			location: 0,
			distance: 500,
			maxPatternLength: 64,
			minMatchCharLength: 1,
			keys: ["service.name"]
		};

	  let fuse = new Fuse(this.PreloadService.clinicProcedures, options);


		this.$timeout(() => {

			if(searchInput == ""){
				this.matchedProcedures = this.PreloadService.clinicProcedures;
			}else{
				this.matchedProcedures = fuse.search(searchInput);
			}
		}, 0);
	}

	searchAbsentProcedures(searchInput){


	  let options = {

	    // shouldSort: true,
			threshold: 0.3,
			location: 0,
			distance: 500,
			maxPatternLength: 64,
			minMatchCharLength: 1,
			keys: ["name"]
		};

	  let fuse = new Fuse(this.PreloadService.absentClinicProcedures, options);

	  this.$timeout(() => {

	    if(searchInput == ""){
	      this.matchedAbsentProcedures = this.PreloadService.absentClinicProcedures.slice(0, 500);
			}else{
	      this.matchedAbsentProcedures = fuse.search(searchInput);
			}

		});

	}



}

export default PersonalProceduresController;
