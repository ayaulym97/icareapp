import _filter from "lodash/filter";
import _find from "lodash/find";
import _forEach from "lodash/forEach";
// import _map from "lodash/map";

import alertify from "alertifyjs/build/alertify.min";

import APIConfig from "../../../../../utils/config";

class PersonalProfileProfileController {
	$onInit() {
		if (this.$rootScope.loading != true && typeof this.$rootScope.loading != "undefined") {
			this.preloadInit();
		}
	}

	saveCropAvatar() {
		this.cropAvatarState = false;
		this.lastCroppedDataUrl = angular.copy(this.croppedDataUrl);
	}

	cancelCropAvatar() {
		this.croppedDataUrl = null;
		this.cropAvatarState = false;
	}

	constructor(PreloadService, AuthorizationService, HelperService, $rootScope, $scope, $state, $stateParams, $timeout, Upload) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.HelperService = HelperService;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.$timeout = $timeout;
		this.Upload = Upload;


		this.staticUrl = APIConfig.STATIC_URL;
		this.updateView = this.$rootScope.$on("Doctor:helper:updated", () => this.preloadInit());
		this.preloadCompleted = $rootScope.$on("Preload.Completed", () => this.$timeout(() => this.preloadInit(), 0));

	}

	uploadAvatar(dataUrl, name, doctor, doctorUpdateResponse, data) {

		this.Upload.upload({
			url: APIConfig.API_URL + "doctor/change_avatar/",
			data: {
				doctor: doctor,
				avatar: this.Upload.dataUrltoBlob(dataUrl, name)
			},
		}).then((response) => {
			doctorUpdateResponse.avatar = response.data.avatar;
			this.$timeout(() => {
				this.updateDoctorInfo(data, parseInt(data.id), response.data.avatar);
				this.saveAlert.delay(5).setContent("Специалист обновлен");
				this.$state.go("helper.personal.doctors");
			}, 800);
		}, (error) => {
			if (error.status > 0) this.errorMsg = error.status + ": " + error.data;
		});
	}

	preloadInit() {

		// If user is super helper
		if (this.AuthorizationService.user.type == 2) {

			//Filter all helper to activated helpers
			this.helperList = _filter(this.PreloadService.clinicsHelperList, (helper) => helper.status == 0).reverse();


			//Find yourself in all helper list
			this.currentHelper = _find(this.PreloadService.clinicsHelperList, (helper) => helper.id == this.profileData.helper.id);

			// Set current helper like initial helper to our new personal
			this.selectHelper(this.currentHelper);


		}
		if (this.AuthorizationService.user.type == 1) {
			this.currentHelper = this.profileData.helper.id;
			this.selectHelper(this.currentHelper);

		}
		//Setting avatar 'null' for check avatar`s update
		this.avatar = null;

		this.oldAvatar = angular.copy(this.profileData.avatar);

		this.personalProfileData = _find(this.PreloadService.clinicDoctorList, {id: parseInt(this.$stateParams.id)});


		// [Doctoroncall, category, helper, status] dropdown state
		this.dropdownState = null;

		// Last cropped image or last avatar
		this.lastCroppedDataUrl = null;

		// Showing avatar crop modal
		this.avatarUplodaState = false;

		// Save button disable state
		this.saveButtonState = false;


		this.selectedCategories = this.profileData.category;
		// Detect and set default profile category
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
		// case 4:
		// 	this.currentCategory = {
		// 		id: 4,
		// 		text: "КМН"
		// 	};
		// 	break;
		// case 5:
		// 	this.currentCategory = {
		// 		id: 5,
		// 		text: "ДМН"
		// 	};
		// 	break;
		// case 6:
		// 	this.currentCategory = {
		// 		id: 6,
		// 		text: "Профессор"
		// 	};
		// 	break;
		// }


		// Detect and set default profile doctoroncall license
		let indexDoctorOnCall = this.profileData.allowed_type.indexOf(3);

		switch (indexDoctorOnCall) {
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

		// Detect and set default profile status
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
		}

		// Save for showing speciality
		this.selectedSpecialities = this.profileData.speciality;


		// Get global speciality list
		this.specialitiesList = this.PreloadService.specialities;
	}

	backToProfile() {
		this.$state.go("helper.personal.doctors");
	}

	// savePersonal() {
	//
	//
	//   // Disable save button until error response
	//   this.saveButtonState = true;
	//
	//   // Show saving notification
	//   this.saveAlert = alertify.notify("Добавление специалиста...", "custom", 20);
	//
	//   // Refreshing old speciality list
	//   this.profileData.speciality = [];
	//
	//   _forEach(this.selectedSpecialities, (speciality) => this.profileData.speciality.push(speciality.id));
	//
	//   // Return services by id in array
	//   this.profileData.service = _map(this.profileData.service, (service) => service.id);
	//
	//   // Delete avatar for saving them after updating main profile
	//   delete this.profileData.avatar;
	//
	//   // For valid saving return id of helper
	//   this.profileData.helper = this.currentHelper.id;
	//
	//   // For valid saving return id of place
	//   this.profileData.place = this.profileData.place.id;
	//
	//
	//
	//   this.HelperService.updatePersonal(this.profileData).then((response) => {
	//       if(this.avatar == this.profileData.avatar){
	//         this.$timeout(() =>{
	//           // this.profileData.avatar=this.personalProfileData.avatar;
	//           this.saveAlert.delay(5).setContent("Специалист обновлен");
	//           this.$state.go('helper.personal.doctors');
	//         },500);
	//       }
	//       else{
	//         this.uploadAvatar(this.croppedDataUrl, this.avatar.name, response.data.id, this.profileData);
	//       }
	//       let avatar = angular.copy(response.data.avatar);
	//     },
	//     (error) => {
	//
	//       // Enable save button for new saving
	//       this.saveButtonState = false;
	//
	//       // Dismiss saving notification and show error notification
	//       this.saveAlert.dismiss();
	//       alertify.notify("Ошибка!", "error", 1);
	//     })
	// }

	saveDoctor() {
		this.saveAlert = alertify.notify("Обновление специалиста...", "custom", 20);

		let specialities = [];
		_forEach(this.selectedSpecialities, (speciality) => specialities.push(speciality.id));

		let categories = [];
		_forEach(this.selectedCategories, (item) => {
			if (item.id !== 0) {
				categories.push(item.id);
			}
		});


		let data = {
			speciality: specialities,
			full_name: this.profileData.full_name,
			experience: this.profileData.experience,
			status: this.profileData.status,
			allowed_type: this.profileData.allowed_type,
			category: categories,
			helper: this.profileData.helper = this.currentHelper.id,
			description: this.profileData.description,
			id: this.profileData.id,
			place: this.profileData.place.id
			// consultation:
		};

		this.HelperService.updatePersonal(data).then((response) => {
			if (this.avatar === null) {
				this.$timeout(() => {
					this.updateDoctorInfo(response.data, parseInt(response.data.id), null);
					this.profileData.avatar = this.personalProfileData.avatar;
					this.saveAlert.delay(5).setContent("Специалист обновлен");
					this.$state.go("helper.personal.doctors");
				}, 800);

			}
			else {
				this.uploadAvatar(this.lastCroppedDataUrl, this.avatar.name, response.data.id, this.profileData, response.data);
			}
		});

	}

	// call update doctor list by function
	updateDoctorInfo(data, id, ava) {
		this.doctor = _find(this.PreloadService.clinicDoctorList, {id: id});
		this.doctor_global = _find(this.PreloadService.helperDoctorList, {id: id});
		this.doctorGlobalUpdate(this.doctor, data, ava);
		this.doctorGlobalUpdate(this.doctor_global, data, ava);
	}

	//update doctor list particularly
	doctorGlobalUpdate(doctor, data, ava) {
		doctor.full_name = data.full_name;
		doctor.speciality = data.speciality;
		doctor.experience = data.experience;
		doctor.status = data.status;
		doctor.allowed_type = data.allowed_type;
		doctor.category = data.category;
		doctor.helper = data.helper;
		if (ava != null) {
			doctor.avatar = ava;
		}
	}

	showDropdownMenu(state) {
		this.$timeout(() => this.dropdownState = this.dropdownState === state ? null : state, 100);
	}

	selectCategory() {
		this.cpunter = _find(this.selectedCategories, (item) => item.id === 0);
		if (this.cpunter) {
			this.selectedCategories = [{
				name: "Нет",
				id: 0
			}];
		}
		// Set category id to profile form
		// this.profileData.category = category.id;
	}

	selectDoctorOnCall(doctorOnCall) {

		this.currentDoctorOnCall = doctorOnCall;

		let indexDoctorOnCall = this.profileData.allowed_type.indexOf(3);

		// If status is 1 and not exist in array, append to array
		if (doctorOnCall.status === 1 && indexDoctorOnCall === -1) this.profileData.allowed_type.push(3);

		// If status is 0 and exist in array, remove from array
		if (doctorOnCall.status === 0 && indexDoctorOnCall !== -1) this.profileData.allowed_type.splice(indexDoctorOnCall);
	}

	selectDoctorStatus(status) {
		this.currentDoctorStatus = status;

		// Set status to profile form
		this.profileData.status = status.status;
	}

	selectHelper(helper) {
		this.currentHelper = helper;
	}
}

export default PersonalProfileProfileController;
