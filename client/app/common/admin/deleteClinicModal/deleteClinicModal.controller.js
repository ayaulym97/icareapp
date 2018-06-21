import alertify from "alertifyjs/build/alertify.min";
import _remove from "lodash/remove";

class DeleteClinicModalController {
	constructor(ClinicService, $rootScope, PreloadService) {
		"ngInject";
		this.ClinicService = ClinicService;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.deleteClinicButton = false;
	}

	$onInit() {
		// Setting the id of the clinic that will be deleted
		this.id = this.$rootScope.selectedClinic.id;
	}

	cancelModal() {
		this.$rootScope.$broadcast("modal:cancel");
	}


	// Deleting the clinic if button "Да" was pressed
	submitDelete() {

		// Disabling buttons
		this.deleteClinicButton = true;

		let clinicDelete = alertify.notify("Удаление клиники...", "success", 20);

		// Sending data to server
		this.ClinicService.deleteClinic(this.id).then((response) => {
			if (response.status === 204) {
				// Removes from global variable contains clinic list
				this.PreloadService.clinicsList = _remove(this.PreloadService.clinicsList, (clinic) => clinic.id !== this.id);

				// Change selected clinic to first clinic if deleted clinic was selected
				if (this.$rootScope.selectedClinic.id === this.id) this.$rootScope.selectedClinic = this.PreloadService.clinicsList[0];

				clinicDelete.delay(5).setContent("Клиника удалена");
				console.log("[Admin] Clinic removed");
				this.cancelModal();
			}
		});
	}
}

export default DeleteClinicModalController;
