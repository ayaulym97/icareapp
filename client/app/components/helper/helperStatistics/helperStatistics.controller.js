import moment from "moment";
// import _find from "lodash/find";

moment.locale("ru");

class HelperStatisticsController{
	constructor($scope, StatisticService, $rootScope, $timeout, AuthorizationService,$state) {
		"ngInject";

		this.$scope = $scope;
		this.StatisticService = StatisticService;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.AuthorizationService = AuthorizationService;
		this.$state = $state;
		//get the id of user
		this.statistic = {
			id: AuthorizationService.user.id
		};
		this.modal = "view";
		//the lists
		this.listStatistic = [
			{
				src: "/assets/images/doctorhour_black.png",
				name: "Консультация у врача",
				id: 0,
				accepted: 0,
				cancelled: 0
			},
			{
				src: "/assets/images/procedure_black.png",
				name: "Медицинские процедуры",
				id: 1,
				accepted: 0,
				cancelled: 0
			},
			{
				src: "/assets/images/medtest_black.png",
				name: "Обследования и анализы",
				id: 2,
				accepted: 0,
				cancelled: 0
			},
			{
				src: "/assets/images/doctoroncall_black.png",
				name: "Вызов врача на дом",
				id: 3,
				accepted: 0,
				cancelled: 0
			}
		];
		this.months = [
			{
				id: 1,
				name: "Январь"
			},
			{
				id: 2,
				name: "Февраль"
			},
			{
				id: 3,
				name: "Март"
			},
			{
				id: 4,
				name: "Апрель"
			},
			{
				id: 5,
				name: "Май"
			},
			{
				id: 6,
				name: "Июнь"
			},
			{
				id: 7,
				name: "Июль"
			},
			{
				id: 8,
				name: "Август"
			},
			{
				id: 9,
				name: "Сентябрь"
			},
			{
				id: 10,
				name: "Октябрь"
			},
			{
				id: 11,
				name: "Ноябрь"
			},
			{
				id: 12,
				name: "Декабрь"
			}
		];
		this.years = [
			2017,
			2018,
			2019,
			2020
		];

		//creating the current moment_month and year
		let moment_month = moment().format("M");
		let year = moment().format("YYYY");

		//returns the id of currents month
		this.currentMonth = this.months.filter(function(obj){
			return obj.id == parseInt(moment_month);
		})[0];
		this.total_counter = 0;
		this.currentYear = parseInt(year);

		//go to the function
		this.change_date(this.currentMonth);
		this.CHANGE_MODAL = this.$rootScope.$on("modal:change", (event, data)=> this.changeModal(data));
	}

	$onInit() {
		this.$timeout(() => {
			this.$rootScope.$broadcast("datepicker:month");
		});
	}

	changeModal(){
	  this.$state.go("helper.statistics.history");
	}

	// calculate accepted and cancelled counts of type
	calc_type(type){
		if(type == 0) return this.stats.particular.doctor_hour;

		if(type == 1) return this.stats.particular.procedure;

		if(type == 2) return this.stats.particular.med_test;

		if(type == 3) return this.stats.particular.doctor_on_call;

	}

	// ng-change stays in select boxes. changes date for current selected date//
	//creating variable month that returning the currentMonth.id-1 and with it
	//creats the start_date and end_date, then add it all to data and by using
	//the function list, go to list(data)
	change_date(){
		let month = this.currentMonth.id - 1;
		let start_date = moment(new Date(this.currentYear, month, 1, 0, 0, 0, 0)).format("YYYY-MM-DD") + " 00:00:00";
		let end_date = moment(new Date(this.currentYear, month + 1, 0, 0, 0, 0)).format("YYYY-MM-DD")+ " 23:59:59";
		let data = {
			start_date: start_date,
			end_date: end_date
		};
		this.list(data);
	}

	//creating the local variables by using the data from previous
	// function: statistic.start_date and statistic.end_date then
	// sends http query to server, with params date range. and gets
	// counts accepted and cancelled of current date and total_counter
	list(data) {
		this.statistic.start_date = data.start_date;
		this.statistic.end_date = data.end_date;

		this.StatisticService.helperStatistic(this.statistic).then((data) => {
			this.stats = data;
			let ctrl = this;
			let total = 0;
			this.listStatistic.forEach(function(obj){
				obj.accepted = ctrl.calc_type(obj.id).accepted;
				obj.cancelled = ctrl.calc_type(obj.id).cancelled;
				total += obj.accepted;
				total += obj.cancelled;
			}
			);
			this.total_counter = total;
		});
	}

}

export default HelperStatisticsController;
