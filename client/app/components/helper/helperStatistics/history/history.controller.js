import Fuse from "fuse.js/dist/fuse";
import moment from "moment";

class HistoryController {
	constructor(StatisticService, AuthorizationService,$timeout) {
		"ngInject";
		this.StatisticService = StatisticService;
		// this.name = "history";
		// this.helper = null;
		this.$timeout = $timeout;

		this.statistic = {
			id: AuthorizationService.user.id
		};
		this.moment = moment;
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
		this.requestList = [];
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
		this.change_date();
	}

	giveCorrect(date,type){
		let data_start = moment.utc(date);
		let data_end = null;
		if(type === 0 || type === 1){
			data_end = moment.utc(date).add("seconds", 1800);
		}
		if(type === 3){
			data_start = moment.utc(date).add("seconds", -1800);
			data_end = moment.utc(date).add("seconds", 3600);
		}
		if(type === 2){
			data_end = moment.utc(date).add("seconds", 900);
		}
		return data_start.format("HH:mm") + " - " + data_end.format("HH:mm");
	}

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

	list(data){
		this.statistic.date_start = data.start_date;
		this.statistic.date_end = data.end_date;
		this.StatisticService.requestStatistic(this.statistic).then((response)=>{
			this.helper = response.helper;
			this.requestList = response.requests;
			this.matchedRequest = this.requestList;
		});
	}

	searchHistory(searchInput){
		let options = {

			// shouldSort: true,
			threshold: 0.5,
			location: 0,
			distance: 500,
			maxPatternLength: 64,
			minMatchCharLength: 1,
			keys: ["response.full_name","owner.full_name","owner.username"]
		};

		let fuse = new Fuse(this.requestList, options);

		this.$timeout(() => {

			if(searchInput == ""){
				this.matchedRequest = this.requestList;
			}else{
				this.matchedRequest = fuse.search(searchInput);
			}
		}, 0);
	}

}

export default HistoryController;
