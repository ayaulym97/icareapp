// // import _reject from "lodash/reject";
// import alertify from "alertifyjs/build/alertify";
// // import _find from "lodash/find";
// import _remove from "lodash/remove";
// // import _map from "lodash/map";
// import _forEach from "lodash/forEach";
//
//
// class  PersonalProfileStuffMedtestsController{
// 	constructor($scope,$rootScope,PreloadService,HelperService,$stateParams,$timeout) {
// 		"ngInject";
// 		this.$scope=$scope;
// 		this.$rootScope = $rootScope;
// 		this.PreloadService = PreloadService;
// 		this.HelperService = HelperService;
// 		this.$stateParams = $stateParams;
// 		this.$timeout = $timeout;
// 		this.name = "personalProfileMedtests";
// 		this.newDoctorMedtest=[];
// 	}
//
// 	$onInit(){
// 		this.setDoctor();
// 	}
// 	backToProfile(){
// 		this.$scope.$emit("back");
// 	}
//
// 	setDoctor(){
// 		this.doctorService=[];
// 		_forEach(this.profileData.service,(service) =>{
// 			if(service.type == 0){
// 				this.doctorService.push(service.id);
// 				// console.log("DoctorProcedures",this.doctorService)
// 			}
// 			if(service.type == 1){
// 				this.newDoctorMedtest.push(service.id);
// 			}
// 		});
// 		// this.newDoctorMedtest=this.doctorMedtest.id;
// 	}
//
// 	addToDoctorMedtest(medtest){
// 		// console.log(medtest);
// 		if(this.newDoctorMedtest.includes(medtest.service.id)){
// 			_remove(this.newDoctorMedtest, (obj) => obj == medtest.service.id);
// 		}
// 		else{
// 			this.newDoctorMedtest.push(medtest.service.id);
// 			// console.log(this.newDoctorMedtest);
// 		}
// 	}
//
// 	saveMedtest(){
// 		let saveAlert = alertify.notify("Сохранение...", "success", 20);
//
// 		_forEach(this.newDoctorMedtest,(medtest) => {
// 			this.doctorService.push(medtest);
// 		});
//
// 		let data = {
// 			service: this.doctorService,
// 		};
//
// 		this.HelperService.updateProcedures(data, this.profileData.id).then((response) => {
//
// 			console.log("[Update] Doctor medtests updated");
//
// 			let saveAlert = alertify.notify("Данные сохранены", "success", 20);
// 			this.profileData.service= response.data.service;
// 			this.backToProfile();
//
// 		});
//
// 	}
// }
//
// export default PersonalProfileStuffMedtestsController;
//
//
// import _reject from "lodash/reject";
import alertify from "alertifyjs/build/alertify";
import _find from "lodash/find";
import _remove from "lodash/remove";
// import _map from "lodash/map";
import _forEach from "lodash/forEach";



class PersonalProfileStuffMedtestsController {
	constructor($scope, PreloadService, HelperService, $rootScope, $timeout, $stateParams) {
		"ngInject";
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.PreloadService = PreloadService;
		this.HelperService = HelperService;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;

		this.clickProcedure = null;

		this.savedPrices = [];
		this.newDoctorMedtests=[];
		this.doctorOwnList = [];

		this.addedProcedure = new Set();
		// Finds the doctor's full information from the clinicDostorList by ID from stateParams.
		this.doctor = _find(this.PreloadService.clinicStuffList, {id : parseInt(this.$stateParams.id)});
		// this.$rootScope.$on('profile:id', (event,data) => this.setDoctor(data))

		// If doctor has their own ID, then we will
		// Set use finally assign the information by function "setDoctor"
		if (this.doctor.hasOwnProperty("id")) {
			this.$timeout(() => {
				this.setDoctor(this.doctor);
			}, 100);
		}

	}
	$onInit(){
		this.medtestClone = angular.copy(this.PreloadService.clinicMedtests);
	}
	// go back to profile
	backToProfile(){
		this.$scope.$emit("back");
	}

	// 1. Set all the information from doctor.
	// 2. Push all the information that is services to a list doctorService
	// 3. Push all the information that is procedures to a list newDoctorProcedures
	// 4. Push all the consultation to the list Consultation
	// 5. Push all the prices to the list doctorOwnList
	setDoctor(data){
		// console.log('this', this);
		this.profile = data;
		this.doctorService = [];
		// this.consultation = [];
		_forEach(this.profile.service,(service) =>{
			// console.log(service.type);
			if(service.type === 0){
				this.doctorService.push(service.id);
			}
			if(service.type === 1){
				this.newDoctorMedtests.push(service.id);
			}
		});
		//
		// for(let i=0;i<this.profile.consultation.length; i++){
		//   if(this.profile.allowed_type.includes(this.profile.consultation[i].consultation.type)){
		//     this.consultation.push(this.profile.consultation[i]);
		//   }
		// }
		this.profile.service.forEach((item)=>{
			if(item.hasOwnProperty("doctor_price")){
				this.doctorOwnList.push(item.id);
			}
		});
	}

	addToDoctorProcedure(procedure){
		let price =  _find(this.PreloadService.clinicMedtests,(item) => item.service.id === procedure.service.id);
		if(this.newDoctorMedtests.includes(procedure.service.id)){
			_remove(this.newDoctorMedtests, (obj) => obj === procedure.service.id);
			// _remove(this.profile.service ,(item) => item.id === procedure.service.id);
			_find(this.profile.service,(item) => {
				if(item.id === procedure.service.id){
					item.doctor_price = price.price;
					this.savedPrices.push({
						service: item.id,
						price: price.price
					});
				}
			});
		}
		else{
			this.newDoctorMedtests.push(price.service.id);
		}
	}

	// Pushes all the new and old procedures(money) to a list doctorService, then
	// make the request to a back-end to save all of these information
	saveProcedures(){
		let saveAlert = alertify.notify("Сохранение...", "success", 5);

		_forEach(this.newDoctorMedtests,(procedures) =>{
			// console.log(procedures)
			this.doctorService.push(procedures);
		});
		// _forEach(this.consultation,(item) =>{
		//   let price = {
		//     price: item.price
		//   };
		//   this.HelperService.updateConsultation(price,item.id).then((response) => {
		//     this.profile.consultation = response.data.consultation;
		//
		//   });
		// });

		// console.log(this.savedPrices,this.newDoctorMedtests,"data")

		let data= {
			helper: this.profileData.helper.id,
			service:this.doctorService,
			place: this.profileData.place.id
		};
		this.savedPrices.forEach((item)=>{
			this.HelperService.addProcedurePrice({
				service: item.service,
				price: item.price,
				doctor: this.profile.id
			});
		});
		this.addedProcedure = new Set();
		// console.log(data)
		this.HelperService.updateProcedures(data,this.profile.id).then((response) =>{
			let saveAlert = alertify.notify("Данные сохранены", "success", 20);
			// console.log(response,'data')
			this.profile.service= response.data.service;
			this.$timeout(() => {
				this.backToProfile();
			},400);
		});

		//
	}

	findProcedure(procedure){
		let serv = _find(this.profile.service, (item)=>{
			return item.id === procedure.service.id;
		});
		// console.log(serv);

		if(typeof serv === "undefined"){
			return {
				price: procedure.price,
				doctor: false,
				place_off: true
			};
		}
		else{
			if(serv.hasOwnProperty("doctor_price")){
				return {
					price:serv.doctor_price,
					doctor: true,
					service: serv
				};
			}
			if(serv.hasOwnProperty("place_price")){
				return {
					price:serv.place_price,
					doctor: false
				};
			}
		}
	}

	// Open input and set autofocus
	changeClickable(procedure){
		this.$timeout(() => {
			document.getElementsByClassName("medtest" + procedure.id)[0].focus();
		}, 10);
		this.clickProcedure = procedure.id;
	}

	//Cancel the function of changing the price
	cancelPrice(){
		this.clickProcedure = null;
	}

	addProcedure(procedure){
		// console.log(procedure);
		if(procedure.price === null) {
			this.cancelPrice();
			return false;
		} else {
			let serv = _find(this.profile.service, (item) => {
				return item.id === procedure.service.id;
			});
			if (typeof serv !== "undefined") {
				let save_price = _find(this.savedPrices, ((price) => {
					return price.service === serv.id;
				}));
				if (typeof save_price === "undefined") {
					this.savedPrices.push({
						service: serv.id,
						price: procedure.price
					});
				} else {
					save_price.price = procedure.price;
				}
				if (serv.hasOwnProperty("doctor_price")) {
					this.$timeout(() => {
						serv.doctor_price = procedure.price;
						this.addedProcedure.add(serv.id);
						this.cancelPrice();
					});
					return false;
				}
				if (serv.hasOwnProperty("place_price")) {
					this.$timeout(() => {
						this.addedProcedure.add(serv.id);
						serv["doctor_price"] = procedure.price;
						this.cancelPrice();
					});
					return false;
				}
			}
		}
	}

	removeProcedure(procedure){
		let serv = _find(this.profile.service, (item)=>{
			return item.id === procedure.service.id;
		});
		if(typeof serv !== "undefined"){
			if(!serv.hasOwnProperty("doctor_price_id")){
				return;
			}
			this.$timeout(()=>{
				delete serv["doctor_price"];
				delete serv["doctor_price_id"];
				serv["place_price"] = procedure.price;
			}, 100);
			this.HelperService.removeProcedure(serv.doctor_price_id).then((response)=>{
				if(response.status === 204){
				}
			});
		}

	}
}

export default PersonalProfileStuffMedtestsController;
