import _map from "lodash/map";
import _filter from "lodash/filter";
import moment from "moment";
import Pikaday from "pikaday/pikaday.js";
import "pikaday/css/pikaday.css";

class SidebarCalendarController {
	constructor(CalendarService, $rootScope, $timeout, $scope) {
		"ngInject";
		this.CalendarService = CalendarService;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$scope = $scope;

		this.currentDate = null;
		this.typeSelected = null;

		let ctrl = this;

		//new object of pikaday class for creating calendar
		this.picker = new Pikaday({
			field: document.getElementById("pikaday-datepicker-input"),
			firstDay: 1,
			bound: false,
			showMonthAfterYear: true,
			minDate: moment().toDate(),
			keyboardInput: false,
			container: document.getElementById("container-datepicker"),
			i18n: {
				previousMonth : "",
				nextMonth     : "",
				months        : ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
				weekdays      : ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],
				weekdaysShort : ["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"]
			},

			onSelect: function(date) {

				// Set Request for downloading selected date data
				ctrl.setSelectedDate(date);

				// For save last selected date and show when we return here
				ctrl.CalendarService.lastSelectedDate = moment(date).format("YYYY-MM-DD");

				// Broadcast to other controller refresh doctor list by selected date
				ctrl.$rootScope.$broadcast("DayOfWeek.CalendarList", moment(date).format("YYYY-MM-DD"));
			}
		});

		// Off keyboard navigation on pikaday.js (calendar sidebar date picker)
		// Yeap we know this is bad code (Костыль)
		document.removeEventListener("keydown", this.picker._onKeyChange);

		this.requestAddedShow = this.$rootScope.$on("Request.Added.Show", (event, data)=> {
			this.picker.setDate(data);
			this.setSelectedDate(data);
			this.CalendarService.lastSelectedDate = data;
			this.$rootScope.$broadcast("DayOfWeek.CalendarList", data);
		});

		// Start when preload service complete downloading
		this.preloadCompleted = this.$rootScope.$on("Preload.Completed", () => this.preloadInit());

		// Start when selected day have downloaded
		this.onRefreshTypes = this.$rootScope.$on("Refresh.DataSource", () => {
			this.refreshRequestType(ctrl.CalendarService.lastSelectedDate);

			this.typeSelected != null ? this.selectRequestType(this.typeSelected) : this.selectRequestType(this.CalendarService.dataSource.types[0]);
		});
	}



	$onInit() {
		if (this.$rootScope.loading != true && typeof this.$rootScope.loading != "undefined") {
			if (this.CalendarService.lastSelectedDate == null) this.picker.setDate(moment().format("YYYY-MM-DD"));

			if (this.CalendarService.lastSelectedDate != null) this.picker.setDate(this.CalendarService.lastSelectedDate);
		}
	}

	$onDestroy() {
		this.requestAddedShow();
		this.preloadCompleted();
		this.onRefreshTypes();
	}

	preloadInit() {
		this.picker.setDate(moment().format("YYYY-MM-DD"));
	}

	// Starts when we type something in search input
	findTypes(){
		this.$timeout(() => {
			if (this.sidebarSearch == "") {
				this.filteredData = this.selectedRequestData;
				return true;
			}

			// Filter by speciality if selected type is 'doctor on call' or 'doctor hour'
			if (this.typeSelected.id == 0 || this.typeSelected.id == 3) {
				this.filteredData = this.selectedRequestData.filter((obj) => {
					return obj.speciality.toLowerCase().indexOf(this.sidebarSearch.toLowerCase()) != -1;
				}).slice(0, 500);
				return true;
			}

			// Filter by service if selected type is 'procedures' or 'medical tests'
			if (this.typeSelected.id == 1 || this.typeSelected.id == 2) {
				this.filteredData = this.selectedRequestData.filter((obj) => {
					return obj.service.toLowerCase().indexOf(this.sidebarSearch.toLowerCase()) != -1;
				}).slice(0, 500);
				return true;
			}
		}, 0);
	}


	// Starts when we select date and filter all request to approved and not approved types
	refreshRequestType() {
		this.CalendarService.dataSource.types = _map(this.CalendarService.dataSource.types, (type) => {

			type.newRequestList = [];
			type.oldRequestList = [];
			if (type.requests.length == 0) return type;

			_map(type.requests, (request) => {
				if (request.approved == 1) type.oldRequestList.push(request);

				if (request.approved == 2) type.newRequestList.push(request);

			});

			return type;
		});
	}


	// List of request types
	// 0 - doctor hour
	// 1 - procedures
	// 2 - medical tests
	// 3 - doctor on call

	// Shows list of procedures, doctor hour, doctor on call, medical tests,
	selectRequestType(type) {
		// if this is 'doctor on call' or 'doctor hour' show specialities list
		if (type.id == 0 || type.id == 3) {
			this.selectedRequestData = this.CalendarService.dataSource.specialities;
			this.selectedRequestType = "specialities";
		} else {

			// if type is 2 filter by 'procedures' if type is 1 filter by 'med tests'
			if (type.id == 1) {
				this.selectedRequestData = _filter(this.CalendarService.dataSource.services, (service) => {
					return service.type == 1;
				});
			}
			if (type.id == 2) {
				this.selectedRequestData = _filter(this.CalendarService.dataSource.services, (service) => {
					return service.type == 0;
				});
			}
			this.selectedRequestType = "services";
		}

		// To show active class
		this.typeSelected = type;
		this.selectedRequestData.sort(function(a,b){
			return b.requests.length - a.requests.length;
		});
		this.filteredData = this.selectedRequestData;
	}


	setSelectedDate(date) {
		if (this.currentDate != moment(date).format("YYYY-MM-DD")) {
			this.currentDate = moment(date).format("YYYY-MM-DD");
			this.CalendarService.loadCalendarData(this.currentDate);
		}
	}
}

export default SidebarCalendarController;
