class PersonalSidebarController {
	constructor($state, AuthorizationService, PreloadService, $scope, $rootScope, $timeout) {
		"ngInject";
		this.$state = $state;
		this.AuthorizationService = AuthorizationService;
		this.PreloadService = PreloadService;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
	}


	checkCurrentState() {
		return this.$state.$current.name == "helper.personal.create" || this.$state.$current.name == "helper.personal.profile";
	}
}

export default PersonalSidebarController;
