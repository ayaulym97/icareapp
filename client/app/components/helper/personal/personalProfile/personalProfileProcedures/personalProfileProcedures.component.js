import template from "./personalProfileProcedures.html";
import controller from "./personalProfileProcedures.controller";
import "./personalProfileProcedures.scss";

let personalProfileProceduresComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalProfileProceduresComponent;
