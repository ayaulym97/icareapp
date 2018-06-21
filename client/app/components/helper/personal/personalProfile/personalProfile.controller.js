import _find from "lodash/find";
import _forEach from "lodash/forEach";

class PersonalProfileController {
	constructor(PreloadService, $stateParams, $rootScope,$scope, $timeout) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.$scope=$scope;
		this.personalProfileState = "profile";


		this.backToProfile = this.$scope.$on("back",(event) => this.back() );
		this.doctorUpdate  = this.$rootScope.$on("Doctor:helper:updated", (event) => this.preloadInit());
		this.preloadCompleted = this.$rootScope.$on("Preload.Completed", (event, data) => this.preloadInit());
	}

	$onInit() {
		if (this.$rootScope.loading != true && typeof this.$rootScope.loading != "undefined") {
			this.preloadInit();
		}

	}

	preloadInit() {


		//Profile of Doctor
		this.personalProfileData = _find(this.PreloadService.clinicDoctorList, {id : parseInt(this.$stateParams.id)});
		this.personalProfileData.education = this.personalProfileData.education.reverse();
		this.personalProfileData.qualification = this.personalProfileData.qualification.reverse();
		this.sortService();
	}

	changePersonalState(state) {
		this.personalProfileState = state;
	}

	sortService(){
		this.proceduresLength = [];
		this.medtestLength = [];
		this.$timeout(() => {

			_forEach(this.personalProfileData.service,(item) => {

				if(item.type == 0) this.$timeout(() => this.proceduresLength.push(item),5);

				if(item.type == 1) this.$timeout(() => this.medtestLength.push(item),5);

			});
		});

	}

	back(){
		this.personalProfileState = "profile";
	}
	$onDestroy() {
		this.preloadCompleted();
	}
}

export default PersonalProfileController;
