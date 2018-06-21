import angular from "angular";
import AuthInterceptor from "./auth";

let servicesModule = angular.module("app.interceptors", [])

	.factory("AuthInterceptor", AuthInterceptor)

	.config(($httpProvider) => {
		"ngInject";
		$httpProvider.interceptors.push("AuthInterceptor");
	})

	.name;

export default servicesModule;
