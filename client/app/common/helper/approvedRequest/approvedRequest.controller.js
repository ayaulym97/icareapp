class ApprovedRequestController {
	constructor($scope) {
		"ngInject";
		this.$scope =$scope;
		this.name = "approvedRequest";
	}
	cancel(){
		this.$scope.$emit("modal:cancel");
	}
}

export default ApprovedRequestController;
