import angular from "angular";
import uiRouter from "angular-ui-router";
import personalComponent from "./personal.component";

import personalProcedures from "./personalProcedures/personalProcedures";
import personalMedtests from "./personalMedtests/personalMedtests";
import personalDoctors from "./personalDoctors/personalDoctors";
import personalStuff from "./personalStuff/personalStuff";
import personalProfile from "./personalProfile/personalProfile";
import personalProfileStuff from "./personalProfileStuff/personalProfileStuff";
import personalCreate from "./personalCreate/personalCreate";
import personalCreateStuff from "./personalCreateStuff/personalCreateStuff";

import personalCreateProfile from "./personalCreate/personalCreateProfile/personalCreateProfile";
import personalCreateProcedures from "./personalCreate/personalCreateProcedures/personalCreateProcedures";
import personalCreateMedtests from "./personalCreate/personalCreateMedtests/personalCreateMedtests";
import personalCreateWorktime from "./personalCreate/personalCreateWorktime/personalCreateWorktime";
import personalCreateRating from "./personalCreate/personalCreateRating/personalCreateRating";

import personalCreateStuffProfile from "./personalCreateStuff/personalCreateStuffProfile/personalCreateStuffProfile";
import personalCreateStuffProcedures from "./personalCreateStuff/personalCreateStuffProcedures/personalCreateStuffProcedures";
import personalCreateStuffMedtests from "./personalCreateStuff/personalCreateStuffMedtests/personalCreateStuffMedtests";
import personalCreateStuffWorktime from "./personalCreateStuff/personalCreateStuffWorktime/personalCreateStuffWorktime";
import personalCreateStuffRating from "./personalCreateStuff/personalCreateStuffRating/personalCreateStuffRating";

import personalProfileProfile from "./personalProfile/personalProfileProfile/personalProfileProfile";
import personalProfileProcedures from "./personalProfile/personalProfileProcedures/personalProfileProcedures";
import personalProfileMedtests from "./personalProfile/personalProfileMedtests/personalProfileMedtests";
import personalProfileWorktime from "./personalProfile/personalProfileWorktime/personalProfileWorktime";
import personalProfileRating from "./personalProfile/personalProfileRating/personalProfileRating";

import personalProfileStuffProfile from "./personalProfileStuff/personalProfileStuffProfile/personalProfileStuffProfile";
import personalProfileStuffProcedures from "./personalProfileStuff/personalProfileStuffProcedures/personalProfileStuffProcedures";
import personalProfileStuffMedtests from "./personalProfileStuff/personalProfileStuffMedtests/personalProfileStuffMedtests";
import personalProfileStuffWorktime from "./personalProfileStuff/personalProfileStuffWorktime/personalProfileStuffWorktime";
import personalProfileStuffRating from "./personalProfileStuff/personalProfileStuffRating/personalProfileStuffRating";



import "ng-file-upload/dist/ng-file-upload.min";
import "ng-img-crop/compile/minified/ng-img-crop";
import "ng-img-crop/compile/minified/ng-img-crop.css";

let personalModule = angular.module("personal", [
	uiRouter,
	personalProcedures,
	personalMedtests,
	personalDoctors,
	personalProfile,
	personalProfileStuff,
	personalCreate,
	personalCreateStuff,

	personalCreateProfile,
	personalCreateProcedures,
	personalCreateMedtests,
	personalCreateWorktime,
	personalCreateRating,

	personalCreateStuffProfile,
	personalCreateStuffProcedures,
	personalCreateStuffMedtests,
	personalCreateStuffWorktime,
	personalCreateStuffRating,

	personalProfileProfile,
	personalProfileProcedures,
	personalProfileMedtests,
	personalProfileWorktime,
	personalProfileRating,

	personalProfileStuffProfile,
	personalProfileStuffProcedures,
	personalProfileStuffMedtests,
	personalProfileStuffWorktime,
	personalProfileStuffRating,

	"ngFileUpload",
	"ngImgCrop",
	personalStuff
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal", {
				abstract: true,
				url: "/personal",
				views: {
					"helper@helper": {
						component: "personal"
					}
				}
			});
	})

	.component("personal", personalComponent)

	.name;

export default personalModule;
