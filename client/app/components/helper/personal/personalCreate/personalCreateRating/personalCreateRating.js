import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateRatingComponent from "./personalCreateRating.component";

let personalCreateRatingModule = angular.module("personalCreateRating", [
	uiRouter
])

	.component("personalCreateRating", personalCreateRatingComponent)

	.name;

export default personalCreateRatingModule;
