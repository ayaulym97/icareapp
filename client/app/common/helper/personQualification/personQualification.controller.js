import _remove from "lodash/remove";
// import _find from "lodash/find";

import alertify from "alertifyjs/build/alertify.min";

class PersonQualificationController {
	constructor(PersonalDependenciesService) {
		"ngInject";
		this.PersonalDependenciesService = PersonalDependenciesService;
		this.actionQualificationState = null;
		this.oldQualification = null;
		this.addNewQualificationState = false;
		// Set the skelet of qualification is it's length equal to 0
		this.newQualification = {
			description: null,
			doctor: null,
		};
	}

	//Append new qualification if doctor does not have an qualification before
	addNewQualification() {
		this.newQualification.doctor = this.doctorId;
		this.addNewQualificationState = true;
	}

	//Append new qualification if doctor had an qualification before
	addNewDoctorQualification() {
		this.profileData.qualification.push(
			{
				qualification: ""
			}
		);
	}

	//Edit an qualification on click on pencil icon
	editQualification(qualification) {
		this.oldQualification = angular.copy(qualification);
		this.actionQualificationState = qualification;
	}

	//delete an qualification on click on X icon
	deleteQualification(qualification) {
		this.PersonalDependenciesService.deleteQualification(qualification).then(() => {
			_remove(this.qualificationList, (qual) => qual.id === qualification.id);
			alertify.success("Квалификация удалена", 5);
		}, () => {
			alertify.error("Ошибка", 5);
		});
	}

	//Cancel editing an qualification
	cancelQualification(qualification) {
		qualification.description = this.oldQualification.description;

		this.oldQualification = null;
		this.actionQualificationState = null;
	}

	//patch qualification on click if qualification already exist "V"
	saveQualification(qualification) {
		if (qualification.description !== "" && qualification.description !== null) {
			this.PersonalDependenciesService.updateQualification(qualification).then(() => {
				alertify.success("Сохранено", 5);
				this.actionQualificationState = null;
			}, () => {
				alertify.error("Ошибка", 5);
			});
		} else {
			alertify.error("Квалификация не заполнена", 5);
		}
	}

	//save qualification on click if qualification "V"
	saveNewQualification() {
		if (this.newQualification.description !== "" && this.newQualification.description !== null) {
			this.PersonalDependenciesService.createQualification(this.newQualification).then((response) => {
				this.qualificationList.push(response.data);
				this.cancelNewQualification();
				alertify.success("Сохранено", 5);
			});
		} else {
			alertify.error("Квалификация не заполнена", 5);
		}
	}

	//cancel creating an qualification
	cancelNewQualification() {
		this.addNewQualificationState = false;
		this.newQualification = {
			description: null,
			doctor: null,
		};
	}

	//cancel creating an qualification of existing qualification
	cancelNewDoctorQualification(qualification) {
		let index = this.profileData.qualification.indexOf(qualification);
		this.profileData.qualification.splice(index, 1);
	}
}

export default PersonQualificationController;
