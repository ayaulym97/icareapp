import template from "./boxStatistic.html";
import controller from "./boxStatistic.controller";
import "./boxStatistic.scss";

let boxStatisticComponent = {
	restrict: "E",
	bindings: {
		month: "@",
		count: "@",
		name: "@",
		price: "@",
		color: "@"
	},
	template,
	controller
};

export default boxStatisticComponent;
