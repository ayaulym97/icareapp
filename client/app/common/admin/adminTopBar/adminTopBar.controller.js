class AdminTopBarController {
	constructor(AuthorizationService, $rootScope, $state, $window, PreloadService) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.$rootScope = $rootScope;
		this.$state = $state;
		this.$window = $window;
		this.PreloadService = PreloadService;
	}

	reloadProject() {
		this.$window.location.reload();
	}

	// For active class if current state is helperStatistics or clinicList
	checkStateAdmin(){
		if (this.$state.current.name.includes("helperIndicators") || this.$state.current.name.includes("clinics")) {
			return true;
		} else {
			return false;
		}
	}

	// Logout from system
	logout() {
		this.AuthorizationService.logout(true);
	}
}

export default AdminTopBarController;
