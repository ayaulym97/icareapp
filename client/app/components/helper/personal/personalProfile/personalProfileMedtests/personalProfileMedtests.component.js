import template from "./personalProfileMedtests.html";
import controller from "./personalProfileMedtests.controller";
import "./personalProfileMedtests.scss";

let personalProfileMedtestsComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalProfileMedtestsComponent;
