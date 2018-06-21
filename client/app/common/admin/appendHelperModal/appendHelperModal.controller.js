import _remove from "lodash/remove";
import _find from "lodash/find";
import _forEach from "lodash/forEach";

import "jquery-mask-plugin/dist/jquery.mask.min";

import alertify from "alertifyjs/build/alertify.min";


class AppendHelperModalController {
	constructor(HelperService, $scope, $rootScope, $timeout, PreloadService, AuthorizationService) {
		"ngInject";
		this.HelperService = HelperService;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;

		this.$timeout = $timeout;
		this.hint = 0;

		this.HELPER_APPEND = this.$rootScope.$on("helper:append", (event, data) => {
			this.list = data.data;
			this.from = data.from;
		});

		this.acceptHelper = false;
	}

	$onInit() {
		// Phone number format validation
		$(document).ready(function() {
			$(".helper-phone").mask("+A(YYY)-YYY-YY-YY", {"translation": {
				A: {pattern: /[7,8]/},
				Y: {pattern: /[0-9]/}
			}
			});
		});
	}

	$onDestroy() {
		this.HELPER_APPEND();
	}

	cancelModal() {
		this.$rootScope.$broadcast("modal:cancel");
	}

	checkSuperHelperHint() {
		return typeof _find(this.list, (item) => item.type === 2) === "object";
	}

	// Creating helper (sending data)
	submitHelper(helper) {
		let saveAlert = alertify.notify("Добавление диспетчера...", "custom", 20);
		this.acceptHelper = true;
		this.HelperService.create(helper).then((response) => {

			// If everything is in order, then adds a helper
			if (response.status === 200) {
				this.list = _remove(this.list, (item) => item.username !== response.data.username);
				console.log("[Admin] Helper added");
				saveAlert.delay(5).setContent("Диспетчер добавлен");
				// If there are no downloadable helpers, then we update the clinic and close the window
				if (this.list.length === 0) {
					this.PreloadService.clinicsListPromise = null;
					this.PreloadService.getClinicsList(this.AuthorizationService.user.id).then(() => {
						_forEach(this.PreloadService.clinicsList, (clinic) => {
							if (clinic.id === this.$rootScope.selectedClinic.id) this.$rootScope.selectedClinic = clinic;
						});
					});
					this.cancelModal();
				}
			}
			// If there is any error, it will display an error message
			else {
				this.acceptHelper = false;
				saveAlert.dismiss();
				alertify.notify("Ошибка!", "error", 1);

				if (response.data.status === "1") {
				  this.$timeout(() => this.hint = 1);
				}

				// If user login exist
				if (response.data.status === "2") {
					this.$timeout(() => this.hint = 2);
				}

				// If user email not valid or already exist
				if (response.data.email) {
					this.$timeout(() => this.hint = 3);
				}
			}
		});


	}

	// Submitting helper
	submit() {
		this.acceptHelper = true;
		_forEach(this.list, (helper) => {
			this.$timeout(() => this.submitHelper(helper), 1000);
		});
	}
}

export default AppendHelperModalController;
