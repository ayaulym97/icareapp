import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileRatingComponent from "./personalProfileRating.component";

let personalProfileRatingModule = angular.module("personalProfileRating", [
	uiRouter
])

	.component("personalProfileRating", personalProfileRatingComponent)

	.name;

export default personalProfileRatingModule;
