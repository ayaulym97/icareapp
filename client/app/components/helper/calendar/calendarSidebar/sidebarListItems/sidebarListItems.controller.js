import moment from "moment";
import _keys from "lodash/keys";
import _filter from "lodash/filter";

moment.locale("ru");


class SidebarListItemsController {
	constructor($rootScope, CalendarService, $timeout, $scope) {
		"ngInject";
		this.CalendarService = CalendarService;
		this.$timeout = $timeout;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this._keys = _keys;
	}

	// Count approved and new requests by approved type
	countRequest(request, approved){
		let counter = _filter(request, function(o) {
			return o.approved == approved;
		});
		return counter.length;
	}
	$onInit(){

	}

	// Select event
	selectItem (item) {

		// if selected item the same turn off filtering.
		if (item == this.CalendarService.lastSelectedSpeciality) {
			this.CalendarService.lastSelectedSpeciality = null;
			this.CalendarService.sortDataSource({
				type: "all",
				item: this.CalendarService.lastSelectedSpeciality
			});
			return;
		}
		// filter list by selected item
		this.CalendarService.lastSelectedSpeciality = item;
		this.CalendarService.sortDataSource({
			type: this.type,
			item: this.CalendarService.lastSelectedSpeciality
		});

	}

	// Adding active class
	isActive (item) {
		return this.CalendarService.lastSelectedSpeciality == item;
	}

}

export default SidebarListItemsController;
