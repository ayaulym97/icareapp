import alertify from "alertifyjs/build/alertify.min";
import _omit from "lodash/omit";
import _isEqual from "lodash/isEqual";

class EditHelperModalController {
	constructor($rootScope, HelperService, PreloadService, ClinicService, $timeout, $window) {
		"ngInject";
		this.name = "editHelperModal";
		this.allowSave = true;
		this.newPassword = null;


		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$window = $window;
		this.HelperService = HelperService;
		this.PreloadService = PreloadService;
		this.ClinicService = ClinicService;
	}


	$onInit() {
		// Creating temporary copy of "helper" dictionary
		this.tempHelper = angular.copy(this.$rootScope.selectedHelper);

		// Phone number format validation
		$(document).ready(function () {
			$("#edit-helper-phone").mask("(AYY)-YYY-YY-YY", {
				"translation": {
					A: {pattern: /[7]/},
					Y: {pattern: /[0-9]/}
				}
			});
		});

	}

	saveHelperChanges() {
		// Disabling "save" button
		this.allowSave = false;

		// Formatting phone
		if (this.tempHelper.phone !== null) {
			this.newPhone = this.formatPhone(this.tempHelper.phone);
		}

		// Checking for changes. If no changes detected closes modal without sending any data to DB
		if (_isEqual(_omit(this.tempHelper, "phone"), _omit(this.$rootScope.selectedHelper, ["$$hashKey", "phone"]))
								&& this.formatPhone(this.tempHelper.phone) === this.$rootScope.selectedHelper.phone
								&& (this.newPassword === null || this.newPassword.length === 0)) {
			this.cancelModal();
			return;
		}

		let editHelperAlertifier = alertify.notify("Сохранение...", "custom", 20);


		// Checking whether password is entered or not
		if (this.newPassword !== null) {
			if (this.newPassword.length > 0 && this.newPassword !== undefined) {

				// Data with new password
				this.data = {
					helper: this.tempHelper.id,
					full_name: this.tempHelper.full_name,
					// Adding "+7", because backend accepts phone only in this format
					phone: "+7" + this.newPhone,
					email: this.tempHelper.email,
					username: this.tempHelper.username,
					password: this.newPassword
				};
			}
		} else {
			// Data without new password
			this.data = {
				helper: this.tempHelper.id,
				full_name: this.tempHelper.full_name,
				// Adding "+7", because backend accepts phone only in this format
				phone: "+7" + this.newPhone,
				email: this.tempHelper.email,
				username: this.tempHelper.username
			};
		}

		// Sending data to DB
		this.HelperService.updateHelper(this.data).then((response) => {
			if (response.status === 200) {
				// Changing local storage data to match DB
				this.$rootScope.$broadcast("loadClinic");
				this.cancelModal();
				editHelperAlertifier.delay(2).setContent("Данные успешно сохранены!");

			}
		}, (error) => {
			console.log(error, "ERROR");
			this.allowSave = true;
			editHelperAlertifier.dismiss();
			alertify.error("Ошибка!");
			if (error.data.hasOwnProperty("email")) {
				this.errorValue = "Этот почтовый ящик уже используется";
				return;
			}
			if (error.data.hasOwnProperty("username")) {
				this.errorValue = "Этот логин уже используется";
				return;
			}
			if (error.data.hasOwnProperty("phone")) {
				this.errorValue = "Этот номер телефона уже используется";
				return;
			}
			if (error.data.hasOwnProperty("status")) {
				this.errorValue = "Формат телефона неправильный";
				return;
			}
		});
	}

	// Gets rid of extra symbols from phone mask
	formatPhone(phone) {
		return phone.replace(/[-()]/g, "");
	}

	removeHelper() {
		this.$timeout(() => this.$rootScope.$broadcast("modal:state", "deleteHelper"), 100);
	}

	cancelModal() {
		this.$rootScope.$broadcast("modal:cancel");
		this.tempHelper = null;
		this.$rootScope.selectedHelper = null;
	}

}

export default EditHelperModalController;
