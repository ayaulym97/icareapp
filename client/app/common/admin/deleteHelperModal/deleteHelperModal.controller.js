import alertify from "alertifyjs/build/alertify.min";
import _remove from "lodash/remove";


class DeleteHelperModalController {
	constructor(HelperService, $rootScope, PreloadService) {
		"ngInject";
		this.HelperService = HelperService;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.deleteHelperButton = false;
	}

	cancelModal() {
		this.$rootScope.selectedHelper = null;
		this.$rootScope.$broadcast("modal:cancel");
	}

	// Removes the helper and exits this modal window
	submit() {
		this.deleteHelperButton = true;
		let contentDelete = alertify.notify("Удаление диспетчера...", "custom",20);
		this.HelperService.deleteHelper({person: this.$rootScope.selectedHelper.id}).then(() => {
			contentDelete.delay(5).setContent("Диспетчер удален");
			// Real-time of helper count in sidebar
			_remove(this.$rootScope.selectedClinic.helper, (helper) => helper.id === this.$rootScope.selectedHelper.id);
			this.$rootScope.selectedClinic.personals.helpers -= 1;
			this.cancelModal();
		},
			// If there are any errors, then displays an alert with an error
		() => {
			contentDelete.dismiss();
			alertify.error("Ошибка");
			this.deleteHelperButton = false;
		});
	}
}

export default DeleteHelperModalController;
