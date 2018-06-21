import angular from "angular";
import authorization from "./authorization/authorization";
import admin from "./admin/admin";
import helper from "./helper/helper";
import support from "./support/support";


let componentModule = angular.module("app.components", [
	authorization,
	admin,
	helper,
	support
])

	.name;

export default componentModule;
