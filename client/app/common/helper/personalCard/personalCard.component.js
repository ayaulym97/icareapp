import template from "./personalCard.html";
import controller from "./personalCard.controller";
import "./personalCard.scss";

let personalCardComponent = {
	restrict: "E",
	bindings: {
		info: "=",
		dispatchers: "="
	},
	template,
	controller
};

export default personalCardComponent;
