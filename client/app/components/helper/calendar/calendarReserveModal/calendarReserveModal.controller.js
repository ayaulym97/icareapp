import "jquery-mask-plugin/dist/jquery.mask.min";

class CalendarReserveModalController {
	constructor($rootScope, $scope) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.full_name = "";
		this.phone = "";
		this.comment = "";
		this.errorField = null;

		this.$rootScope.$on("request:error", () => this.errorField = "Неправильный формат телефона");
	}

	$onInit(){
		$(document).ready(function() {
			$(".pacient-phone").mask("+A(YYY)-YYY-YY-YY", {"translation": {
				A: {pattern: /[7]/},
				Y: {pattern: /[0-9]/}
			}
			});
		});
	}
	//gets signal for closing modal of reserving
	closeHide(){
		this.$rootScope.$broadcast("request:reserve:close", {});
	}

	//saves new reserve and sends data
	saveReserve(){
		if(typeof  this.phone == "undefined") this.phone = "";

		if(typeof  this.full_name == "undefined") this.full_name = "";

		if(this.full_name.length == 0 || this.phone.length == 0){
			this.errorField = "Заполните поле";
		}else{
		  let phone = this.phone.replace(/[-()]/g, "");
			this.$rootScope.$broadcast("requets:reserve:save", {
				full_name: this.full_name,
				phone: phone,
				comment: this.comment
			});
		}}
}

export default CalendarReserveModalController;
