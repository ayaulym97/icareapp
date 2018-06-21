class HelperTopBarController {
	constructor(AuthorizationService, $state, $window, PreloadService, $scope, $rootScope) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.$state = $state;
		this.$window = $window;
		this.PreloadService = PreloadService;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
	}

	//When click on button "Обновить" reload all app
	reloadProject() {
		this.$window.location.reload();
	}

	//check for state if it is "true" set Personal icon to green
	checkPersonalState() {
		return this.$state.current.name.includes("personal");
	}

	//check for state if it is "true" set Statisic icon to green

	checkStatisticState() {
		return this.$state.current.name.includes("statistics");
	}

	checkCalendarState() {
		return this.$state.current.name.includes("calendar");

	}

	//logout from app
	logout() {
		// this.$window.localStorage.clear();
		this.AuthorizationService.logout(true);
	}
}

export default HelperTopBarController;
