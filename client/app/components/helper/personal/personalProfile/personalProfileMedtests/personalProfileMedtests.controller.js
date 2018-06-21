// import _reject from "lodash/reject";
import alertify from "alertifyjs/build/alertify";
// import _find from "lodash/find";
import _remove from "lodash/remove";
// import _map from "lodash/map";
import _forEach from "lodash/forEach";


class PersonalProfileMedtestsController {
	constructor($scope, $rootScope, PreloadService, HelperService, $stateParams, $timeout) {
		"ngInject";
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.HelperService = HelperService;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.newDoctorMedtest = [];
	}

	$onInit() {
		this.setDoctor();
	}

	backToProfile() {
		this.$scope.$emit("back");
	}

	setDoctor() {
		this.doctorService = [];

		_forEach(this.profileData.service, (service) => {

			if (service.type === 0) this.doctorService.push(service.id);

			if (service.type === 1) this.newDoctorMedtest.push(service.id);

		});
	}

	addToDoctorMedtest(medtest) {
		if (this.newDoctorMedtest.includes(medtest.service.id)) {
			_remove(this.newDoctorMedtest, (id) => id === medtest.service.id);
		}
		else {
			this.newDoctorMedtest.push(medtest.service.id);
		}
	}

	saveMedtest() {
		let saveAlert = alertify.notify("Сохранение...", "success", 20);

		_forEach(this.newDoctorMedtest, (medtest) => {
			this.doctorService.push(medtest);
		});

		let data = {
			helper: this.profileData.helper.id,
			service: this.doctorService,
			place: this.profileData.place.id
		};

		this.HelperService.updateProcedures(data, this.profileData.id).then((response) => {

			let saveAlert = alertify.notify("Данные сохранены", "success", 20);
			this.profileData.service = response.data.service;
			this.backToProfile();

		});

	}
}

export default PersonalProfileMedtestsController;
