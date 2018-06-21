import template from "./clinics.html";
import controller from "./clinics.controller";
import "./clinics.scss";

let clinicsComponent = {
	restrict: "E",
	bindings: {
		view: "="
	},
	template,
	controller
};

export default clinicsComponent;
