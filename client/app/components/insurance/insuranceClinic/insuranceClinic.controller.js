import url from "../../../utils/config";
import StaticTypes from "../../../utils/staticTypes";

class InsuranceClinicController {
	constructor($scope, PreloadService) {
		"ngInject";

		this.PreloadService = PreloadService;
		this.name = "insuranceClinic";
		this.selectedType = "service";
		this.categoryTypes = StaticTypes.CATEGORIES;
		this.$scope = $scope;
		this.staticUrl = url.STATIC_URL;
		this.serviceList = [];
		this.doctorList = [];
	}

	$onInit(){
		if(typeof this.content === "undefined"){
			this.returnBack();
		}
		this.PreloadService.getClinicInfo(this.content.id).then((response)=>{
			this.serviceList = response.data.services;
			this.doctorList = response.data.doctor;
		});
	}

	//select type of insurance
	setSelection(type){
		this.selectedType = type;
	}

	returnBack(){
		this.$scope.$emit("modal:cancel");
	}
}

export default InsuranceClinicController;
