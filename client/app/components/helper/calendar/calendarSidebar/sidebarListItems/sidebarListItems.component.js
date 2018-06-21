import template from "./sidebarListItems.html";
import controller from "./sidebarListItems.controller";
import "./sidebarListItems.scss";

let sidebarListItemsComponent = {
	restrict: "E",
	bindings: {
		data: "=",
		type: "="
	},
	template,
	controller
};

export default sidebarListItemsComponent;
