import template from "./personalCreateStuffProfile.html";
import controller from "./personalCreateStuffProfile.controller";
import "./personalCreateStuffProfile.scss";

let personalCreateStuffProfileComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalCreateStuffProfileComponent;
