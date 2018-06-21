import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCardComponent from "./personalCard.component";

let personalCardModule = angular.module("personalCard", [
	uiRouter
])

	.component("personalCard", personalCardComponent)

	.name;

export default personalCardModule;
