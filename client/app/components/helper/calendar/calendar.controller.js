import moment from "moment";
import Types from "../../../factories/Types";

import APIConfig from "../../../utils/config";
import _each from "lodash/each";
import _remove from "lodash/remove";
import _filter from "lodash/filter";
import _map from "lodash/map";
import _find from "lodash/find";
import _sort from "lodash/sortBy";

class CalendarController {
	constructor(CalendarService, PreloadService, AuthorizationService, $scope, $rootScope, $timeout, $state) {
		"ngInject";
		this.CalendarService = CalendarService;
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;

		this.isReserve = false;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$timeout = $timeout;
		this.$state = $state;
		this.baseUrl = APIConfig.STATIC_URL;

		this.dayOfWeek = moment().weekday() + 1;
		this.currentDay = moment().format("YYYY-MM-DD");
		this.visibleDoctorList = null;
		this.reserveDatas = null;

		this.initPagination();

		this.calendarModal = null;

		//All events what will can happen with calendar
		this.preloadCompleted = $rootScope.$on("Preload.Completed", () => this.preloadInit());
		this.requestAdded = $rootScope.$on("Request.Added", () => this.onRequestAdded());
		this.refreshCalendarList = $rootScope.$on("Refresh.CalendarList", () => this.onRefreshedCalendarList());
		this.refreshDayOfWeek = $rootScope.$on("DayOfWeek.CalendarList", (event, data) => this.onRefreshedDayOfWeek(data));
		this.reserveClose = $rootScope.$on("request:reserve:close", (event, data) => this.onReserveClose(data));
		this.reserveSave = $rootScope.$on("requets:reserve:save", (event, data) => this.saveReserve(data));
		this.appendModal = $rootScope.$on("helper:request", (event, data ,state) => this.modalActive(data,state));

		this.requestAcceptModal = $scope.$on("request:accept", (event, worktime, doctor) => this.onRequestAcceptModal(worktime, doctor));
		this.requestDeclineModal = $scope.$on("request:decline", (event, worktime, doctor) => this.onRequestDecline(worktime, doctor));
		// this.requestDeclineCalendar = $scope.$on("request:decline:calendar", (event, worktime, doctor) => this.onRequestDecline(worktime, doctor));
		this.requestModal = $scope.$on("modal:change", (event, worktime, doctor) => this.declineRequest(worktime, doctor));
		this.cancel = $scope.$on("modal:cancel", (event) => this.cancelModal());

	}

	//==========================Functions when page initialized and preload finished=====================

	// Not used for now
	$onInit() {
		if (this.$rootScope.loading !== true && typeof this.$rootScope.loading !== "undefined") this.preloadInit();
		console.log(this);
	}

	// Starts when all requests downloaded from PreloadService
	preloadInit() {
		this.CalendarService.loadDoctor().then(() => {
			this.paginationTotal = Math.ceil(this.CalendarService.filteredDoctorList.length / 6);
			this.$rootScope.paginationTotal = this.paginationTotal;
			this.changePaginationPage(this.paginationStart, this.paginationEnd);
		});
		this.$timeout(() => {
			this.paginationTotal = Math.ceil(this.CalendarService.filteredDoctorList.length / 6);
			this.changePaginationPage(this.paginationStart, this.paginationEnd);
		}, 1000);
	}

	//===================================================================================================



	//=============== Calendar sorting and correcting date ==============================================
	// Shows datetime in selected worktime request
	detectRequestDate(date) {
		return moment(date).format("YYYY.MM.DD");
	}


	// Shows type in selected worktime request
	detectRequestType(type) {
		return _find(Types.request.typeList, {id: type}).name;
	}
	//===================================================================================================


	//===================All functions with doctor parsing and selecting doctor worktime=================
	// sort by worktime
	findSortElement(data) {
		data.forEach((obj) => {
			obj.counter = 0;
			obj = this.setCurrency(obj);
		});
		return data;
	}

	// counts requests in worktime
	setCurrency(obj) {
		let date = this.CalendarService.lastSelectedDate;
		obj.worktime.forEach((wrktime) => {
			let busy = [];
			wrktime.busytime.forEach((busytime) => {
				let current = moment(busytime.request.datetime).format("YYYY-MM-DD");
				if (current === date) busy.push(busytime);

			});
			if (busy.length !== 0) obj.counter += busy.length;
		});
		return obj;
	}

	//Opens doctor or stuff profile
	goDoctorProfile(doctor) {
		if(doctor.helper.id === this.AuthorizationService.user.id){
			if (doctor.type !== 2) this.$state.go("helper.personal.profile", {id: doctor.id});
			else this.$state.go("helper.personal.profileStuff", {id: doctor.id});
		}

	}

	// Shows worktime for reserve request or request info
	selectWorkTime(worktime) {
		this.reserveComment = null;
		this.selectedWorktime = this.selectedWorktime === worktime ? null : worktime;
	}

	// Using for adding class to work time cell and bind request with selected work time by selected day from sidebar.
	checkWorktime(worktime) {
		// Try to find in this worktime request related requests with current day
		let findResult = _find(worktime.busytime, (request) => {
			if (moment(request.request.datetime).format("YYYY-MM-DD") === this.currentDay || moment(request.request.datetime).utc().format("YYYY-MM-DD") === this.currentDay) {
				return request;
			} else {
				return false;
			}
		});

		if (typeof findResult === "undefined") {
			worktime.currentRequest = null;
			return "free";
		}
		if (findResult.request.status === 1) {
			worktime.currentRequest = findResult;
			return "offline";
		}
		if (findResult.request.approved === 2) {
			worktime.currentRequest = findResult;
			return "new";
		}
		if (findResult.request.approved === 1) {
			worktime.currentRequest = findResult;
			return "old";
		}
	}


	//====================================================================================================


	//=====================AFTER THIS LINE ALL EVENT WITH REQUEST=========================================
	//Approve request
	approveRequest(worktime, doctor) {
		let doctorGlobal = null;
		if (this.AuthorizationService.user.permission === 1) {
			doctorGlobal = _find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), {id: parseInt(doctor.id)});
		}
		else{
			doctorGlobal = _find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList), {id:parseInt(doctor.id)});
		}
		this.CalendarService.acceptRequest(worktime, doctor).then(() => {
			this.selectedWorktime = null;
			//Make cell on calendar approved
			_each(doctor.worktime, (worktimeItem) => {
				_each(worktimeItem.busytime, (request) => {
					if (request.request.id === worktime.currentRequest.request.id) {
						this.CalendarService.dataSource.types[request.request.type].oldRequestList.push(request);
						this.CalendarService.dataSource.types[request.request.type].newRequestList.splice(request, 1);
						request.request.approved = 1;
					}
				});
			});
			_each(doctorGlobal.worktime, (worktimeItem) => {
				_each(worktimeItem.busytime, (request) => {
					if (request.request.id === worktime.currentRequest.request.id) request.request.approved = 1;
				});
			});
		});
	}

	//Event when request accepted from modal to make the cell approved
	onRequestAcceptModal(worktime, doctor) {
		this.selectedWorktime = null;
		let doctorGlobal = null;
		if (this.AuthorizationService.user.permission === 1) {
			doctorGlobal = _find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), {id: parseInt(doctor.id)});
		}
		else{
			doctorGlobal = _find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList),{id: parseInt(doctor.id)});
		}
		let doctorL = _find(this.visibleDoctorList, (item) => item.id === doctor.id);
		this.$timeout(() => {
			_each(doctorL.worktime, (worktimeItem) => {
				_each(worktimeItem.busytime, (request) => {
					if (request.request.id === worktime.request.id) {
						this.CalendarService.dataSource.types[request.request.type].oldRequestList.push(request);
						this.CalendarService.dataSource.types[request.request.type].newRequestList.splice(request, 1);
						request.request.approved = 1;
					}
				});
			});
			_each(doctorGlobal.worktime, (worktimeItem) => {
				_each(worktimeItem.busytime, (request) => {
					if (request.request.id === worktime.request.id) request.request.approved = 1;
				});
			});
		}, 200);
	}

	//Event when request was declined to make the cell empty
	onRequestDecline(worktime, doctor) {
	  if(worktime.hasOwnProperty("currentRequest")){
	    this.worktimeNow = worktime.currentRequest;
		}
		else{
	    this.worktimeNow = worktime;

		}
		let doctorGlobal = null;
		let doctorL = _find(this.visibleDoctorList, (item) => item.id === doctor.id);
		this.selectedWorktime = null;
		if (this.AuthorizationService.user.permission === 1) {
			doctorGlobal = _find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), {id: parseInt(doctor.id)});
		}
		else{
			doctorGlobal = _find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList), {id:parseInt(doctor.id)});
		}
		_each(doctorL.worktime, (worktimeItem) => {
			_each(worktimeItem.busytime, (request) => {
				if (request.request.approved === 1) {
					_remove(this.CalendarService.dataSource.types[request.request.type].oldRequestList, (old_request) => {
						return old_request.id === request.request.id;
					});
				}
				else {
					if (request.request.approved === 2) {
						_remove(this.CalendarService.dataSource.types[request.request.type].newRequestList, (new_request) => {
							return new_request.id === request.request.id;
						});
					}
				}
			});
			_remove(worktimeItem.busytime, (request) => {
				return request.request.id === this.worktimeNow.request.id;
			});
		});
		_each(doctorGlobal.worktime, (worktimeItem) => {
			_remove(worktimeItem.busytime, (request) => {
				return request.request.id === this.worktimeNow.request.id;
			});
		});


	}

	//Event when you decline request from calendar and in modal you enter "Yes"
	// onRequestDeclineCalendar(worktime, doctor) {
	// 	this.calendarModal = null;
	// 	this.selectedWorktime = null;
	//
	// 	let doctorGlobal = null;
	//
	// 	if (this.AuthorizationService.user.permission === 1) {
	// 		doctorGlobal = _find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), {id: parseInt(doctor.id)});
	// 	}
	// 	else{
	// 		doctorGlobal = _find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList), {id:parseInt(doctor.id)});
	// 	}
	//
	// 	_each(doctor.worktime, (worktimeItem) => {
	// 		_each(worktimeItem.busytime, (request) => {
	// 			if (request.request.approved === 1) {
	// 				_remove(this.CalendarService.dataSource.types[request.request.type].oldRequestList, (old_request) => {
	// 					return old_request.id === request.request.id;
	// 				});
	// 			}
	// 			else {
	// 				if (request.request.approved === 2) {
	// 					_remove(this.CalendarService.dataSource.types[request.request.type].newRequestList, (new_request) => {
	// 						return new_request.id === request.request.id;
	// 					});
	// 				}
	// 			}
	// 		});
	// 		_remove(worktimeItem.busytime, (request) => {
	// 			return request.request.id === worktime.currentRequest.request.id;
	// 		});
	// 	});
	// 	_each(doctorGlobal.worktime, (worktimeItem) => {
	// 		_remove(worktimeItem.busytime, (request) => {
	// 			return request.request.id === worktime.currentRequest.request.id;
	// 		});
	// 	});
	// 	worktime.currentRequest = null;
	//
	// }

	// Decline request
	declineRequest(worktime, doctor) {
		this.calendarModal = "decline";
		this.declineWorktime = worktime;
		this.declineDoctor = doctor;
	}

	// open reserve window
	openReverse(worktime, doctor) {
		this.isReserve = true;
		this.reserveDatas = {
			worktime: worktime,
			doctor: doctor
		};
	}

	// saveReserve data
	saveReserve(data) {
		this.reserveRequest(this.reserveDatas.worktime, this.reserveDatas.doctor, data.full_name, data.phone, data.comment);
	}

	// Reserve request
	reserveRequest(worktime, doctor, full_name, phone, comment) {
		let doctorGlobal = null;
		if (this.AuthorizationService.user.permission === 1) {
			doctorGlobal = _find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), {id: parseInt(doctor.id)});
		}
		else{
			doctorGlobal = _find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList), {id:parseInt(doctor.id)});
		}

		this.CalendarService.reserveRequest(worktime, doctor, this.currentDay + " " + worktime.hour_start, full_name, phone, comment).then((response) => {
			// console.log(response,"REQUEST");
			let request = response.busytime[0][Object.keys(response.busytime[0])[0]].request;
			let data = {
				approved: 1,
				id: request.id
			};
			this.CalendarService.dataSource.types[request.type].oldRequestList.push(data);
			this.CalendarService.dataSource.types[request.type].requests.push(data);
			doctor.worktime = _map(doctor.worktime, (wrktime) => {
				if (wrktime.id === worktime.id) {
					wrktime.busytime.push(response.busytime[0][Object.keys(response.busytime[0])[0]]);
					wrktime.currentRequest = response;
				}
				return wrktime;
			});
			this.$timeout(() => {
				doctorGlobal.worktime = _map(doctorGlobal.worktime, (wrktime) => {
					if (wrktime.id === worktime.id) {
						wrktime.busytime.push(response.busytime[0][Object.keys(response.busytime[0])[0]]);
						wrktime.currentRequest = response;
					}
					return wrktime;
				});
			}, 100);
			this.selectedWorktime = null;
			this.onReserveClose();
		}, (error) => {
			this.$rootScope.$emit("request:error", {});
		});
	}

	//Starts when request added by sockets for refreshing current page.
	onRequestAdded() {
		let music = new Audio("../../../assets/sounds/notify.mp3");
		music.play();

		this.paginationTotal = Math.ceil(this.CalendarService.filteredDoctorList.length / this.paginationStep);
		this.$timeout(() => this.changePaginationPage(this.paginationStart, this.paginationEnd), 0);
	}

	//====================================================================================================

	//===========================All functions which has calendar=========================================
	// Starts after choosing day on calendar
	onRefreshedDayOfWeek(day) {
		this.dayOfWeek = moment(day).weekday() + 1;

		this.currentDay = day;

		this.initPagination();

		this.CalendarService.filteredDoctorList = this.findSortElement(this.CalendarService.filteredDoctorList);

		this.CalendarService.filteredDoctorList.sort(function (a, b) {
			return b.counter - a.counter;
		});
		this.paginationTotal = Math.ceil(this.CalendarService.filteredDoctorList.length / this.paginationStep);
		if (this.paginationTotal === 0) {
			this.paginationPage = 0;
		}

		this.changePaginationPage(this.paginationStart, this.paginationEnd);
	}

	// Starts after choosing speciality or service on sidebar
	onRefreshedCalendarList() {
		this.initPagination();
		this.paginationTotal = Math.ceil(this.CalendarService.filteredDoctorList.length / this.paginationStep);
		this.changePaginationPage(this.paginationStart, this.paginationEnd);
	}


	//===============================================================================================


	//================= Pagination and all  event with MODALS =====================

	//Set initial pagination settings
	initPagination() {
		this.paginationPage = 1;
		this.$rootScope.paginationPage = this.paginationPage;
		this.paginationStep = 6;
		this.paginationStart = 0;
		this.paginationEnd = this.paginationPage * this.paginationStep;
	}

	// Paginate filtered doctors to visibleDoctorList variable
	changePaginationPage(start, end) {
		this.visibleDoctorList = this.CalendarService.filteredDoctorList.slice(start, end);
		this.$timeout(() => {
			this.visibleDoctorList.forEach(
				function (item) {
					item.currentWorktime = _sort(item.currentWorktime, "hour_start");
				}
			);
		}, 0);

		this.filterWorktime();

	}

	// Starts from changePaginationPage() function for doctor list ng-repeat
	// Wrote for filtering worktime from global worktime to separate variable by dayOfWeek
	filterWorktime() {
		this.visibleDoctorList = _map(this.visibleDoctorList, (doctor) => {
			doctor.currentWorktime = _filter(doctor.worktime, {day: this.dayOfWeek});
			return doctor;
		});
	}

	// Opens page before
	slideLeft() {
		if (this.paginationPage !== 1) {
			this.paginationPage -= 1;
			this.paginationStart = this.paginationStart - this.paginationStep;
			this.paginationEnd = this.paginationEnd - this.paginationStep;
			this.$rootScope.paginationPage = this.paginationPage;
			this.changePaginationPage(this.paginationStart, this.paginationEnd);
		}
	}

	// Opens next page
	slideRight() {
		if (this.paginationPage !== this.paginationTotal) {
			this.paginationPage += 1;
			this.paginationStart = this.paginationStart + this.paginationStep;
			this.paginationEnd = this.paginationEnd + this.paginationStep;
			this.$rootScope.paginationPage = this.paginationPage;
			this.changePaginationPage(this.paginationStart, this.paginationEnd);
		}
	}


	// Make the profile data equal to date which came from server and opens calendar modal
	modalActive(data,state) {
		this.profileData = data;
		this.$timeout(() => {
			this.calendarModal = state;
		});
	}

	// Сlose the modals
	cancelModal() {
		this.calendarModal = null;
	}

	// Сlose modal window by broadcast
	onReserveClose() {
		this.isReserve = false;
	}

	//==================================================================================


	// Close state "root scope listeners"
	$onDestroy() {
		this.preloadCompleted();
		this.requestAdded();
		this.refreshCalendarList();
		this.refreshDayOfWeek();
		this.reserveSave();
		this.reserveClose();
	}
}

export default CalendarController;
