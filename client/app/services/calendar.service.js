import filter from "lodash/filter";
import map from "lodash/map";
// import sortBy from "lodash/sortBy";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import isEmpty from "lodash/isEmpty";
import _each from "lodash/each";
import _remove from "lodash/remove";
import APIConfig from "../utils/config";
import moment from "moment";
import _map from "lodash/map";
import alertify from "alertifyjs/build/alertify.min";

moment.locale("ru");

let mock = {
	"types": {},
	"dates": {},
	"specialities": {},
	"list": []
};

class SCalendar {
	constructor($rootScope, $http, $q, $timeout, $state, PreloadService, AuthorizationService) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.$http = $http;
		this.$q = $q;
		this.$timeout = $timeout;
		this.$state = $state;
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;

		this.dataSource = {};
		this.dayOfWeek = moment().weekday() + 1;
		this.sortedDataSource = mock;

		this.lastSelectedDate = null;
		this.lastSelectedSpeciality = null;

		this.filter = [1, 2];
		this.currentDay = 0;

		this.lastCreatedPromise = this.$q.defer();

		this.loadDoctorPromise = this.$q.defer();

		this.selectedRequest = null;

		this.APPROVED_STATUS = {
			ACCEPT: 1,
			REMOVE: 0
		};
	}

	getCalendarSockets(socket) {
		socket.on("Request.Added", (data) => {
			console.log("[Sockets] Request added");
			this.addRequest(data.data);
		});

		socket.on("Request.Accepted", (data) => {
			console.log("[Sockets] Request accepted");
			this.confirmRequest(data.data);
		});

		socket.on("Request.Cancelled", (data) => {
			console.log("[Sockets] Request canceled");
			this.removeRequest(data.data);
		});

		socket.on("Request.Offline.Created", (data) => {
			console.log("[Sockets] Request offline create");
			this.addReserve(data.data);
		});

		socket.on("Request.Time.Changed",(data) => {
		  console.log("[Sockets] Request time changed");
		  this.changeTime(data.data);
		});
	}

	addRequest(data) {
		let doctorIndex = findIndex(this.doctorList, (doctor) => doctor.id === data.doctor.id);
		let filteredDoctorIndex = findIndex(this.filteredDoctorList, (doctor) => doctor.id === data.doctor.id);

		// New work time(s) from socket data
		map(data.busy_time, (newWorktime) => {

			// Loop in doctor work time
			map(this.doctorList[doctorIndex].worktime, (doctorWorktime) => {

				// If new work time the same with doctor work time
				if (newWorktime.worktime === doctorWorktime.id)
				// Push new work time to doctor busy time
					doctorWorktime.busytime.push(newWorktime);

				return doctorWorktime;
			});
			return newWorktime;
		});
		// If doctor exist in filtered doctor list
		if (filteredDoctorIndex !== -1) {

			// New work time(s) from socket data
			map(data.busy_time, (newWorktime) => {

				// Loop in doctor work time
				map(this.filteredDoctorList[filteredDoctorIndex].worktime, (doctorWorktime) => {

					// If new work time the same with doctor work time
					if (newWorktime.worktime === doctorWorktime.id)
					// Push new work time to doctor busy time
						doctorWorktime.busytime.push(newWorktime);

					return doctorWorktime;
				});
				return newWorktime;
			});
		}

		let music = new Audio("../../../assets/sounds/notify.mp3");
		music.play();
		window.ctrl = this;

		alertify.success(`Поступила новая заявка ${moment(data.busy_time[0].request.datetime).utc().format("DD-MM-YYYY H:mm")}`, 0, function () {
			window.ctrl.showRequestNotify(data);
		});

		this.$rootScope.$broadcast("Request.Added");
	}

	showRequestNotify(date) {
		if (this.$state.current.name !== "helper.calendar") {
			this.$state.go("helper.calendar", {date: moment(date.busy_time[0].request.datetime).utc().format("YYYY-MM-DD")}).then(() => {
			});
		}
		this.$timeout(() => {
			let doctor = find(this.doctorList, (doctor) => doctor.id === date.doctor.id);

			let time = find(doctor.worktime, (wrktime) => wrktime.id === date.busy_time[0].worktime);
			if (time.busytime[0].request.approved !== 1) {
				this.$rootScope.$broadcast("helper:request", date,"append");
			}
			else {
				this.$rootScope.$broadcast("helper:request", "","state");
			}
			this.$rootScope.$broadcast("Request.Added.Show", moment(date.busy_time[0].request.datetime).utc().format("YYYY-MM-DD"));
		}, 100);
	}

	confirmRequest(data) {
		let doctor = find(this.doctorList, (doctor) => doctor.id === data.doctor);
		let filteredDoctor = find(this.filteredDoctorList, (doctor) => doctor.id === data.doctor);

		this.$timeout(() => {
			_each(doctor.worktime, (worktimeItem) => {
				_each(worktimeItem.busytime, (request) => {
					if (request.request.id === data.request) {
						this.dataSource.types[request.request.type].oldRequestList.push(request);
						this.dataSource.types[request.request.type].newRequestList.splice(request, 1);
						request.request.approved = 1;
					}
				});
			});
			if (filteredDoctor !== null || filteredDoctor !== undefined) {
				_each(filteredDoctor.worktime, (worktimeItem) => {
					_each(worktimeItem.busytime, (request) => {
						if (request.request.id === data.request) request.request.approved = 1;
					});
				});
			}
		}, 100);
	}

	removeRequest(data) {
		let doctor = find(this.doctorList, (doctor) => doctor.id === data.doctor);
		let filteredDoctor = find(this.filteredDoctorList, (doctor) => doctor.id === data.doctor);

		this.$timeout(() => {
			if (filteredDoctor !== null || filteredDoctor !== undefined) {
				_each(filteredDoctor.worktime, (worktimeItem) => {
					_each(worktimeItem.busytime, (request) => {
						if (request.request.approved === 1) {
							_remove(this.dataSource.types[request.request.type].oldRequestList, (old_request) => {
								return old_request.id === request.request.id;
							});
						}
						else {
							if (request.request.approved === 2) {
								_remove(this.dataSource.types[request.request.type].newRequestList, (new_request) => {
									return new_request.id === request.request.id;
								});
							}
						}
						_remove(worktimeItem.busytime, (request) => {
							return request.request.id === data.request;
						});
					});
				});
			}

			_each(doctor.worktime, (worktimeItem) => {
				_remove(worktimeItem.busytime, (request) => {
					return request.request.id === data.request;
				});
			});
		}, 100);

	}

	addReserve(response) {
		let request = response.busytime[0][Object.keys(response.busytime[0])[0]].request;
		let worktime = response.busytime[0][Object.keys(response.busytime[0])[0]].worktime;
		let doctor = find(this.doctorList, (doctor) => doctor.id === response.doctor);
		let filteredDoctor = find(this.filteredDoctorList, (doctor) => doctor.id === response.doctor);

		let data = {
			approved: 1,
			id: request.id
		};
		this.dataSource.types[request.type].oldRequestList.push(data);
		this.dataSource.types[request.type].requests.push(data);
		this.$timeout(() => {

			doctor.worktime = _map(doctor.worktime, (wrktime) => {
				if (wrktime.id === worktime) {
					wrktime.busytime.push(response.busytime[0][Object.keys(response.busytime[0])[0]]);
					wrktime.currentRequest = response;
				}
				return wrktime;
			});
		}, 500);
		this.$timeout(() => {

			filteredDoctor.worktime = _map(filteredDoctor.worktime, (wrktime) => {
				if (wrktime.id === worktime) {
					wrktime.busytime.push(response.busytime[0][Object.keys(response.busytime[0])[0]]);
					wrktime.currentRequest = response;
				}
				return wrktime;
			});
		}, 500);
	}

	//Function which push request when request date changed and u need to approve it one more time
	changeTime(response){

		let doctor = find(this.doctorList, (doctor) => doctor.id === response.doctor);
		let filteredDoctor = find(this.filteredDoctorList, (doctor) => doctor.id === response.doctor);

		let i = 0;
		let j = 0;
		this.$timeout(() => {
			map(response.busytime,(time) => {
				let worktime = response.busytime[i][Object.keys(response.busytime[i])[0]].worktime;
				console.log(worktime);
				doctor.worktime = _map(doctor.worktime, (wrktime) => {
					if (wrktime.id === worktime) {
						wrktime.busytime.push(response.busytime[i][Object.keys(response.busytime[i])[0]]);
						wrktime.currentRequest = response;
						i= i+1;
					}
					return wrktime;
				});
			});

		}, 500);
		this.$timeout(() => {

			map(response.busytime,(time) => {
				let worktime = response.busytime[j][Object.keys(response.busytime[j])[0]].worktime;
				console.log(worktime);
				filteredDoctor.worktime = _map(filteredDoctor.worktime, (wrktime) => {
					if (wrktime.id === worktime) {
						wrktime.busytime.push(response.busytime[j][Object.keys(response.busytime[j])[0]]);
						wrktime.currentRequest = response;
						j =j+1;
					}
					return wrktime;
				});
			});

		}, 500);
	}

	onDataLoadPromise() {
		if (!isEmpty(this.dataSource)) {
			this.lastCreatedPromise.resolve();
		}

		return this.lastCreatedPromise.promise;
	}

	getDataSource() {
		return angular.copy(this.doctorList);
	}

	acceptRequest(worktime, doctor) {
		return this.$http.post(APIConfig.API_URL + "request/helper_confirm/", {
			request: worktime.currentRequest.request.id,
			doctor: doctor.id
		}).then((response) => {
			alertify.success("Заявка успешно подтверждена!", 2);
			return response.data;
		});
	}

	acceptRequestModal(worktime, doctor) {
		return this.$http.post(APIConfig.API_URL + "request/helper_confirm/", {
			request: worktime.request.id,
			doctor: doctor.id
		}).then((response) => {
			alertify.success("Заявка успешно подтверждена!", 2);
			return response.data;
		});
	}

	rejectRequestModal(request) {
		if (request.worktime.request.approved === 2) {
			return this.$http.post(APIConfig.API_URL + "request/helper_cancel/", request).then((response) => {
				alertify.success("Заявка успешно удалена!", 2);
				return response.data;
			});
		}

		if (request.worktime.request.approved === 1) {
			return this.$http.post(APIConfig.API_URL + "request/helper_confirm_cancel/", request).then((response) => {
				alertify.success("Заявка успешно удалена!", 2);
				return response.data;
			});
		}
	}

	rejectRequest(request) {

		if (request.worktime.currentRequest.request.approved === 2) {
			return this.$http.post(APIConfig.API_URL + "request/helper_cancel/", request).then((response) => {
				alertify.success("Заявка успешно удалена!", 2);
				return response.data;
			});
		}

		if (request.worktime.currentRequest.request.approved === 1) {
			return this.$http.post(APIConfig.API_URL + "request/helper_confirm_cancel/", request).then((response) => {
				alertify.success("Заявка успешно удалена!", 2);
				return response.data;
			});
		}
	}

	reserveRequest(worktime, doctor, date, full_name, phone, comment) {
		return this.$http.post(APIConfig.API_URL + "request/create_offline/", {
			worktime: worktime.id,
			doctor: doctor.id,
			datetime: date,
			full_name: full_name,
			phone: phone,
			comment: comment
		}).then((response) => {
			alertify.success("Бронь успешно создана!", 2);
			return response.data;
		});
	}

	cancelReservedRequest(request) {
		return this.$http.post(APIConfig.API_URL + "request/cancel_offline/", {
			request: request.id
		}).then((response) => {
			alertify.success("Бронь успешно снята!", 2);
			return response.data;
		});
	}


	resortDoctor(doctor) {
		let worktime = filter(doctor.worktime, (workTimeItem) => {
			// Текущий день рабочего времени не соответствует выбранному на сайдбаре
			if (workTimeItem.day != this.currentDay) return false;

			// Оставляем занятость по текущей дате
			workTimeItem.busytime = filter(workTimeItem.busytime, (busyTimeItem) => {
				return this.currentDate.isSame(moment.utc(busyTimeItem.request.datetime), "date");
			});

			workTimeItem._show = true;

			return true;
		});

		return doctor;
	}

	_sortDataSource(source, sortItem) {
		let filteredDoctors = null;

		switch (sortItem.type) {
		case "specialities":
			filteredDoctors = filter(source, (doctor) => {
				//Find selected speciality in specialities of every doctor
				return find(doctor.speciality, {name: sortItem.item.speciality}) ? doctor : false;
			});
			break;
		case "services":
			filteredDoctors = filter(source, (doctor) => {
				//Find selected service in available services of every doctor
				return doctor.service.indexOf(sortItem.item.id) !== -1 ? doctor : false;
			});
			break;
		case "all":
			// Show all doctors by default
			filteredDoctors = source;
		}

		// console.log('[Calendar] - Filtered doctor list - ', filteredDoctors);
		// this.filteredDoctorList = filteredDoctors;

		// this.sortingByCurrentWorktime();

		return filteredDoctors;
	}

	// sorts doctors by current Worktime
	sortingByCurrentWorktime() {
		this.filteredDoctorList.sort((a, b) => {
			return b.currentWorktime.length - a.currentWorktime.length;
		});
	}

	// Starts when we select specialities or services item then filter doctor list
	sortDataSource(sortItem) {
		// console.log(sortItem, "SORT ITEM");
		this.filteredDoctorList = this._sortDataSource(this.getDataSource(), sortItem);
		this.$rootScope.$broadcast("Refresh.CalendarList");
	}

	loadDoctor() {
		if (this.AuthorizationService.user.permission === 1) {
			this.doctorList = this.PreloadService.clinicStuffList.concat(this.PreloadService.clinicDoctorList);
		}
		else {
			this.doctorList = this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList);
		}
		this.filteredDoctorList = angular.copy(this.doctorList);


		this.filteredDoctorList = map(this.filteredDoctorList, (doctor) => {
			doctor.currentWorktime = filter(doctor.worktime, {day: this.dayOfWeek});
			doctor.currentWorktime.forEach((busy) => {

			});
			return doctor;
		});

		this.sortingByCurrentWorktime();

		this.loadDoctorPromise.resolve();
		return this.loadDoctorPromise.promise;
	}

	loadService() {
		// console.log("[Service] - loading data ...");

		const fetchUrl = `${ APIConfig.API_URL }calendar/get_services/`;

		this.$http.get(fetchUrl).then((response) => {
			// console.log(response.data);
			this.lastCreatedPromise.resolve();
		});
	}

	loadCalendarData(date) {
		this.PreloadService.getCalendarDate(date).then((response) => {
			this.dataSource = response;
			// console.log(this.dataSource, "DATA SOURCES");
			this.$rootScope.$broadcast("Refresh.DataSource");
		});
	}
}

export default SCalendar;
