import template from "./helperIndicators.html";
import controller from "./helperIndicators.controller";
import "./helperIndicators.scss";

let helperIndicatorsComponent = {
	restrict: "E",
	bindings: {
		view: "="
	},
	template,
	controller
};

export default helperIndicatorsComponent;
