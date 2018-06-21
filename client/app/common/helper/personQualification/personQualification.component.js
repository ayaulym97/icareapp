import template from "./personQualification.html";
import controller from "./personQualification.controller";
import "./personQualification.scss";

let personQualificationComponent = {
	bindings: {
		qualificationList: "=",
		doctorId: "<",
		profileData: "="
	},
	template,
	controller
};

export default personQualificationComponent;
