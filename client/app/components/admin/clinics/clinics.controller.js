class ClinicsController {
	constructor(AuthorizationService, PreloadService, $scope, $rootScope, $timeout) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.PreloadService = PreloadService;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
	}

	editHelper(helper) {
		this.$rootScope.selectedHelper = helper;
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "editHelper"), 100);
	}

	removeHelper(helper) {
		this.$rootScope.selectedHelper = helper;
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "deleteHelper"), 100);
	}

	// Telling statistics of which helper to show in opened helperIndicators state
	chooseHelper(helper) {
		this.$rootScope.selectedHelper = helper;
	}

	// Generates new helper template and shows adding form
	appendHelper() {
		let newHelperList = [];

		// If the number of helpers is zero, the first helper after the addition will be a superHelper
		if (this.$rootScope.selectedClinic.helper.length === 0) {
			newHelperList.push({
				place: this.$rootScope.selectedClinic.id,
				username: this.AuthorizationService.user.username + "-" + this.$rootScope.selectedClinic.id + "-" + 1,
				password: this.AuthorizationService.user.username +  1,
				email: null,
				phone: null,
				type: 2
			});
		}
		// Others will be ordinary helpers
		else {
			newHelperList.push({
				place: this.$rootScope.selectedClinic.id,
				username: this.AuthorizationService.user.username + "-" + this.$rootScope.selectedClinic.id + "-" + (this.$rootScope.selectedClinic.helper.length + 1),
				password: this.AuthorizationService.user.username + (this.$rootScope.selectedClinic.helper.length + 1),
				email: null,
				phone: null,
				type: 1
			});
		}


		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "appendHelper"), 0);
		this.$timeout(() => this.$rootScope.$broadcast("helper:append", {data: newHelperList, from: "helper"}), 0);
	}
}

export default ClinicsController;
