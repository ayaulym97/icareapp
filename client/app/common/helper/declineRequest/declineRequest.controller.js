import ApiConfig from "../../../utils/config";
import StaticTypes from "../../../utils/staticTypes";
import moment from "moment";
import _filter from "lodash/filter";
import _sort from "lodash/sortBy";

import Pikaday from "pikaday/pikaday.js";
import "pikaday/css/pikaday.css";


class DeclineRequestController {
	constructor($rootScope, CalendarService, $scope, $timeout) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.CalendarService = CalendarService;
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.ApiConfig = ApiConfig;
		this.moment = moment;
		this.requestTypes = StaticTypes.REQUEST_TYPES;

		this.btnState = false;
		this.stateReason = false;
		this.stateDropdown = false;


		this.currentReason = {
			id: 8,
			text: "Выберите причину отказа",
			description: null
		};
		this.currentWorktime =null;


		let field = window.document.getElementById("datepicker");
		let ctrl = this;
		let picker = new Pikaday({
			// Make a settings
			field: field,
			format: "DD MMMM",
			trigger: window.document.getElementById("datepicker-trigger"),
			minDate: moment().toDate(),
			firstDay: 1,
			keyboardInput: false,
			i18n: {
				previousMonth: "",
				nextMonth: "",
				months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
				weekdays: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
				weekdaysShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
			},
			onSelect: function (date) {
				ctrl.selectedDate = moment(date).format("YYYY-MM-DD");
				ctrl.$timeout(() => {
					ctrl.selectedTime = {
						start: "Время",
						end: null,
						value: null
					};
				});

				ctrl.dayOfWeek = moment(ctrl.selectedDate).weekday() + 1;
				ctrl.currentWorktime = _filter(ctrl.doctor.worktime, {day: ctrl.dayOfWeek});
				ctrl.currentWorktime = _sort(ctrl.currentWorktime, "hour_start");
				ctrl.selectedDateError = false;
			}
		});

		this.selectedTime = {
			start: "Время",
			end: null,
			value: null
		};

		this.reasonList = [
			{
				id: 0,
				text: "Пациент не отвечает"
			},
			{
				id: 1,
				text: "Отказ без объснений"
			},
			{
				id: 2,
				text: "Поменять на другое время"
			},
			{
				id: 3,
				text: "Другие причины отказа"
			},
		];


	}
	$onInit(){
		console.log(this);
		if(this.worktime.hasOwnProperty("currentRequest")){
			this.worktimeNow = this.worktime.busytime[0];
		}
		else{
			this.worktimeNow = this.worktime;
		}
	}

	showReasons() {
		this.stateReason = !this.stateReason;
	}

	showWorktime() {
		this.stateDropdown = !this.stateDropdown;
	}

	selectReason(data) {
		this.currentReason.text = data.text;
		this.currentReason.id = data.id;
		this.reasonError = false;
		this.descriptionError = false;

	}

	selectTime(start, end, id) {
		this.selectedTime.start = start;
		this.selectedTime.end = end;
		this.selectedTime.value = start;
		this.selectedTime.id = id;
		this.selectedTimeError = false;
	}

	//ON click the button "yes" delete request and close the modal
	deleteRequest() {
		if(this.currentReason.id === 2 &&(this.selectedDate === undefined || this.selectedTime.value === null)){
			this.selectedDateError = this.selectedDate === undefined;
			this.selectedTimeError = this.selectedTime.value === null;
			this.descriptionError = this.currentReason.description === null;
			console.log("3");

			return false;
		}
		if((this.currentReason.description === null || this.currentReason.id === 8) && this.currentReason.id !== 1){
			this.descriptionError = this.currentReason.description === null;
			this.reasonError = this.currentReason.id === 8;
			console.log("2");
			console.log(this.reasonError,this.descriptionError);

			return false;
		}



		let request = null;

		console.log("4");

		if(this.currentReason.id === 2){
			this.splitedSelectedTime = this.selectedTime.value.toString().split(":");
			this.hours = this.splitedSelectedTime[0];
			this.minutes = this.splitedSelectedTime[1];
			request ={
				worktime:this.worktime,
				doctor: this.doctor.id,
				reason: this.currentReason.id,
				request:  this.worktimeNow.request.id,
				description : this.currentReason.description,
				datetime:moment(this.selectedDate).add(this.hours, "h").add(this.minutes, "m").format("YYYY-MM-DD HH:mm")
			};
		}
		// if(this.currentReason.id ===1){
		//   request ={
		//     worktime:this.worktime,
		//     doctor: this.doctor.id,
		//     reason: this.currentReason.id,
		//     request:  this.worktimeNow.request.id,
		//     datetime:moment(this.selectedDate).add(this.hours, "h").add(this.minutes, "m").format("YYYY-MM-DD HH:mm")
		//   }
		// }
		if(this.currentReason.id === 1){
			request ={
				worktime:this.worktime,
				doctor: this.doctor.id,
				reason: this.currentReason.id,
				request:  this.worktimeNow.request.id,
			};
		}
		else{
			request ={
				worktime:this.worktime,
				doctor: this.doctor.id,
				reason: this.currentReason.id,
				request:  this.worktimeNow.request.id,
				description : this.currentReason.description,
			};

		}

		this.btnState = !this.btnState;
		if(this.worktime.hasOwnProperty("currentRequest")){
			this.CalendarService.rejectRequest(request).then(() => {
				this.$scope.$emit("request:decline", this.worktime, this.doctor);
				this.cancel();

			});
		}
		else{
			this.CalendarService.rejectRequestModal(request).then(() => {
				this.$scope.$emit("request:decline", this.worktime, this.doctor);
				this.cancel();
			});
		}

	}

	//Close the modal
	cancel() {
		this.$scope.$emit("modal:cancel");
	}
}

export default DeclineRequestController;
