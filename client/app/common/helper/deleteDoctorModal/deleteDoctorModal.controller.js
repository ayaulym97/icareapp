import alertify from "alertifyjs/build/alertify.min";
import _remove from "lodash/remove";


class deleteDoctorModalController {
	constructor(HelperService, $rootScope, PreloadService, $state) {
		"ngInject";
		this.HelperService = HelperService;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.$state = $state;
		this.deleteDoctorButton = false;
	}

	//Closing current modal if you click button "НЕТ"
	cancelModal() {
		this.$rootScope.$broadcast("modal:cancel");
	}

	//Removes the doctor and close this modal window
	submit() {
		this.deleteDoctorButton = true;
		let contentDelete = alertify.notify("Удаление доктора...", "custom", 20);
		this.HelperService.deleteDoctor(this.$rootScope.selectedDoctor).then(() => {

			contentDelete.delay(5).setContent("Доктор удален");
			//Real-time of doctor count in sidebar
			if (this.$state.current.name.includes("doctors")) {
				_remove(this.PreloadService.clinicDoctorList, (item) => item.id === this.$rootScope.selectedDoctor);

			}
			else {
				_remove(this.PreloadService.clinicStuffList, (item) => item.id === this.$rootScope.selectedDoctor);

			}
			this.$rootScope.$broadcast("Super:helper:delete");
			this.cancelModal();
		},
			//If there are any errors, then displays an alert with an error
		() => {
			contentDelete.dismiss();
			alertify.error("Ошибка");
			this.deleteDoctorButton = false;
		});
	}
}

export default deleteDoctorModalController;
