class helperIndicatorsSidebarController {
	constructor(PreloadService, $rootScope, $timeout, $state) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$state = $state;
	}

	// Opens the EDIT modal window
	editClinic() {
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "editClinic"), 100);
	}

	// Opens the DELETE modal window
	deleteClinic() {
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "deleteClinic"), 100);
	}

	// Opens the CREATE CLINIC modal window
	appendClinic() {
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "appendClinic"), 100);
	}
}

export default helperIndicatorsSidebarController;
