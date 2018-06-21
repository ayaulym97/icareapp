import _find from "lodash/find";

class PersonalCreateController {
	constructor (PreloadService, AuthorizationService, $timeout, $rootScope,$scope) {
		"ngInject";
		this.PreloadService = PreloadService;
		this.AuthorizationService = AuthorizationService;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.personalCreateState = "profile";

		if(this.$rootScope.lastSelectedHelper === null){
			console.log("[Personal] Helper is null");
			this.helperCreate = this.AuthorizationService.user;
		} else {
			console.log("[Personal] Helper is not null");
			this.helperCreate= this.$rootScope.lastSelectedHelper;
		}

		//Sample of Doctor Profile
		this.personalCreateData = {
			id:-1000,
			avatar: null,
			lastCroppedDataUrl:null,
			place: this.AuthorizationService.user.place,
			full_name: null,
			helper: this.helperCreate,
			status: 0,
			type: 0,
			email: null,
			allowed_type: [0, 1, 2],
			category: [],
			hours: 0,
			rating: 0,
			education: [],
			qualification: [],
			consultation: [],
			experience: null,
			service: [],
			procedureService:[],
			medtestService:[],
			speciality: [],
			worktime: []
		};

		this.proceduresLength= [];
		this.medtestLength = [];

		this.backToProfile = this.$scope.$on("back",(event) => this.back() );
		this.saveWortime = this.$scope.$on("Personal.Create.Worktime",(event,data) => this.changeWorktime(data));
	}

	changeWorktime(data){
		this.$timeout(()=>{
			this.personalCreateData.worktime = data.worktimeList;
		}, 100);
	}

	changePersonalState(state) {
		this.personalCreateState = state;
	}
	back(){
		this.personalCreateState = "profile";
	}



}

export default PersonalCreateController;
