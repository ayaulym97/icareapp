/**
 * Created by amirkaaa on 7/6/17.
 */

import _forEach from "lodash/forEach";
import _find from "lodash/find";

class adminSocketService {
	constructor(PreloadService, StatisticService, $timeout, $rootScope) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.$rootScope = $rootScope;
		this.StatisticService = StatisticService;
		this.$timeout = $timeout;
	}


	getSockets(socket) {
		// Doctor created event for increase doctor counts
		socket.on("Doctor.Created", (data) => {
			let clinic = _find(this.PreloadService.clinicsList, {id: data.data.place_id});
			this.$timeout(() => {
				switch (data.data.type) {
				case 0:
					clinic.personals.all += 1;
					clinic.personals.doctors += 1;
					break;
				case 1:
					clinic.personals.all += 1;
					clinic.personals.nurses += 1;
					break;
				}
			}, 10);
		});

		socket.on("Doctor.Deleted", (data) => {
			let clinic = _find(this.PreloadService.clinicsList, {id: data.data.place_id});
			this.$timeout(() => {
				switch (data.data.type) {
				case 0:
					clinic.personals.all -= 1;
					clinic.personals.doctors -= 1;
					break;
				case 1:
					clinic.personals.all -= 1;
					clinic.personals.nurses -= 1;
					break;
				}
			}, 10);
		});

		// Change helper status and name when helper authorized
		socket.on("Helper.Authorized", (data) => {
			_forEach(this.PreloadService.clinicsList, (clinic) => {
				_forEach(clinic.helper, (helper) => {
					if (helper.id === data.data.helper_id) {
						this.$timeout(() => {
							helper.status = 0;
							helper.full_name = data.data.helper_name;
						});
					}
				});
			});
		});

		// Helper online event
		socket.on("Person.Online", (data) => {
			_forEach(this.PreloadService.clinicsList, (clinic) => {
				_forEach(clinic.helper, (helper) => {
					if (helper.id === data.person) {
						this.$timeout(() => helper.online = data.online, 10);
					}
				});
			});
		});

		// Helper offline event
		socket.on("Person.Offline", (data) => {
			_forEach(this.PreloadService.clinicsList, (clinic) => {
				_forEach(clinic.helper, (helper) => {
					if (helper.id === data.person) {
						this.$timeout(() => helper.online = data.online, 10);
					}
				});
			});
		});

		// Clinic statistic request canceled
		socket.on("Request.Cancelled", (data) => {
			this.$rootScope.$broadcast("statistic.request.cancelled", data);
		});

		// Clinic statistic request added
		socket.on("Request.Admin.Add", (data) => {
			this.$rootScope.$broadcast("statistic:accepted:append", data);
		});

		// Clinic statistic request worked out
		socket.on("Request.Admin.WorkedOut", (data) => {
			this.$rootScope.$broadcast("statistic:workedout:append", data);
		});
	}
}

export default adminSocketService;
