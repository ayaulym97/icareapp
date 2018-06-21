class AdminStatisticsSidebarController {
	constructor(PreloadService, $rootScope, $timeout) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
	}

	// Selects clinic from sidebar
	selectClinic(clinic) {
		this.$rootScope.selectedClinic = clinic;
		this.$rootScope.$broadcast("statistic.update", {});
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

export default AdminStatisticsSidebarController;
