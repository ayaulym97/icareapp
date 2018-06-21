import _remove from "lodash/remove";
// import _find from "lodash/find";

import alertify from "alertifyjs/build/alertify.min";

class PersonEducationController {
	constructor(PersonalDependenciesService) {
		"ngInject";
		this.PersonalDependenciesService = PersonalDependenciesService;
		this.actionEducationState = null;
		this.oldEducation = null;
		this.addNewEducationState = false;
		// this.addNewDoctorEducationState = false;
		// Set the skelet of education is it's length equal to 0
		this.newEducation = {
			description: null,
			doctor: null,
		};
	}

	//Append new education if doctor does not have an education before
	addNewEducation() {
		this.newEducation.doctor = this.doctorId;
		this.addNewEducationState = true;
	}

	//Append new education if doctor had an education before
	addNewDoctorEducation() {
		this.profileData.education.push(
			{
				education: ""
			}
		);
	}


	//Edit an education on click on pencil icon
	editEducation(education) {
		this.oldEducation = angular.copy(education);
		this.actionEducationState = education;
	}

	//delete an education on click on X icon
	deleteEducation(education) {
		this.PersonalDependenciesService.deleteEducation(education).then(() => {
			_remove(this.educationList, (edu) => edu.id === education.id);
			alertify.success("Квалификация удалена", 5);
		}, () => {
			alertify.error("Ошибка", 5);
		});
	}

	//Cancel editing an education
	cancelEducation(education) {
		education.description = this.oldEducation.description;

		this.oldEducation = null;
		this.actionEducationState = null;
	}

	//patch education on click if education already exist "V"
	saveEducation(education) {
		if (education.description !== "" && education.description !== null) {
			this.PersonalDependenciesService.updateEducation(education).then(() => {
				alertify.success("Сохранено", 5);
				this.actionEducationState = null;
			}, () => {
				alertify.error("Ошибка", 5);
			});
		} else {
			alertify.error("Квалификация не заполнена", 5);
		}
	}

	//save education on click if education "V"
	saveNewEducation() {
		if (this.newEducation.description !== "" && this.newEducation.description !== null) {

			this.PersonalDependenciesService.createEducation(this.newEducation).then((response) => {
				this.educationList.push(response.data);
				this.cancelNewEducation();
				alertify.success("Сохранено", 5);
			});
		} else {
			alertify.error("Квалификация не заполнена", 5);
		}
	}

	//cancel creating an education
	cancelNewEducation() {
		this.addNewEducationState = false;
		this.newEducation = {
			description: null,
			doctor: null,
		};
	}

	//cancel creating an education of existing education
	cancelNewDoctorEducation(education) {
		let index = this.profileData.education.indexOf(education);
		this.profileData.education.splice(index, 1);
	}
}

export default PersonEducationController;
