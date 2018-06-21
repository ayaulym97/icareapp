/**
 * Created by kassymkhantorgayev on 6/29/17.
 */

// import BaseService from '../utils/extender';
import moment from 'moment';
import APIConfig from '../utils/config';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _each from 'lodash/each';
import _isNil from 'lodash/isNil';
import _sortBy from 'lodash/sortBy';
import alertify from 'alertifyjs/build/alertify.min';
import _template from 'lodash/template';


let messagesAlert = null;

class Alertifier {

  static get defaults() {
    return {
      expirationTime: 10 // seconds
    }
  }

  // Get alertChat by chat id
  static getChatById(chatId) {
    if (!Alertifier.chats.hasOwnProperty(chatId)) {
      let data = {
        alert: null,
        timer: null,
        counter: 0,
        id: chatId
      };


      Alertifier.chats[chatId] = data;
    }

    return Alertifier.chats[chatId];
  }


  // Generate template with notifier message
  static generateTemplate(countMessages, user) {
    let messageEnding = this.computeEnding(countMessages, ['сообщение', 'сообщения', 'сообщений']);
    let template = null;

    if (countMessages === 1) {
      template = _template("Новое <%= ending %> от клиента <b><%= user %></b>")
    } else if (countMessages >= 2) {
      template = _template("<%= count %> - новых <%= ending %> от клиента <b><%= user %><b>");
    }

    return template({count: countMessages, ending: messageEnding, user: user.full_name})
  }

  // Define message ending
  static computeEnding(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  // Notify on new message
  static message(chat, dialog_id, state, rootScope) {

    // notification sounds - hahaha
    let music = new Audio("../assets/sounds/message.mp3");
    music.play();

    let alertChat = Alertifier.getChatById(chat.id);
    alertChat.counter += 1;
    if (!_isNil(alertChat.timer)) clearTimeout(alertChat.timer);


    let text = Alertifier.generateTemplate(alertChat.counter, chat.receiver);

    if (alertChat.alert === null) {
      alertChat.alert = alertify.notify(
        text,
        'success',
        Alertifier.defaults.expirationTime,
      );
      alertChat.alert.callback = function (isClicked) {
        // rootScope.lastSelectedDialog = chat;
        // this.$rootScope.$broadcast('Dialog.Selected', dialog);
        // state.go('helper.chat', {'lastSelectedDialog': 1});
        if (!_isNil(alertChat.timer)) clearTimeout(alertChat.timer);

        alertChat.alert = null;
        if (isClicked) {
          if (state.current.name !== 'helper.chat')
            state.go('helper.chat');
          rootScope.$broadcast('Dialog.Selected', chat);
        }
        else {
        }
      };
      Alertifier.chats[chat.id] = alertChat;

    } else {
      alertChat.alert.setContent(text, Alertifier.defaults.expirationTime);
    }

    // alertChat = Alertifier.expireAlertByUser(alertChat, Alertifier.defaults.expirationTime);

    Alertifier.chats[chat.id] = alertChat;
  }
}

Alertifier.chats = {};

export class Message {
  constructor($http, $q, $rootScope, ChatService, $location, $stateParams, $state) {
    "ngInject";
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
    // this.RealtimeService = RealtimeService;
    this.ChatService = ChatService;
    this.$location = $location;
    this._messages = {};
    this.socket = null;
    this.$stateParams = $stateParams;
    this.$state = $state;


    // On socket connection
    // this.connectionId = RealtimeService.subscribe('connection', () => {
    //   this.onRealtimeConnected();
    // });
  }

  normalizeDate(datetime) {
    return moment.utc(datetime).add(6, 'hour').format('DD.MM')
  }

  normalizeTime(datetime) {
    return moment.utc(datetime).add(6, 'hour').format('DD MMMM, HH : mm')
  }


  getSockets(socket) {
    this.socket = socket;
    // this.RealtimeService.unsubscribe(this.connectionId);

    // Load chats


    // let socket = this.RealtimeService.getSocket();

    // Handle new messages
    socket.on('Message.Created', (data) => {
      let dialog = null;

      // Create a store if new chat
      if (!this._messages.hasOwnProperty(data.chat)) {
        this._messages[data.chat] = [];
      }

      // Load dialog
      let dialog_promise = this.ChatService.getDialogById(data.chat);

      this._messages[data.chat].push(data);

      dialog_promise.then((item) => {
        dialog = item;
        let index = -1;
        _each(this.ChatService._chats, (item, index_) => {
          if (item.id === dialog.id) index = index_;

        });
        this.ChatService._chats.splice(0, 0, this.ChatService._chats.splice(index, 1)[0]);


        // Set a last message
        this.ChatService.setLastMessage(dialog, data);

        // If incoming message
        if (!data.hasOwnProperty('delivered')) {
          if (dialog === null) return;

          // Do not notify if chat is opened
          if (this.ChatService.getCurrentDialog() !== null && this.ChatService.getCurrentDialog().id === dialog.id) {

            // Set scroll bar to bottom
            this.$rootScope.$broadcast('Message.Created:' + data.chat, data);
            return;
          }

          // Notify
          Alertifier.message(dialog, dialog.id, this.$state, this.$rootScope);

        }
        // Event to clear sending messages loaders and set scroll bar to bottom
        this.$rootScope.$broadcast('Message.Created:' + data.chat, data);
      });
    });

    // Message creation failed
    socket.on('Message.Failed', (data) => {
    });
  }

  // Load chats and listen to messages on Realtime connected
  // onRealtimeConnected() {
  //   this.ChatService.fetch();
  //
  // }

  //  Emit message by socket
  create(info) {
    if (_isNil(this.socket)) return;

    this.socket.emit('message', {
      text: info.text,
      chat: info.chat
    });
  }

  // Load messages and update messages list
  fetch(chat) {
    let deferred = this.$q.defer();

    if (this._messages.hasOwnProperty(chat)) deferred.resolve(this._messages[chat]);

    this.$http.get(APIConfig.API_URL + 'message/', {
      params: {
        chat
      }
    }).then((response) => {
      this._messages[chat] = _sortBy(response.data, 'sent_at');
      deferred.resolve(this._messages[chat]);

      // Event to update messages list
      this.$rootScope.$broadcast('Message.ListUpdate', {id: chat, list: this._messages[chat]});
    });
    return deferred.promise;
  }

}

Message.list = new Set();

export class Chat {
  constructor($http, $q, $rootScope, $location, PreloadService) {
    "ngInject";
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.PreloadService = PreloadService;

    this._chats = null;
    this._currentDialog = null;
    this._defferedChats = $q.defer();
    this._defferedCurrentDialog = null;
    this.alerts = Alertifier.chats;

    // Base API URL
    this.API = APIConfig.STATIC_URL;

  }

  // Load init dialog
  waitForCurrentDialog() {
    if (this._defferedCurrentDialog === null) this._defferedCurrentDialog = this.$q.defer();

    return this._defferedCurrentDialog.promise;
  }

  // Get current dialog
  getCurrentDialog() {
    return this._currentDialog;
  }


  // Set a last message to chat
  setLastMessage(dialog, message) {
    if (_isNil(dialog)) return;

    dialog.last_message = message;
  }

  // Get or Load dialog by id
  getDialogById(id) {
    let deferred = this.$q.defer();

    let dialog = _find(this._chats, (item) => {
      return parseInt(item.id) === parseInt(id);
    });

    if (_isNil(dialog)) {
      this.$http.get(APIConfig.API_URL + `chat/${ id }/`).then((response) => {
        let chat = response.data;
        if (this._chats === null) this._chats = [];

        chat = this.normalizeDialog(chat);

        this._chats.push(chat);

        deferred.resolve(chat)
      }).catch((e) => {
      });
    } else {
      deferred.resolve(dialog);
    }

    return deferred.promise;
  }

  // Clear notifier
  static resetAlertify(id) {
    if (_isNil(Alertifier.chats[id])) return;

    if (!_isNil(Alertifier.chats[id].alert))
      Alertifier.chats[id].alert.dismiss();
    Alertifier.chats[id].count = 0;
    delete Alertifier.chats[id];
  }

  // Set current dialog, reset chat notifier and update request info
  setCurrentDialog(id) {

    this._currentDialog = _find(this._chats, (item) => {
      return parseInt(item.id) === parseInt(id);
    });
    if (_isNil(this._currentDialog)) {
      this._currentDialog = {id};

      this.getDialogById(id).then(dialog => {
        this._currentDialog = dialog;
        this._defferedCurrentDialog.resolve(dialog);
      });
    } else {
      this._defferedCurrentDialog.resolve(this._currentDialog);
    }
    if (!_isNil(this._currentDialog.id)) Chat.resetAlertify(this._currentDialog.id);

    this.$rootScope.$broadcast('RequestInfo.Update', this._currentDialog.request);

    return this._currentDialog;
  }

  // set sender and receiver
  normalizeDialog(dialog) {
    let client = dialog.client;
    let helper = dialog.helper;

    if (parseInt(dialog.sender) === parseInt(client.id)) {
      dialog.sender = client;
      dialog.receiver = helper;
    } else {
      dialog.sender = helper;
      dialog.receiver = client;
    }

    return dialog;
  }

  // Load chats and update chats list
  fetch() {
    this._defferedChats = this.$q.defer();

    if (this._chats !== null) this._defferedChats.resolve(this._chats);

    if (this.PreloadService.helperChat !== null) {
      // this._chats = _map(this.PreloadService.helperChat, (dialog) => {
      //   return this.normalizeDialog(dialog);
      // });
      this._defferedChats.resolve(this._chats);
      //     this._defferedChats.resolve(this._chats);
      //     this.$rootScope.$broadcast('Dialog.ListUpdate', this._chats);
    }
    else {
      this.PreloadService.getHelperChat().then((response) => {
        this._chats = _map(response, (dialog) => {
          return this.normalizeDialog(dialog);
        });


        // sorting dialogs by the time of last messages
        this._chats = _sortBy(this._chats, function (chat) {
          return new moment(chat.last_message ? chat.last_message.sent_at : new Date(-8640000000000000));
        }).reverse();


        this._defferedChats.resolve(this._chats);
        this.$rootScope.$broadcast('Dialog.ListUpdate', this._chats);
      });
    }

    return this._defferedChats.promise;
  }
}

export default Chat;
