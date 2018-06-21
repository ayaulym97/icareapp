import template from "./loadingSpinner.html";
import controller from "./loadingSpinner.controller";
import "./loadingSpinner.scss";

let loadingSpinnerComponent = {
	restrict: "E",
	bindings: {},
	template,
	controller
};

export default loadingSpinnerComponent;
