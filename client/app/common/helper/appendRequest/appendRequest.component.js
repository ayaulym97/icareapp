import template from "./appendRequest.html";
import controller from "./appendRequest.controller";
import "./appendRequest.scss";

let appendRequestComponent = {
	bindings: {
		profileData :"="
	},
	template,
	controller
};

export default appendRequestComponent;
