/**
 * Created by amirkaaa on 6/28/17.
 */
import angular from "angular";
import {permission, uiPermission} from "angular-permission";


let permissionModule = angular.module("app.permissions", [
	permission,
	uiPermission,
])
	.run((PermPermissionStore, AuthorizationService) => {
		"ngInject";

		PermPermissionStore.definePermission("ANONYM", () => {
			"ngInject";
			let result = AuthorizationService.validateUserType();
			return result === "ANONYM";
		});

		PermPermissionStore.definePermission("HELPER", () => {
			"ngInject";
			let result = AuthorizationService.validateUserType();
			return result === "HELPER";
		});
		PermPermissionStore.definePermission("ADMIN", () => {
			"ngInject";
			let result = AuthorizationService.validateUserType();
			return result === "ADMIN";
		});
		PermPermissionStore.definePermission("SUPPORT", () => {
			"ngInject";
			let result = AuthorizationService.validateUserType();
			return result === "SUPPORT";
		});

	})
	.name;

export default permissionModule;
