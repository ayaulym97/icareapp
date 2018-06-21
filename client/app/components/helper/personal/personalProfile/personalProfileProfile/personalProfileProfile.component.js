import template from "./personalProfileProfile.html";
import controller from "./personalProfileProfile.controller";
import "./personalProfileProfile.scss";

let personalProfileProfileComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalProfileProfileComponent;
