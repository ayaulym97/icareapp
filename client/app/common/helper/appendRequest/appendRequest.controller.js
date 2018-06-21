import ApiConfig from "../../../utils/config";
import StaticTypes from "../../../utils/staticTypes";
import moment from "moment";

// import _each from "lodash/each";
// import _remove from "lodash/remove";
import _find from "lodash/find";

class AppendRequestController {
	constructor($rootScope, PreloadService, CalendarService, $scope) {
		"ngInject";
		// this.name = "appendRequest";
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.ApiConfig = ApiConfig;
		this.PreloadService = PreloadService;
		this.CalendarService = CalendarService;
		this.moment = moment;
		this.requestTypes = StaticTypes.REQUEST_TYPES;
		this.btnState = false;
	}

	// Give signal to close the modal
	cancel() {
		this.$scope.$emit("modal:cancel");
	}

	// On click to button "YES" send the data to approve the req and close modal
	approveRequest(request) {
		this.btnState = !this.btnState;
		let doctorGlobal = _find(this.PreloadService.helperDoctorList, {id: parseInt(request.doctor.id)});
		let worktime = request.busy_time[0];
		let doctor = request.doctor;

		this.CalendarService.acceptRequestModal(worktime, doctor).then((response) => {

			this.$scope.$emit("request:accept", worktime, doctor);
			this.cancel();
		});
	}

	// Decline request
	declineRequest(request) {
		// Set the button state disabled
		this.btnState = !this.btnState;
		let doctorGlobal = _find(this.PreloadService.helperDoctorList, {id: parseInt(request.doctor.id)});
		let worktime = request.busy_time[0];
		let doctor = request.doctor;
		this.$scope.$emit("modal:change", worktime, doctor);
		// this.cancel();

		// this.CalendarService.rejectRequestModal(worktime, doctor).then(() => {
		//   this.selectedWorktime = null;
		//
		// });
	}
}

export default AppendRequestController;
