import angular from "angular";
import uiRouter from "angular-ui-router";
import personalDoctorsComponent from "./personalDoctors.component";

import _forEach from "lodash/forEach";
import _includes from "lodash/includes";
import _find from "lodash/find";


let personalDoctorsModule = angular.module("personalDoctors", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.personal.doctors", {
				url: "/doctors",
				views: {
					"personal": {
						component: "personalDoctors"
					}
				}
			});
	})

	.filter("doctorSearch", () => {
		return (list, search) => {
			let filteredList = [];
			let searchWord = search.toLowerCase();

			_forEach(list, (obj) => {
				if (search === "") {
					filteredList.push(obj);
				} else {

					if (_includes(obj.full_name.toLowerCase(), searchWord) && !filteredList.includes(obj)) {
						filteredList.push(obj);
					}



					_forEach(obj.speciality, (spec) => {
						if (_includes(spec.name.toLowerCase(), searchWord) && !filteredList.includes(obj)) {
							filteredList.push(obj);
							return false;
						}
					});
				}
			});
			return filteredList;
		};
	})

	.component("personalDoctors", personalDoctorsComponent)

	.name;

export default personalDoctorsModule;
