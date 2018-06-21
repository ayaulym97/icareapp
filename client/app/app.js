import angular from "angular";
import uiRouter from "angular-ui-router";

import ngRaven from "raven-js/plugins/angular";


import Common from "./common/common";
import Components from "./components/components";
import Services from "./services/services";

import AppComponent from "./app.component";
import AppPermissions from "./app.permissions";

import "bootstrap/scss/bootstrap.scss";
import "bootstrap/scss/bootstrap-grid.scss";
import "bootstrap/scss/bootstrap-reboot.scss";

import "@lordfriend/nya-bootstrap-select/dist/css/nya-bs-select.min.css";
import "@lordfriend/nya-bootstrap-select/dist/js/nya-bs-select";

import Raven from "raven-js";

Raven
	.config("https://8b67d463cd8d4a6b91b73d624e391017@sentry.io/217645")
	.addPlugin(ngRaven, angular)
	.install();



angular.module("app", [
	ngRaven.moduleName,
	uiRouter,
	AppPermissions,

	Services,
	Common,
	Components,

	"nya.bootstrap.select"
])
	.run(($trace) => {
		"ngInject";
		$trace.enable(true);
	})


	.config(($locationProvider, $urlRouterProvider, nyaBsConfigProvider, $httpProvider) => {
		"ngInject";

		nyaBsConfigProvider.setLocalizedText("ru-ru", {
			defaultNoneSelection: "Ничего не выбрано",
			noSearchResult: "Нет совпадений",
			numberItemSelected: "%d выбрано",
			selectAll: "Выбрать всё",
			deselectAll: "Убрать всё",
			chooseSpec: "Выберите специальности"
		});
		nyaBsConfigProvider.useLocale("ru-ru");

		$httpProvider.defaults.timeout = 60000;

		$urlRouterProvider.otherwise(function($injector) {
			let $state = $injector.get("$state");
			$state.go("authorization");
		});
		$locationProvider.html5Mode(true).hashPrefix("!");
	})

	.component("app", AppComponent);
