class HelperController {
	constructor(PreloadService, AuthorizationService, $rootScope, ClinicService) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.$rootScope = $rootScope;
		this.ClinicService = ClinicService;
		this.$rootScope.loading = true;
		this.loading = true;

		this.modal = null;

		this.MODAL_CANCEL = this.$rootScope.$on("modal:cancel", (event, data) => this.cancelModal());
		this.MODAL_SHOW   = this.$rootScope.$on("modal:state",  (event, data) => this.showModal(data));
	}

	$onInit() {

		if (this.AuthorizationService.user.type === 2) {
			console.log("[Preload] Started");
			this.PreloadService.preloadSuperHelper().then(() => {
				this.$rootScope.$broadcast("Preload.Completed");
				this.$rootScope.loading = false;
				this.loading = false;

			});
		}

		if (this.AuthorizationService.user.type === 1) {

			this.PreloadService.preloadHelper().then(() => {
				this.$rootScope.$broadcast("Preload.Completed");
				this.$rootScope.loading = false;
				this.loading = false;

			});
		}

	}

	$onDestroy() {
		this.PreloadService.globalProcedures = null;
		this.PreloadService.absentClinicProcedures = null;
		this.PreloadService.clinicProcedures = null;

		this.PreloadService.globalMedtests = null;
		this.PreloadService.absentClinicMedtests = null;
		this.PreloadService.clinicMedtests = null;

		this.PreloadService.clinicDoctorList = null;
		this.PreloadService.clinicsHelperList = null;
		this.PreloadService.helperDoctorList = null;

		this.PreloadService.helperStuffList = null;
		this.PreloadService.clinicStuffList = null;

		this.PreloadService.specialities = null;
		this.PreloadService.helperChat = null;
		this.PreloadService.loadedCalendarDates = [];
		this.PreloadService.clinicsStuff = null;

		this.PreloadService.globalProceduresPromise = null;
		this.PreloadService.globalMedtestsPromise = null;
		this.PreloadService.clinicProceduresPromise = null;
		this.PreloadService.clinicMedtestsPromise = null;

		this.PreloadService.clinicDoctorListPromise = null;
		this.PreloadService.clinicsHelperListPromise = null;
		this.PreloadService.helperDoctorListPromise = null;

		this.PreloadService.specialitiesPromise = null;
		this.PreloadService.helperChatPromise = null;
		this.PreloadService.clinicsStuffPromise = null;

		this.$rootScope.lastSelectedHelper = null;
		this.$rootScope.lastSelectedDialog = null;


		this.PreloadService.helperStuffListPromise = null;
		this.PreloadService.clinicStuffListPromise= null;


		this.MODAL_CANCEL();
		this.MODAL_SHOW();
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

export default HelperController;
