import angular from "angular";
import uiRouter from "angular-ui-router";
import personalCreateStuffRatingComponent from "./personalCreateStuffRating.component";

let personalCreateStuffRatingModule = angular.module("personalCreateStuffRating", [
	uiRouter
])

	.component("personalCreateStuffRating", personalCreateStuffRatingComponent)

	.name;

export default personalCreateStuffRatingModule;
