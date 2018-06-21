// import moment from "moment";

class HelperStatisticsSidebarController {
	constructor($scope, $rootScope, PreloadService) {
		"ngInject";
		this.$scope = $scope;
		this.$rootScope= $rootScope;
		this.PreloadService = PreloadService;



		this.placeListener = $scope.$on("Place.Loaded", () => {
			if (this.place == null) {
				this.init();
			}
		});

		if (this.place != null) {
			if (this.place.$resolved) {
				this.init();
			} else {
				this.place.$promise.then(() => {
					this.init();
				});
			}
		}
	}


	init () {
		// this.place = this.PlaceService.getLastPlace();

		// console.warn(this.place);
	}

	$onDestroy () {
		if (this.placeListener != null) this.placeListener();
	}

	openStatistic(data){
	  this.$rootScope.$broadcast("modal:change", data);
	}

}

export default HelperStatisticsSidebarController;
