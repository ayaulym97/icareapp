import template from "./declineRequest.html";
import controller from "./declineRequest.controller";
import "./declineRequest.scss";

let declineRequestComponent = {
	bindings: {
		doctor:"=",
		worktime:"="
	},
	template,
	controller
};

export default declineRequestComponent;
