/**
 * Created by amirkaaa on 7/6/17.
 */
import _remove from "lodash/remove";
import _find from "lodash/find";
import _forEach from "lodash/forEach";


class superhelperSocketService {
	constructor(PreloadService, CalendarService, $timeout, MessageService, HelperService, AuthorizationService, $rootScope) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.CalendarService = CalendarService;
		this.$timeout = $timeout;
		this.HelperService = HelperService;
		this.AuthorizationService = AuthorizationService;
		this.$rootScope = $rootScope;
		this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => helper.id === this.profileData.helper.id);
		this.MessageService = MessageService;
	}

	getSockets(socket) {
		this.CalendarService.getCalendarSockets(socket);
		this.MessageService.getSockets(socket);


		socket.on("Doctor.Created", () => {
			console.log("[Sockets] Doctor created");
		});

		socket.on("Doctor.Updated", (data) => {
			console.log("[Sockets] Doctor updated superhelper");
			this.$timeout(() => {
				this.HelperService.updateDoctor(data.data.doctor).then((response) => {
					if (response.type === 2) {
						_remove(this.PreloadService.clinicStuffList, (qual) => qual.id === response.id);
						this.PreloadService.clinicStuffList.push(response);

					}
					else {
						_remove(this.PreloadService.clinicDoctorList, (qual) => qual.id === response.id);
						this.PreloadService.clinicDoctorList.push(response);

					}
					this.$rootScope.$broadcast("Superhelper:update:list");
					this.$rootScope.$broadcast("Doctor:helper:updated");
				});
			}, 800);
		});

		socket.on("Helper.Deleted", (data) => {
			// console.log("[Sockets] Helper deleted");
			_remove(this.PreloadService.clinicsHelperList, (helper) => {
				return helper.id === data.data.helper;
			});

			_forEach(this.PreloadService.clinicDoctorList, (doctor) => {
				if (doctor.helper.id === data.data.helper) {
					this.$timeout(() => {
						this.HelperService.updateDoctor(doctor.id).then((response) => {
							_remove(this.PreloadService.clinicDoctorList, (qual) => qual.id === response.id);
							this.PreloadService.clinicDoctorList.push(response);
							this.$rootScope.$broadcast("Super:helper:delete");
						});
					}, 500);
				}
			});

			_forEach(this.PreloadService.clinicStuffList, (stuff) => {
				if (stuff.helper.id === data.data.helper) {
					this.$timeout(() => {
						this.HelperService.updateDoctor(doctor.id).then((response) => {
							_remove(this.PreloadService.clinicStuffList, (qual) => qual.id === response.id);
							this.PreloadService.clinicStuffList.push(response);
							this.$rootScope.$broadcast("Super:helper:delete");
						});
					}, 500);
				}
			});

		});

		socket.on("Helper.Authorized", (data) => {
			// console.log("[Sockets] Helper authorized");
			//[Socket] for helper add to helperClinicList
			this.HelperService.updateHelperList(data.data.helper_id).then((response) => {
				this.PreloadService.clinicsHelperList.push(response.data);
				this.$rootScope.$broadcast("Update:helper:list");
			});

		});

		socket.on("PlaceService.Updated", (data) => {
			console.log("[Sockets] Service updated");
		});

		socket.on("WorkTime.Updated", (data) => {
			// console.log("[Sockets] WorkTime updated");
			_find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), (doctor) => {
				if (doctor.id === data.data.doctor) doctor.worktime = data.data.worktime;

			});
			_find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList), (doctor) => {
				if (doctor.id === data.data.doctor) doctor.worktime = data.data.worktime;

			});
			this.$rootScope.$broadcast("Doctor:helper:updated");
		});

		socket.on("Helper.Deleted", (data) => {
		});

	}
}

export default superhelperSocketService;
