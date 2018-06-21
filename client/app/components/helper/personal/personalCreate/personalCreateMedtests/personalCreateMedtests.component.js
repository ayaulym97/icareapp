import template from "./personalCreateMedtests.html";
import controller from "./personalCreateMedtests.controller";
import "./personalCreateMedtests.scss";

let personalCreateMedtestsComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalCreateMedtestsComponent;
