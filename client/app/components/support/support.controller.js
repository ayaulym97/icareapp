import APIConfig from "../../utils/config";
import moment from "moment";
import _includes from "lodash/includes";
import _remove from "lodash/remove";
import _indexOf from "lodash/indexOf";

class SupportController {
	constructor($http, $rootScope, RealtimeService, $timeout) {
		"ngInject";
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.ApiConfig = APIConfig;
		this.$timeout = $timeout;
		this.RealtimeService = RealtimeService;

		// Temporary variables
		this.approvedRequestsCounter = 0;
		this.requestsInQueueCounter = 0;
		this.currentRequest = null;
		this.currentRequestDate = null;
		this.currentRequestTime = null;
		this.requestsList = [];
		this.postponedRequests = {};
		this.wasPostponed = false;

		// Static information
		this.types = {
			0: "КОНСУЛЬТАЦИЯ У ВРАЧА",
			1: "ПРОЦЕДУРЫ",
			2: "АНАЛИЗЫ",
			// 3: "ВЫЗОВ ВРАЧА НА ДОМ"
		};


		this.dateToday = moment().format("MMMM DD, YYYY  dddd");

		this.$rootScope.$on("Request.Added", (event, id) => {
			this.requestsList.push(id);
			this.moreInQueue();
			this.getRequestInfo(this.requestsList[0]);
		});

		this.$rootScope.$on("Request.Accepted", (event, id) => {
			this.removeRequest(id, false);
		});

		this.$rootScope.$on("Request.Reminder", (event, id) => {
			// Checking whether we have this postponed request in our queue or not
			// (it may have been approved by the time it came from backend again)
			if (_includes(this.requestsList, id) && _indexOf(this.requestsList, id) > 1) {
				this.$timeout(() => {
					// Inserting incoming request into requests' array to be the second one after current request
					this.removeRequest(id, true);
					this.requestsList.splice(1, 0, id);
				});
			}
		});
	}

	$onInit() {
		// This is in order to connect Socket.IO
		this.RealtimeService.connect();

		this.$http.get(this.ApiConfig.API_URL + "request/get_support_requests/").then((response) => {
			this.requestsList = response.data.request;
			this.requestsInQueueCounter = response.data.in_queue_count;
			this.approvedRequestsCounter = response.data.worked_out_count;
			this.getRequestInfo(this.requestsList[0]);
		});
	}


	getRequestInfo(id) {
		return this.$http.get(this.ApiConfig.API_URL + "request/get_support_request/?request=" + id).then((response) => {
			this.currentRequest = response.data;
			this.currentRequestDate = moment.utc(this.currentRequest.datetime).format("D MMMM");
			let step = (response.data.type === 2) ? 15 : 30;
			this.currentRequestTime = moment.utc(this.currentRequest.datetime).format("hh:mm") + " - " + moment.utc(this.currentRequest.datetime).add(step, "minutes").format("hh:mm");
			this.currentRequest.response.helper.phone = this.formatPhone(this.currentRequest.response.helper.phone);
			this.currentRequest.owner.phone = this.formatPhone(this.currentRequest.owner.phone);

			// For "Analyses"
			if(this.currentRequest.type === 2) {
				this.currentRequest.specialities = this.currentRequest.services;
			}

			// Checking whether current request has already been postponed
			this.wasPostponed = id in this.postponedRequests;

		});
	}

	formatPhone(phone) {
		if (phone !== null) {
			return "8(" + phone.substring(0, 3) + ")" + phone.substring(3, 6) + "-" + phone.substring(6, 8) + "-" + phone.substring(8);
		}
		return null;
	}

	removeRequest(id, postponed) {
		if (!postponed) {
			this.lessInQueue();
			if (id in this.postponedRequests) {
				delete this.postponedRequests[id];
			}
		}
		_remove(this.requestsList, function (n) {
			return id === n;
		});


	}

	approveRequest(id) {
		this.removeRequest(id);
		if (this.requestsInQueueCounter !== 0) {
			this.getRequestInfo(this.requestsList[0]);
		}
		this.moreApproved();
		return this.$http.post(this.ApiConfig.API_URL + "request/support_accept/", {request: id});
	}

	postponeRequest(id) {
		// Placing postponed request at the end of the queue
		this.removeRequest(id, true);
		this.requestsList.push(id);


		console.log("POSTPONED", this.postponedRequests);

		// Replacing current request
		if (this.requestsInQueueCounter !== 0) {
			this.getRequestInfo(this.requestsList[0]);
		}

		if (id in this.postponedRequests) {
			this.postponedRequests[id] += 1;
		} else {
			this.postponedRequests[id] = 1;
		}

		return this.$http.post(this.ApiConfig.API_URL + "request/support_decline/", {request: id});
	}

	sendMail(id) {
		return this.$http.post(this.ApiConfig.API_URL + "request/support_send_accept/", {request: id});
	}

	moreInQueue() {
		this.$timeout(() => {
			this.requestsInQueueCounter += 1;
		}, 100);
	}

	lessInQueue() {
		this.$timeout(() => {
			this.requestsInQueueCounter -= 1;
		}, 100);
	}

	moreApproved() {
		this.$timeout(() => {
			this.approvedRequestsCounter += 1;
		}, 100);
	}
}

export default SupportController;
