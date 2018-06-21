import template from "./deleteDoctorModal.html";
import controller from "./deleteDoctorModal.controller";
import "./deleteDoctorModal.scss";

let deleteDoctorModalComponent = {
	restrict: "E",
	bindings: {
		profileId : "="
	},
	template,
	controller
};

export default deleteDoctorModalComponent;
