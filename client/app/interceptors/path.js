/**
 * Created by askhat on 24.05.17.
 */
// import BaseService from "../utils/extender";

class PathInterceptor {
	constructor($rootScope, $location, $state) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.$location = $location;
		this.$state = $state;

		// console.info("Path interceptor - initialized!");

		$rootScope.path = "";

		$rootScope.$watchCollection(() => {
			return $location;
		}, () => {

			let path = $location.path();

			$rootScope.path = this.findPath(path);

			$rootScope.$broadcast("App.PathChanged", $state, $location);
		});

		$rootScope.isPath = (path) => this.isPath(path);
	}

	isPath(path) {
		return this.$rootScope.path == path;
	}

	static get paths() {
		return [
			{
				pattern: /personal/,
				path: "personal"
			},
			{
				pattern: /chat/,
				path: "chat",
			},
			{
				pattern: /calendar/,
				path: "calendar"
			},
			{
				pattern: /statistic/,
				path: "statistic"
			}
		];
	}

	findPath(path) {
		for (let item of PathInterceptor.paths) {
			if (item.pattern.test(path)) {
				return item.path;
			}
		}
	}
}

export default PathInterceptor;
