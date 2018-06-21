import _remove from "lodash/remove";


class PersonalProfileMedtestsController {
	constructor($scope,$rootScope,PreloadService,HelperService,$stateParams,$timeout) {
		"ngInject";
		this.$scope=$scope;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.HelperService = HelperService;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		// this.name = "personalProfileMedtests";
		this.newDoctorMedtest = [];

	}

	$onInit() {
		this.setDoctor();
	}

	backToProfile(){
		this.$scope.$emit("back");
	}

	setDoctor(){
		this.doctorService=[];
	}

	//Add procedure  to doctor(profileData) service
	addToDoctorMedtest(medtest){
		if(this.profileData.service.includes(medtest.service.id)){
			_remove(this.profileData.service, (obj) => obj === medtest.service.id);
			_remove(this.profileData.medtestService, (obj) => obj === medtest.service.id);
		}
		else{
			this.profileData.service.push(medtest.service.id);
			this.profileData.medtestService.push(medtest.service.id);
		}
	}
}

export default PersonalProfileMedtestsController;
