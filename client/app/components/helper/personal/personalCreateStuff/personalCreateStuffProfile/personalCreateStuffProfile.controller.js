import _filter from "lodash/filter";
import _find from "lodash/find";
import _forEach from "lodash/forEach";

import alertify from "alertifyjs/build/alertify.min";
import APIConfig from "../../../../../utils/config";


class PersonalCreateStuffProfileController {
	constructor(PreloadService, AuthorizationService, HelperService, $rootScope, $scope, $state, Upload, $timeout, PersonalDependenciesService) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.HelperService = HelperService;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$state = $state;
		this.Upload = Upload;
		this.$timeout = $timeout;
		this.PersonalDependenciesService = PersonalDependenciesService;
		this.avatar = null;

		this.preloadCompleted = $rootScope.$on("Preload.Completed", () => this.preloadInit());
	}

	$onInit() {
		if (this.$rootScope.loading !== true && typeof this.$rootScope.loading !== "undefined") {
			this.preloadInit();

		}
	}

	saveCropAvatar() {
		this.cropAvatarState = false;
		this.lastCroppedDataUrl = angular.copy(this.croppedDataUrl);
		this.profileData.avatar = this.avatar;
		this.profileData.lastCroppedDataUrl = this.lastCroppedDataUrl;
	}

	//Upload avatar after response
	uploadAvatar(dataUrl, name, doctor, doctorUpdateResponse) {

		this.Upload.upload({
			url: APIConfig.API_URL + "doctor/change_avatar/",
			data: {
				doctor: doctor,
				avatar: this.Upload.dataUrltoBlob(dataUrl, name)
			},
		}).then((response) => {
			doctorUpdateResponse.avatar = response.data.avatar;
			this.PreloadService.clinicStuffList.push(doctorUpdateResponse);
			this.PreloadService.helperStuffList.push(doctorUpdateResponse);
			this.$timeout(() => {
				this.saveAlert.delay(5).setContent("Специалист добавлен");
				this.$state.go("helper.personal.stuff");
			}, 1500);
		}, (error) => {
			if (error.status > 0) this.errorMsg = error.status + ": " + error.data;
		});
	}

	cancelCropAvatar() {
		this.croppedDataUrl = null;
		this.cropAvatarState = false;
	}

	preloadInit() {

		//Save avatar in window
		this.avatar = angular.copy(this.profileData.avatar);
		this.lastCroppedDataUrl = angular.copy(this.profileData.lastCroppedDataUrl);

		//Filter all helper to activated helpers
		this.helperList = _filter(this.PreloadService.clinicsHelperList, (helper) => helper.status === 0).reverse();

		//Find yourself in all helper list
		if (this.profileData.helper !== null) {
			this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => this.profileData.helper.id === helper.id);
		}
		else {
			this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => helper.id === this.AuthorizationService.user.id);
		}


		// Set current helper like initial helper to our new personal
		this.dropdownState = null;
		this.avatarUplodaState = false;
		this.saveButtonState = false;
		this.specialityState = false;


		//Setting category to dropdown if it already exist
		switch (this.profileData.category) {
		case 1:
			this.currentCategory = {
				id: 1,
				text: "Вторая квалификационная категория"
			};
			break;
		case 2:
			this.currentCategory = {
				id: 2,
				text: "Первая квалификационная категория"
			};
			break;
		case 3:
			this.currentCategory = {
				id: 3,
				text: "Высшая квалификационная категория"
			};
			break;
		case 4:
			this.currentCategory = {
				id: 4,
				text: "КМН"
			};
			break;
		case 5:
			this.currentCategory = {
				id: 5,
				text: "ДМН"
			};
			break;
		case 6:
			this.currentCategory = {
				id: 6,
				text: "Профессор"
			};
			break;
		default:
			this.currentCategory = {
				id: 0,
				text: "Квалификация не выбрана"
			};
			break;
		}
		// switch (this.profileData.category) {
		// case 1:
		// 	this.currentCategory = {
		// 		id: 1,
		// 		text: "Вторая квалификационная категория"
		// 	};
		// 	break;
		// case 2:
		// 	this.currentCategory = {
		// 		id: 2,
		// 		text: "Первая квалификационная категория"
		// 	};
		// 	break;
		// case 3:
		// 	this.currentCategory = {
		// 		id: 3,
		// 		text: "Высшая квалификационная категория"
		// 	};
		// 	break;
		// default:
		// 	this.currentCategory = {
		// 		id: 0,
		// 		text: "Квалификация не выбрана"
		// 	};
		// 	break;
		// }

		//Setting status to dropdown if it already exist
		switch (this.profileData.status) {
		case 0:
			this.currentDoctorStatus = {
				status: 0,
				text: "Активен"
			};
			break;
		case 1:
			this.currentDoctorStatus = {
				status: 1,
				text: "Неактивен"
			};
			break;
		default:
			this.currentDoctorStatus = {
				status: 0,
				text: "Активен"
			};
		}

		//Setting 'call to home' to dropdown if it already exist
		switch (this.profileData.allowed_type.indexOf(3)) {
		case -1:
			this.currentDoctorOnCall = {
				status: 0,
				text: "Нет"
			};
			break;
		case 3:
			this.currentDoctorOnCall = {
				status: 1,
				text: "Да"
			};
			break;
		}

		//Setting all specialities that in base
		this.specialitiesList = this.PreloadService.specialities;
	}

	savePersonal() {

		this.saveButtonState = true;
		this.saveAlert = alertify.notify("Сохранение...", "custom", 20);

		//Saving avatar
		this.avatar = angular.copy(this.profileData.avatar);
		this.lastCroppedDataUrl = angular.copy(this.profileData.lastCroppedDataUrl);

		this.qualification = angular.copy(this.profileData.qualification);
		this.education = angular.copy(this.profileData.education);
		this.profileData.helper = this.profileData.helper.id;
		//Deleting avatar before request
		delete this.profileData.avatar;
		delete this.profileData.lastCroppedDataUrl;

		//Deleting service before request
		// delete this.profileData.procedureService;
		// delete this.profileData.medtestService;

		//Deleting education and qualification
		// delete this.profileData.education;
		// delete this.profileData.qualification;

		//Setting doctor specialities to id`s
		this.specialitiId = [];
		for (let i in this.profileData.speciality) {
			this.specialitiId.push(this.profileData.speciality[i].id);
		}
		this.profileData.speciality = this.specialitiId;


		//Creating doctor
		this.HelperService.createPersonal(this.profileData).then((response) => {

			//Setting worktime of doctor
			let currentWorktime = [];
			let type = 0;

			if (response.data.type === 2) type = 1;

			for (let index in this.profileData.worktime) {
				let worktimeData = this.profileData.worktime[index];
				worktimeData.doctor = response.data.id;
				worktimeData.type = type;
				currentWorktime.push(worktimeData);
			}
			let data = angular.copy(response.data);
			if (currentWorktime.length > 0) {
				this.HelperService.saveWorktimeByList(currentWorktime).then((response) => {
					data.worktime = response;
				});
			}
			data.hours = response.data.worktime.length;

			//Uploading qualification
			_forEach(this.qualification, (item) => {
				let request = {
					doctor: response.data.id,
					description: item.qualification
				};
				this.PersonalDependenciesService.createQualification(request).then((response) => {
					data.qualification.push(response.data);
				});
			});

			//Uploading education
			_forEach(this.education, (item) => {
				let request = {
					doctor: response.data.id,
					description: item.education
				};
				this.PersonalDependenciesService.createEducation(request).then((response) => {
					data.education.push(response.data);
				});
			});

			//Checking avatar for "null"
			if (this.avatar === null) {
				this.$timeout(() => {

					this.PreloadService.clinicStuffList.push(data);
					this.PreloadService.helperStuffList.push(data);
					this.saveAlert.delay(5).setContent("Специалист создан");
					this.$state.go("helper.personal.stuff");
				}, 1000);
			}
			else {
				this.uploadAvatar(this.lastCroppedDataUrl, this.avatar, data.id, data);
			}
		},
		(error) => {
			this.saveButtonState = false;
			this.saveAlert.dismiss();
			alertify.notify("Ошибка!", "error", 1);
		});
	}

	showDropdownMenu(state) {
		this.dropdownState = this.dropdownState === state ? null : state;
	}

	selectCategory(category) {
		this.currentCategory = category;

		// Set category id to profile form
		this.profileData.category = category.id;
	}

	selectDoctorOnCall(doctorOnCall) {

		this.currentDoctorOnCall = doctorOnCall;

		let indexDoctorOnCall = this.profileData.allowed_type.indexOf(3);

		// If status is 1 and not exist in array, append to array
		if (doctorOnCall.status === 1 && indexDoctorOnCall === -1) {
			this.profileData.allowed_type.push(3);
		}

		// If status is 0 and exist in array, remove from array
		if (doctorOnCall.status === 0 && indexDoctorOnCall !== -1) {
			this.profileData.allowed_type.splice(indexDoctorOnCall);
		}
	}

	selectDoctorStatus(status) {
		this.currentDoctorStatus = status;

		// Set status to profile form
		this.profileData.status = status.status;
	}

	selectHelper(helper) {
		this.currentHelper = helper;
		// Set helper id to profile form
		this.profileData.helper = helper;
	}


}

export default PersonalCreateStuffProfileController;
