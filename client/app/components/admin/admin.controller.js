class AdminController {
	constructor(PreloadService, AuthorizationService, ClinicService, HelperService, $state, $scope, $timeout, $rootScope) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.ClinicService = ClinicService;
		this.HelperService = HelperService;
		this.$state = $state;
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;


		this.loading = true;
		this.modal = null;

		this.MODAL_CANCEL      = this.$rootScope.$on("modal:cancel",        (event, data) => this.cancelModal());
		this.MODAL_SHOW        = this.$rootScope.$on("modal:state",         (event, data) => this.showModal(data));
		this.$rootScope.$on("loadClinic", (event) => this.updateHelperList());
	}

	$onInit() {
		this.initialize();
	}

	$onDestroy() {
		this.PreloadService.cities = null;
		this.PreloadService.citiesPromise = null;

		this.PreloadService.clinicsList = null;
		this.PreloadService.clinicsListPromise = null;

		this.$rootScope.selectedClinic = null;
		this.$rootScope.selectedHelper = null;

		this.MODAL_CANCEL();
		this.MODAL_SHOW();
	}


	// Getting all data, needed to admin
	// written separately to be reusable
	initialize() {
		this.PreloadService.preloadAdmin().then(() => {
			this.$timeout(() => {
				if (this.PreloadService.clinicsList.length === 0) {
					this.showModal("appendClinic");
				}else {
					this.$rootScope.selectedClinic = this.PreloadService.clinicsList[0];
				}
				this.$rootScope.$broadcast("Preload.Completed");
				this.$rootScope.loading = false;
				this.loading = false;
			},500);
		});


	}


	// Updating helpers' information
	updateHelperList() {
	  this.PreloadService.clinicsHelperListPromise = null;
	  this.PreloadService.getClinicsHelperList(this.$rootScope.selectedClinic.id).then((response) =>{
			this.$rootScope.selectedClinic.helper = response;
		});
	}


	// Cancel modal from $rootScope event
	cancelModal() {
		this.modal = null;
	}

	// Show modal from $rootScope event
	showModal(data) {
		this.modal = data;
	}
}

export default AdminController;
