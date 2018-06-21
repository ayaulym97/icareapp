class SupportTopBarController {
	constructor(AuthorizationService) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
	}

	// Logout from system
	logout() {
		this.AuthorizationService.logout(true);
	}
}

export default SupportTopBarController;
