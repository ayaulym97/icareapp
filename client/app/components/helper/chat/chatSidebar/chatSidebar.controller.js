import _isNil from "lodash/isNil";
import moment from "moment";
import Alertifier from "../../../../services/chat.service";

class ChatSidebarController {
	constructor ($stateParams, ChatService, MessageService, $timeout, AuthorizationService, $scope, $rootScope) {
		"ngInject";
		this.$stateParams = $stateParams;
		this.ChatService = ChatService;
		this.MessageService = MessageService;
		this.$timeout = $timeout;
		this.AuthorizationService = AuthorizationService;
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.name = "chatSidebar";
		this.alerts = Alertifier.chats;

		this.chats = [];

		// Update chats list
		// this.$scope.$on('Dialog.ListUpdate', (event, data) => this.updateChats(data));
	}

	// Update chats list
	updateChats(chats){
		this.chats = chats;
	}

	$onInit () {
		this.init();
	}

	$onDestroy () {
		if (!_isNil(this._chatListener)) this._chatListener();
	}

	init () {
		this.loadDialogs();
	}

	// Get chat time in format
	chatTime(dialog){
		return moment(dialog.request.datetime).format("hh:mm DD MMMM");
	}

	// Load dialogs and update chats
	loadDialogs(){

		this.ChatService.fetch().then((data) => {
			this.isLoading = false;
			this.updateChats(this.ChatService._chats);
		}).catch((error) => {
		});
	}

	// Select if not selected or Unselect dialog
	selectDialog(dialog){
		if (this.ChatService.getCurrentDialog() != null && this.ChatService.getCurrentDialog().id == dialog.id){
			this.$rootScope.$broadcast("Dialog.Unselected", dialog);
			return;
		}
		this.$rootScope.$broadcast("Dialog.Selected", dialog);
	}

	//shows whether the chat is selected or not
	dialogSelected(dialog){
		return (this.ChatService.getCurrentDialog() != null && this.ChatService.getCurrentDialog().id == dialog.id);
	}
}

export default ChatSidebarController;
