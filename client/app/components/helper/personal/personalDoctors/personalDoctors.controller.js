import _find from "lodash/find";
import _filter from "lodash/filter";
import _map from "lodash/map";
import _remove from "lodash/remove";
import Fuse from "fuse.js/dist/fuse";

class PersonalDoctorsController {
	constructor(PreloadService, AuthorizationService, HelperService, $rootScope, $timeout) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.HelperService = HelperService;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;

		this.stateHelper = false;
		this.doctorListSearch = "";
		this.updateHelperDoctors = this.$rootScope.$on("helper:update:list", () => this.getHelperDoctor());
		this.updateSuperDoctors = this.$rootScope.$on("Superhelper:update:list", () => this.getDoctors());
		this.helperListUpdate = this.$rootScope.$on("Update:helper:list", () => this.preloadInit());
		this.helperDelete = this.$rootScope.$on("Super:helper:delete", () => this.preloadInit());
		this.preloadCompleted = $rootScope.$on("Preload.Completed", () => this.preloadInit());


		this.options = {
			// shouldSort: true,
			threshold: 0.4,
			location: 0,
			distance: 1000,
			maxPatternLength: 32,
			minMatchCharLength: 1,
			keys: [
				"full_name",
				"speciality.name"
			]
		};

		//Scroll to top
		$(document).ready(function () {

			let anchor = $("#scrollToTop");

			$(".personal-doctors").scroll(function () {
				$(this).scrollTop() > 1000 ? anchor.fadeIn() : anchor.fadeOut();
			});

			//Click event to scroll to top
			$("#scrollToTop").click(function () {
				$(".personal-doctors").animate({scrollTop: 0}, 1000);
				return false;
			});
		});

	}


	$onInit() {
		if (this.$rootScope.loading !== true && typeof this.$rootScope.loading !== "undefined") {
			this.preloadInit();
		}
	}

	preloadInit() {
		if (this.AuthorizationService.user.type === 2) {

			this.$timeout(() => {

				//Remove all doctors who hasn't helpers
				this.PreloadService.clinicDoctorList = _remove(this.PreloadService.clinicDoctorList, (doctor) => doctor.helper !== null);
				//Filter all helper to activated helpers
				this.helperList = _filter(this.PreloadService.clinicsHelperList, (helper) => helper.status === 0).reverse();


				//Count doctor length
				this.helperList = _map(this.helperList, (helper) => {
					helper.count = _filter(this.PreloadService.clinicDoctorList, (doctor) => doctor.helper.id === helper.id).length;
					return helper;
				});
			});


			//Find yourself in all helper list
			if (this.$rootScope.lastSelectedHelper === null) {

				this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => helper.id === this.AuthorizationService.user.id);
				this.$rootScope.lastSelectedHelper = this.currentHelper;
			}
			else {
				this.currentHelper = this.$rootScope.lastSelectedHelper;
			}

			this.modal = null;

			//Filter all doctors by current helper
			this.getDoctors();

			return true;

		}

		// if (this.AuthorizationService.user.type === 1 && this.AuthorizationService.user.permission === 1) {
		//
		//   //Remove all doctors who hasn't helpers
		//   this.PreloadService.clinicDoctorList = _remove(this.PreloadService.clinicDoctorList, (doctor) => doctor.helper !== null);
		//
		//   //Get only owned by current helper
		//   this.currentDoctorList = this.PreloadService.clinicDoctorList;
		//
		//   this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => helper.id === this.AuthorizationService.user.id);
		//
		//   return true;
		//
		// }

		if (this.AuthorizationService.user.type === 1) {

			//Remove all doctors who hasn't helpers
			this.PreloadService.helperDoctorList = _remove(this.PreloadService.helperDoctorList, (doctor) => doctor.helper !== null);

			//Get only owned by current helper
			this.currentDoctorList = this.PreloadService.helperDoctorList;

			this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => helper.id === this.AuthorizationService.user.id);

			return true;

		}

	}

	$onDestroy() {
		this.updateHelperDoctors();
		this.updateSuperDoctors();
		this.helperListUpdate();
		this.helperDelete();
		this.preloadCompleted();

	}

	//Select a helper
	selectHelper(helper) {
		this.currentHelper = helper;
		this.currentDoctorList = _filter(this.PreloadService.clinicDoctorList, (doctor) => doctor.helper.id === this.currentHelper.id);
		this.searchDoctors(this.doctorListSearch);
		this.$rootScope.lastSelectedHelper = helper;

	}

	//Shows list of helpers
	showHelperList() {
		this.stateHelper = !this.stateHelper;
	}

	//Changes current helper to another one
	changeDispatcher(item) {
		this.loading = true;
		this.currentDispatcher = item;
		this.loadDoctors(this.currentDispatcher.id);
	}

	// Filter doctor from clinic doctor list and get belongs current helper
	getDoctors() {
		this.$timeout(() => {
			this.currentDoctorList = _filter(this.PreloadService.clinicDoctorList, (doctor) => doctor.helper.id === this.currentHelper.id);

		}, 300);
	}

	getHelperDoctor() {
		this.$timeout(() => {
			this.currentDoctorList = this.PreloadService.helperDoctorList;
		});
	}

	// loadHelpers() {
	//   this.PersonalService.getHelpers(this.AuthService.user.place, 0).then((data) => {
	//     this.dispatcherList = data;
	//     this.loadDoctors();
	//   });
	// }


	// Searches doctors by their full names or specialities
	searchDoctors(searchInput) {

		let fuse = new Fuse(this.currentDoctorList, this.options);

		this.$timeout(() => {
			if (searchInput === "") {
				if (this.AuthorizationService.user.type === 2) {
					this.currentDoctorList = _filter(this.PreloadService.clinicDoctorList, (doctor) => doctor.helper.id === this.currentHelper.id);
				}
				if (this.AuthorizationService.user.type === 1) {
					this.currentDoctorList = this.PreloadService.helperDoctorList;
				}
			}
			else {
				this.currentDoctorList = fuse.search(searchInput);
			}
		});
	}
}

export default PersonalDoctorsController;
