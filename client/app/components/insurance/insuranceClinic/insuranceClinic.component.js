import template from "./insuranceClinic.html";
import controller from "./insuranceClinic.controller";
import "./insuranceClinic.scss";

let insuranceClinicComponent = {
	bindings: {
		content: "<"
	},
	template,
	controller
};

export default insuranceClinicComponent;
