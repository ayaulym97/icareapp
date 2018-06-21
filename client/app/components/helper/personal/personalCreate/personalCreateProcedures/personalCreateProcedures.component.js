import template from "./personalCreateProcedures.html";
import controller from "./personalCreateProcedures.controller";
import "./personalCreateProcedures.scss";

let personalCreateProceduresComponent = {
	bindings: {
		profileData: "="
	},
	template,
	controller
};

export default personalCreateProceduresComponent;
