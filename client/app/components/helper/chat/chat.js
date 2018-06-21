import angular from "angular";
import uiRouter from "angular-ui-router";
import chatComponent from "./chat.component";

let chatModule = angular.module("chat", [
	uiRouter
])

	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state("helper.chat", {
				url: "/chat",
				views: {
					"helper@helper": {
						component: "chat"
					}
				},
				param: {
					"lastSelectedDialog": null,
				}
			});
	})

	.component("chat", chatComponent)

	.name;

export default chatModule;
