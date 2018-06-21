import template from "./boxTotalStatistic.html";
import controller from "./boxTotalStatistic.controller";
import "./boxTotalStatistic.scss";

let boxTotalStatisticComponent = {
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

export default boxTotalStatisticComponent;
