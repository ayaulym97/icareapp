import template from "./personalCreateProfile.html";
import controller from "./personalCreateProfile.controller";
import "./personalCreateProfile.scss";

let personalCreateProfileComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalCreateProfileComponent;
