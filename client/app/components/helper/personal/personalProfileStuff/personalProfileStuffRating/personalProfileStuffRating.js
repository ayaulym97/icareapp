import angular from "angular";
import uiRouter from "angular-ui-router";
import personalProfileStuffRatingComponent from "./personalProfileStuffRating.component";

let personalProfileStuffRatingModule = angular.module("personalProfileStuffRating", [
	uiRouter
])

	.component("personalProfileStuffRating", personalProfileStuffRatingComponent)

	.name;

export default personalProfileStuffRatingModule;
