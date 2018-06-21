import angular from "angular";
import uiRouter from "angular-ui-router";
import boxTotalStatisticComponent from "./boxTotalStatistic.component";

let boxTotalStatisticModule = angular.module("boxTotalStatistic", [
	uiRouter
])

	.component("boxTotalStatistic", boxTotalStatisticComponent)

	.name;

export default boxTotalStatisticModule;
