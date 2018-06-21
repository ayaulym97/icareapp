class supportSocketService {
	constructor($rootScope) {
		"ngInject";
		this.$rootScope = $rootScope;
	}

	getSockets(socket) {

		socket.on("Request.Accepted", (data) => {
			console.log("Socket: Request accepted", data);
			this.$rootScope.$broadcast("Request.Accepted", data.data.request.id);
		});

		socket.on("Request.Added", (data) => {
			console.log("Socket: Request added", data);
			this.$rootScope.$broadcast("Request.Added", data.data.request);
		});

		socket.on("Request.Support.Remind", (data) => {
			console.log("Socket: Request reminder", data);
			this.$rootScope.$broadcast("Request.Reminder", data.data.request.id);
		});

	}
}

export default supportSocketService;
