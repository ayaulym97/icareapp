class AuthorizationController {
	constructor(AuthorizationService, $state, PreloadService) {
		"ngInject";
		this.AuthorizationService = AuthorizationService;
		this.PreloadService = PreloadService;
		this.$state = $state;

		this.form = {
			username: null,
			password: null
		};

		this.newHelperStatus = false;
		this.formErrorStatus = false;
		this.authorizationStatus = false;
	}

	login(form) {
		this.authorizationStatus = true;

		if (this.formErrorStatus === true) this.formErrorStatus = false;

		this.AuthorizationService.login(form).then((response) => {
			console.log("[Authorization] - response", response);
			if (response.data.status = "0" && response.status === 400 && !response.data.hasOwnProperty("non_field_errors")) {
				this.newHelperStatus = true;
				this.authorizationStatus = false;
				return true;
			}
			if (response.data.hasOwnProperty("non_field_errors") && response.status === 400) {
				this.formErrorStatus = true;
				this.authorizationStatus = false;
				return true;
			}
			if (response.status === 200) {
				switch (response.data.type) {
				case 0:
					this.formErrorStatus = true;
					this.authorizationStatus = false;
					break;
				case 1:
					this.$state.go("helper.personal.doctors");
					break;
				case 2:
					this.$state.go("helper.personal.doctors");
					break;
				case 3:
					this.$state.go("admin.clinics");
					break;
				case 4:
					this.$state.go("support");
					break;
				}
			}
		});
	}
}

export default AuthorizationController;
