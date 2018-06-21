import angular from "angular";
import NgStorage from "ngstorage";
import ngResource from "angular-resource";


let factoriesModule = angular.module("AppFactories", [
	NgStorage.name,
	ngResource
])

	.config(($resourceProvider) => {
		"ngInject";

		$resourceProvider.defaults.stripTrailingSlashes = false;
	})

	.name;

export default factoriesModule;
