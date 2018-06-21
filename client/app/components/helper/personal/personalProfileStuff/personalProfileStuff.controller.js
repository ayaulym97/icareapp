import _find from "lodash/find";
import _forEach from "lodash/forEach";


class PersonalProfileStuffController {
	constructor(PreloadService, $stateParams, $rootScope, $scope, $timeout) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.personalProfileState = "profile";


		this.backToProfile = this.$scope.$on("back", () => this.back());
		this.doctorUpdate = this.$rootScope.$on("Doctor:helper:updated", () => this.preloadInit());
		this.preloadCompleted = this.$rootScope.$on("Preload.Completed", () => this.preloadInit());
	}

	$onInit() {
		if (this.$rootScope.loading !== true && this.$rootScope.loading !== undefined) {
			this.preloadInit();
		}

	}

	preloadInit() {

		//Profile of Doctor
		this.personalProfileData = _find(this.PreloadService.clinicStuffList, {id: parseInt(this.$stateParams.id)});
		this.personalProfileData.education = this.personalProfileData.education.reverse();
		this.personalProfileData.qualification = this.personalProfileData.qualification.reverse();
		this.sortService();
	}

	changePersonalState(state) {
		this.personalProfileState = state;
	}

	sortService() {
		this.proceduresLength = [];
		this.medtestLength = [];
		this.$timeout(() => {

			_forEach(this.personalProfileData.service, (item) => {

				if (item.type === 0) this.$timeout(() => this.proceduresLength.push(item));

				if (item.type === 1) this.$timeout(() => this.medtestLength.push(item));

			});
		});

	}

	back() {
		this.personalProfileState = "profile";
	}

	$onDestroy() {
		this.doctorUpdate();
		this.preloadCompleted();
	}
}

export default PersonalProfileStuffController;
