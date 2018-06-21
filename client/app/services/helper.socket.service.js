/**
 * Created by amirkaaa on 7/6/17.
 */
import _remove from "lodash/remove";
import _find from "lodash/find";


class helperSocketService {
	constructor(PreloadService, $timeout, HelperService, AuthorizationService, CalendarService, $rootScope, MessageService) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.CalendarService = CalendarService;
		this.$timeout = $timeout;
		this.HelperService = HelperService;
		this.AuthorizationService = AuthorizationService;
		this.$rootScope = $rootScope;
		this.MessageService = MessageService;
	}

	getSockets(socket) {
		this.CalendarService.getCalendarSockets(socket);
		this.MessageService.getSockets(socket);

		// Add new doctor to global doctor list
		socket.on("Doctor.Created", (data) => {
			this.$timeout(() => {
				this.HelperService.getDoctor(data.data.doctor).then((response) => {
					if (response.type === 2) {
						this.PreloadService.helperStuffList.push(response);
						this.PreloadService.clinicStuffList.push(response);
					}
					else {
						this.PreloadService.helperDoctorList.push(response);
						this.PreloadService.clinicDoctorList.push(response);
					}

				});
			}, 1500);

		});

		// Update doctor in global doctor list
		socket.on("Doctor.Updated", (data) => {
			this.$timeout(() => {
				this.HelperService.updateDoctor(data.data.doctor).then((response) => {
					if (response.type === 2) {
						_remove(this.PreloadService.clinicStuffList, (qual) => qual.id === response.id);
						_remove(this.PreloadService.helperStuffList, (qual) => qual.id === response.id);
						this.PreloadService.helperStuffList.push(response);
						this.PreloadService.clinicStuffList.push(response);
						this.$rootScope.$broadcast("helper:update:list");
						this.$rootScope.$broadcast("Doctor:helper:updated");
					}
					else {
						_remove(this.PreloadService.clinicDoctorList, (qual) => qual.id === response.id);
						_remove(this.PreloadService.helperDoctorList, (qual) => qual.id === response.id);
						this.PreloadService.helperDoctorList.push(response);
						this.PreloadService.clinicDoctorList.push(response);
						this.$rootScope.$broadcast("helper:update:list");
						this.$rootScope.$broadcast("Doctor:helper:updated");
					}

				});
			}, 1200);

		});

		// Helper deleted event for auto logout
		socket.on("Helper.Deleted", (data) => {

			this.$timeout(() => {
				this.AuthorizationService.logout(true);
			}, 1);
		});


		// Add service from global service list
		socket.on("Service.Added", (data) => {
			this.$timeout(() => {
				if (data.data.service.type === 0) this.PreloadService.clinicProcedures.push(data.data);

				if (data.data.service.type === 1) this.PreloadService.clinicMedtests.push(data.data);

			});
		});


		// Remove service from global service list
		socket.on("Service.Deleted", (data) => {
			this.$timeout(() => {
				_remove(this.PreloadService.clinicProcedures, (procedure) => procedure.id === data.data.id);
				_remove(this.PreloadService.clinicMedtests, (medtest) => medtest.id === data.data.id);
			});

		});


		// Update service in global service list
		socket.on("Service.Changed", (data) => {
			this.$timeout(() => {
				_find(this.PreloadService.clinicProcedures, (procedure) => {
					if (procedure.id === data.data.id) procedure.price = data.data.price;

				});
				_find(this.PreloadService.clinicMedtests, (medtest) => {
					if (medtest.id === data.data.id) medtest.price = data.data.price;

				});

			});
		});


		// Add new doctor to current helper when doctor have transferred
		socket.on("Doctor.Helper.Changed", (data) => {
		});

		//Update worktime of doctor when worktime or some doctor changed
		socket.on("WorkTime.Updated", (data) => {
			_find(this.PreloadService.clinicDoctorList.concat(this.PreloadService.clinicStuffList), (doctor) => {
				if (doctor.id === data.data.doctor) doctor.worktime = data.data.worktime;

			});
			_find(this.PreloadService.helperDoctorList.concat(this.PreloadService.helperStuffList), (doctor) => {
				if (doctor.id === data.data.doctor) doctor.worktime = data.data.worktime;

			});
			this.$rootScope.$broadcast("Doctor:helper:updated");
		});

		// Delete doctor event
		socket.on("Doctor.Deleted", (data) => {
			if (data.data.type === 2) {
				_remove(this.PreloadService.helperStuffList, (doctor) => doctor.id === data.data.doctor);
				_remove(this.PreloadService.clinicStuffList, (doctor) => doctor.id === data.data.doctor);
			}
			else {
				_remove(this.PreloadService.helperDoctorList, (doctor) => doctor.id === data.data.doctor);
				_remove(this.PreloadService.clinicDoctorList, (doctor) => doctor.id === data.data.doctor);
			}
			this.$rootScope.$broadcast("helper:update:list");


		});
	}
}

export default helperSocketService;
