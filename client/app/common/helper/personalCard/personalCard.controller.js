import APIConfig from "../../../utils/config";

class PersonalCardController {
	constructor(AuthorizationService, $timeout, $rootScope, $state) {
		"ngInject";
		this.staticUrl = APIConfig.STATIC_URL;
		this.AuthorizationService = AuthorizationService;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.$state = $state;
	}

	//On click on card to open the View of doctor or stuff
	goToDoctor(id) {
		//Check for state if it is "doctor" it will open doctor view else open stuff view
		if (this.$state.current.name.includes("doctors")) {
			this.$state.go("helper.personal.profile", {id: id});
		}
		else {
			this.$state.go("helper.personal.profileStuff", {id: id});
		}
	}


	//On click to x it will delete a doctor or stuff
	removeDoctor(doctor) {
		this.$rootScope.selectedDoctor = doctor;
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "deleteDoctor"));
	}
}

export default PersonalCardController;
