import moment from "moment";
import _remove from "lodash/remove";
import _isNil from "lodash/isNil";
// import _sortBy from "lodash/sortBy";


// import _find from "lodash/find";


class ChatController {
	constructor($scope, ChatService, $timeout, AuthorizationService, MessageService, $rootScope) {
		"ngInject";
		// this.name = "chat";
		this.$scope = $scope;
		this.ChatService = ChatService;
		this.AuthorizationService = AuthorizationService;
		this.$timeout = $timeout;
		this.MessageService = MessageService;
		this.$rootScope = $rootScope;
		this.messagesList = null;
		this._currentState = false;

		this.listStatistic = [
			{
				src: "/assets/images/doctorhour_black.png",
				name: "Консультация у врача",
				id: 0,
				data: {}
			},
			{
				src: "/assets/images/procedure_black.png",
				name: "Медицинские процедуры",
				id: 1,
				data: {}
			},
			{
				src: "/assets/images/medtest_black.png",
				name: "Обследования и анализы",
				id: 2,
				data: {}
			},
			{
				src: "/assets/images/doctoroncall_black.png",
				name: "Вызов врача на дом",
				id: 3,
				data: {}
			}
		];
		this.type = null;
		// Update messages list after loading
		this.$rootScope.$on("Message.ListUpdate", (event, data) => {
			if (this.ChatService.getCurrentDialog() != null && this.ChatService.getCurrentDialog().id == data.id) {
				this.messagesList = data.list;
				this.setScrollbar();
			}
		});

		// Load info about Request
		this.$rootScope.$on("RequestInfo.Update", (event, data) => {
			this.$scope.requestInfo = data;
			// console.log('REQUEST INFO', data);
		});

		// Clear chat view
		this.$rootScope.$on("Dialog.Unselected", (event, data) => {
			this._currentState = false;
			this.ChatService._currentDialog = null;
		});

		// Load messages on Dialog.Selected
		this.$rootScope.$on("Dialog.Selected", (event, data) => this.onSelected(data));

		// Init load dialogs
		ChatService.waitForCurrentDialog().then((dialog) => {
			// console.log(dialog.receiver.id, this);
			// TODO: Solve problem with null _defferedCurrentDialog
			// this.ChatService._defferedCurrentDialog = null;
			// console.log('DEFFERED IS NULL');

			if (dialog.request == null) return;
			this.request = dialog.request;
			this.findType(this.request.type);
			this.loading = false;
		});

	}

	$onDestroy(){
		this.ChatService._currentDialog = null;
	}

	// On dialog selected
	onSelected(data){
		this.requestSelected = data.request;
		// console.log("SELECTED REQUEST", data.request);
		this.findType(data.request.type);
		this.loadMessages(data);
		this._currentState = true;
		this.$rootScope.lastSelectedDialog = data;
		this.$timeout(() => {
			let dialogInput = document.getElementsByClassName("selectedDialogInput" + this.$rootScope.lastSelectedDialog.id)[0];
			dialogInput.value = "";
			dialogInput.focus();

		}, 100);
	}

	$onInit(){
		if (!_isNil(this.$rootScope.lastSelectedDialog)) this.onSelected(this.$rootScope.lastSelectedDialog);

		// console.log("Chats list", this.ChatService._chats);
	}

	// formatting Date&Time for Request Info
	formatRequestDate(request){
		// console.log(request, 'Request');
		if(this.type.id == 3){
			return moment.utc(request.datetime).add(-1,"hour").format("DD MMMM, HH:mm")+moment.utc(request.datetime).add(2,"hour").format(" - HH:mm");
		}else{
			return moment.utc(request.datetime).format("DD MMMM, HH:mm")+moment.utc(request.datetime).add(1,"hour").format(" - HH:mm");
		}
	}

	// formatMessageDateTime(datetime){
	//   return moment.utc(datetime).add(6, 'hour').format('DD.MM, HH:mm')
	// }

	// messageDate(datetime){
	//   return moment.utc(datetime).add(6, 'hour').format('DD.MM')
	// }
	//
	// messageTime(datetime){
	//   return moment.utc(datetime).add(6, 'hour').format('HH:mm')
	// }

	// getting type of request
	findType(id){
		this.listStatistic.forEach((a)=>{
			if(a.id == id) this.type = a;

		});
	}
	// On enter pressed -> send message
	handleKeyboard (event) {
		if (event.keyCode != 13) return;
		this.sendMessage();
	}

	// Emit message by socket, and display message
	sendMessage () {
		let messageText= this.messageText.trim();

		if (messageText.length == 0) return;
		let msg = {
			text: messageText,
			chat: this.ChatService.getCurrentDialog().id,
			loading: true,
			sender: this.AuthorizationService.user.id
		};
		this.messagesList.push(msg);
		this.MessageService.create(msg);

		this.messageText = "";


		this.$timeout(() => {
			let scroller = document.getElementById("messageContainer");
			scroller.scrollTop = scroller.scrollHeight;
		}, 100, false);
	}

	// Load messages by chat id
	loadMessages (data) {
		if (this._chatListener != null) this._chatListener();
		// console.log('DIALOG SELECTED', data);
		this.ChatService.setCurrentDialog(data.id);
		this.MessageService.fetch(data.id).then((data) => {
			this.messagesList = data;
			// console.log("LOADED MESSAGE", data);
			this.setScrollbar();
		});

		this._chatListener = this.$scope.$on("Message.Created:" + data.id, (event, data) => this.onMessageCreated(data));
		// console.log('LISTENER ON CHAT:', data.id);

		// this.$rootScope.$broadcast('Dialog.Selected');
	}

	// Set scrollbar to bottom
	setScrollbar(){
		this.$timeout(() => {
			let scroller = document.getElementById("messageContainer");
			if (scroller == null) return;

			scroller.scrollTop = scroller.scrollHeight;
		}, 100, false);
	}

	// Define user is sender or receiver
	explainSender(message) {
		if (message.sender == this.AuthorizationService.user.id) {
			return {
				"me": true
			};
		} else if (message.sender != this.AuthorizationService.user.id) {
			return {
				"recipient": true
			};
		}
	}

	// On message created define message sender and clear sending message from message list
	onMessageCreated (data) {
		// console.log('CLEARED SENDING');
		if (data.hasOwnProperty("delivered")) {
			this.$timeout(() => {
				let lastMsg = null;
				_remove(this.messagesList, (item) => {
					if (item.hasOwnProperty("loading") && item.hasOwnProperty("sender")) {
						if (item.text == data.text && item.chat == data.chat) {
							lastMsg = item;
							return true;
						}
					}
					return false;
				});
				data.sender = this.AuthorizationService.user.id;
			});
		}
		this.setScrollbar();
	}
}

export default ChatController;
