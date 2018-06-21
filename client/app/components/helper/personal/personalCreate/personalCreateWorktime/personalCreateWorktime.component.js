import template from "./personalCreateWorktime.html";
import controller from "./personalCreateWorktime.controller";
import "./personalCreateWorktime.scss";

let personalCreateWorktimeComponent = {
	bindings: {
		info: "="
	},
	template,
	controller
};

export default personalCreateWorktimeComponent;
