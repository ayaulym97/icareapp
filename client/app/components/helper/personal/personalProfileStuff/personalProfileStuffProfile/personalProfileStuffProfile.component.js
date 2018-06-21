import template from "./personalProfileStuffProfile.html";
import controller from "./personalProfileStuffProfile.controller";
import "./personalProfileStuffProfile.scss";

let personalProfileStuffProfileComponent = {
	bindings: {
		profileData:"="
	},
	template,
	controller
};

export default personalProfileStuffProfileComponent;
