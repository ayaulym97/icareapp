import template from "./personEducation.html";
import controller from "./personEducation.controller";
import "./personEducation.scss";

let personEducationComponent = {
	bindings: {
		educationList: "=",
		doctorId: "<",
		profileData: "="
	},
	template,
	controller
};

export default personEducationComponent;
