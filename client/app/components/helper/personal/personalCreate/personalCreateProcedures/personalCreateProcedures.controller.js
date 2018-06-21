import _remove from "lodash/remove";

class PersonalCreateProceduresController {
	constructor($scope,PreloadService,HelperService, $rootScope) {
		"ngInject";
		this.$scope=$scope;
		this.$rootScope = $rootScope;
		this.PreloadService=PreloadService;
		this.HelperService=HelperService;
		// this.name = "personalProfileProcedures";
		this.newDoctorProcedures=[];

	}

	$onInit() {
		this.doctorService=[];
	}

	backToProfile(){
		this.$scope.$emit("back");
	}

	//Add procedure  to doctor(profileData) service
	addToDoctorProcedure(procedure){
		if(this.profileData.service.includes(procedure.service.id)){
			_remove(this.profileData.service, (obj) => obj === procedure.service.id);
			_remove(this.profileData.procedureService, (obj) => obj === procedure.service.id);
		}
		else{

			this.profileData.service.push(procedure.service.id);
			this.profileData.procedureService.push(procedure.service.id);

		}
	}
}


export default PersonalCreateProceduresController;
