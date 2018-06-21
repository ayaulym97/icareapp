import angular from "angular";
import uiRouter from "angular-ui-router";
import boxStatisticComponent from "./boxStatistic.component";

let boxStatisticModule = angular.module("boxStatistic", [
	uiRouter
])

	.component("boxStatistic", boxStatisticComponent)

	.name;

export default boxStatisticModule;
