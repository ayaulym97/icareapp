import moment from "moment";
import _find from "lodash/find";

class AdminStatisticController {
	constructor($scope, StatisticService, $rootScope, $timeout, PreloadService) {
		"ngInject";
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.StatisticService = StatisticService;
		this.PreloadService = PreloadService;

		// Creating lists with static information
		this.listStatistic = [
			{
				src: "/assets/images/doctorhour_black.png",
				name: "Консультация у врача",
				id: 0,
				data: {}
			},
			{
				src: "/assets/images/procedure_black.png",
				name: "Медицинские процедуры",
				id: 1,
				data: {}
			},
			{
				src: "/assets/images/medtest_black.png",
				name: "Обследования и анализы",
				id: 2,
				data: {}
			},
			{
				src: "/assets/images/doctoroncall_black.png",
				name: "Вызов врача на дом",
				id: 3,
				data: {}
			}
		];
		this.monthsList = [
			{
				number: "01",
				name: "Январь"
			},
			{
				number: "02",
				name: "Февраль"
			},
			{
				number: "03",
				name: "Март"
			},
			{
				number: "04",
				name: "Апрель"
			},
			{
				number: "05",
				name: "Май"
			},
			{
				number: "06",
				name: "Июнь"
			},
			{
				number: "07",
				name: "Июль"
			},
			{
				number: "08",
				name: "Август"
			},
			{
				number: "09",
				name: "Сентябрь"
			},
			{
				number: "10",
				name: "Октябрь"
			},
			{
				number: "11",
				name: "Ноябрь"
			},
			{
				number: "12",
				name: "Декабрь"
			}
		];
		this.yearsList = [
			{ year: "2017"},
			{ year: "2018"},
			{ year: "2019"},
			{ year: "2020"}
		];

		// Creating CurrentMonth with information of number and name
		this.currentMonth = {
			number: moment().format("MM"),
			name: moment().format("MMMM").charAt(0).toUpperCase() + moment().format("MMMM").slice(1)
		};
		this.currentYear = {
			year: moment().format("YYYY"),
		};

		this.preloadCompleted = this.$rootScope.$on("Preload.Completed", (event, data) => this.preloadInit());

		this.REQUEST_ADDED         = this.$rootScope.$on("statistic:accepted:append", (event, data) => this.appendRequest(data));
		this.REQUEST_ADDED_WAITING = this.$rootScope.$on("statistic:workedout:append", (event, data) => this.appendRequestWorkout(data));
		this.REQUEST_CANCELLED     = this.$rootScope.$on("statistic.request.cancelled", (event, data) => this.removeRequestWorkout(data));
		this.STATISTIC_UPDATE      = this.$rootScope.$on("statistic.update", (event, data) => this.updateStatistic());
	}


	updateStatistic(){
		this.preloadInit();
	}

	$onInit() {
		if (this.$rootScope.loading !== true && typeof this.$rootScope.loading !== "undefined") {
			this.preloadInit();
		}
	}

	// After preloading, get the statisticRange.place and get the function of getClinicStatistic()
	preloadInit() {
		if (this.PreloadService.clinicsList.length > 0) {
			this.statisticRange = {
				place: this.$rootScope.selectedClinic.id,
			};

			this.getClinicStatistic();
		}
	}

	$onDestroy() {
		this.preloadCompleted();

		this.REQUEST_ADDED();
		this.REQUEST_ADDED_WAITING();
		this.REQUEST_CANCELLED();
		this.REQUEST_DELETED();
		this.STATISTIC_UPDATE();
	}


	// Selecting month in dropdown menu
	selectMonth() {
		this.getClinicStatistic();
	}
	// Selecting year in dropdown menu
	selectYear() {
		this.getClinicStatistic();
	}


	// Append request potentional count from statistic
	appendRequest(data){
		if(this.$rootScope.selectedClinic.id === data.data.place){
			let month = parseInt(this.currentMonth.number) - 1;
			let start_date = moment(new Date(this.currentYear.year, month, 1, 0, 0, 0, 0)).format("YYYY-MM-DD");
			let end_date = moment(new Date(this.currentYear.year, month + 1, 0, 0, 0, 0)).format("YYYY-MM-DD");
			if(start_date < data.data.date && end_date > data.data.date){
				this.$timeout(() => {
					let request = _find(this.listStatistic, {id:data.data.type});
					request.data.count_pre_request += 1;
				});
			}
		}
	}

	// Append request workouted count from statistic
	appendRequestWorkout(data){
		if(this.$rootScope.selectedClinic.id === data.data.place){
			this.$timeout(() => {
				let month = parseInt(this.currentMonth.number) - 1;
				let start_date = moment(new Date(this.currentYear.year, month, 1, 0, 0, 0, 0)).format("YYYY-MM-DD");
				let end_date = moment(new Date(this.currentYear.year, month + 1, 0, 0, 0, 0)).format("YYYY-MM-DD");
				if(start_date < data.data.date && end_date > data.data.date){
					let request = _find(this.listStatistic, {id:data.data.type});
					request.data.count += 1;
					request.data.money += data.data.price;
					this.totalCounter += 1;
					this.totalPrice += data.data.price;
				}
			});
		}
	}

	// Remove request workouted count from statistic
	removeRequestWorkout(data){
		if(this.$rootScope.selectedClinic.id === data.data.place){
			this.$timeout(() => {
				let month = parseInt(this.currentMonth.number) - 1;
				let start_date = moment(new Date(this.currentYear.year, month, 1, 0, 0, 0, 0)).format("YYYY-MM-DD");
				let end_date = moment(new Date(this.currentYear.year, month + 1, 0, 0, 0, 0)).format("YYYY-MM-DD");
				if(start_date < data.data.date && end_date > data.data.date){
					let request = _find(this.listStatistic, {id:data.data.type});
					request.data.count -= 1;
					request.data.money -= data.data.price;
					this.totalCounter -= 1;
					this.totalPrice -= data.data.price;
				}
			});
		}
	}


	// Returns month start and end range
	// month in moment is 0 based, so 0 is actually january, subtract 1 to compensate
	// array is 'year', 'month', 'day', etc
	// Clone the value before .endOf()
	// make sure to call toDate() for plain JavaScript date type
	getMonthDateRange(year, month) {
		month = month - 1;
		let startDate = moment.utc([year, month]);
		let endDate = moment.utc(startDate).endOf("month");
		return { start: startDate.toDate(), end: endDate.toDate() };
	}

	// Changes statistic by range date, sends https query
	getClinicStatistic() {
		this.dateRange = this.getMonthDateRange(this.currentYear.year, this.currentMonth.number);

		this.statisticRange.start_date = this.dateRange.start;
		this.statisticRange.end_date = this.dateRange.end;

		this.StatisticService.clinicStatistic(this.statisticRange).then((response) => {
			this.clinicStatistics = response;
			this.listStatistic[0].data = response.doctor_hour;
			this.listStatistic[1].data = response.procedure;
			this.listStatistic[2].data = response.med_test;
			this.listStatistic[3].data = response.doctor_on_call;
			this.totalCounter = response.total.total;
			this.totalPrice = response.total.price;
		});
	}

}

export default AdminStatisticController;
