import template from "./personalProfileStuffMedtests.html";
import controller from "./personalProfileStuffMedtests.controller";
import "./personalProfileStuffMedtests.scss";

let personalProfileStuffMedtestsComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalProfileStuffMedtestsComponent;
