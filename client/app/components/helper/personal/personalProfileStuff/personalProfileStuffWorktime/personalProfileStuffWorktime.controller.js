import _includes from "lodash/includes";
import _without from "lodash/without";
import _range from "lodash/range";
import _find from "lodash/find";
import _isNil from "lodash/isNil";
import _filter from "lodash/filter";
import alertify from "alertifyjs/build/alertify.min";


class PersonalProfileStuffWorktimeController {
	constructor(PreloadService,HelperService, $timeout, $rootScope, $q, $stateParams, $scope, CalendarService) {
		"ngInject";
		// super(arguments);
		this.PreloadService = PreloadService;
		this.$scope = $scope;
		this.HelperService = HelperService;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.CalendarService = CalendarService;
		this.$q = $q;
		this.$stateParams = $stateParams;
		this.isLoading = true;

		this.doctor = [];
		this.doctor = _find(this.PreloadService.clinicStuffList, {id : parseInt(this.$stateParams.id)});
		this.doctor_global = _find(this.PreloadService.clinicStuffList, {id : parseInt(this.$stateParams.id)});

		this.isMoving = false;
		this.isHold = false;
		this.currentCell = null;
		this.selectedCells = [];
		this.deselectedCells = [];
		this.cells = {};
		this.lastCell = null;
		let timeRange = _range(0, 24);
		let dayRange = _range(0, 7);

		this.timeRange = [];
		this.dayRange = [];

		this.lastSelectedCells = [];

		this.workTimeInstance = this.doctor.worktime;
		// worktime creates in 30 min or 15 min, by type of Doctor
		if(this.doctor.type == 2){
			let key = 0;
			for (let i = 8; i < 56; i++) {
				let data = {
					index: i
				};
				if (i % 4 == 0) {
					key = 8 + ((i/4)-2);
					data["start"] = (key < 10 ? "0" + key : key) + ":00";
					data["end"] = ((key) < 10 ? "0" + (key) : (key)) + ":15";
				}
				if(i%4 == 1){
					data["start"] = (key < 10 ? "0" + key : key) + ":15";
					data["end"] = ((key) < 10 ? "0" + (key) : (key)) + ":30";
				}
				if(i%4 == 2){
					data["start"] = (key < 10 ? "0" + key : key) + ":30";
					data["end"] = ((key) < 10 ? "0" + (key) : (key)) + ":45";
				}
				if(i%4 == 3){
					data["start"] = (key < 10 ? "0" + key : key) + ":45";
					if(key + 1 === 24){
						data["end"] = "00:00";
					}else{
						data["end"] = ((key + 1) < 10 ? "0" + (key+1) : (key+1)) + ":00";
					}
				}
				this.timeRange.push(data);
			}
		}
		else{
			for (let i = 0; i < 48; i++) {
				let data = {
					index: i
				};
				if (i % 2 == 0) {
					let key = i / 2;
					data["start"] = (key < 10 ? "0" + key : key) + ":00";
					data["end"] = (key < 10 ? "0" + key : key) + ":30";
				} else {
					let key = Math.floor(i/2);
					data["start"] = (key < 10 ? "0" + key : key) + ":30";
					if(key + 1 === 24){
						data["end"] = "00:00";
					}else{
						data["end"] = ((key+1) < 10 ? "0" + (key+1) : (key+1)) + ":00";
					}
				}
				this.timeRange.push(data);
			}
		}


		for (var i = 1; i <= 7; i++) {
			this.dayRange.push({
				index: i
			});
		}

		if (this.doctor.hasOwnProperty("id")) {
			this.$timeout(() => {
				this.computeCells();
			}, 100);
		}
	}

	$onInit() {

	}

	backToProfile(){
		this.$scope.$emit("back");
	}

	computeCells() {
		this.isLoading = false;

		for (let i in this.cells) {
			let iItem = this.cells[i];
			for (let jItem in iItem) {
				let info = iItem[jItem];

				let findedWorkTime = _find(this.doctor.worktime, (o) => {
					return o.hour_start == info.time.start
												&& o.hour_end == info.time.end
												&& o.day == info.day.index;
				});

				if (!_isNil(findedWorkTime)) {
					info.active = true;
					this.selectedCells.push(this.cells[info.time.index][info.day.index]);
				}
			}
		}
	}

	saveTime() {
		let saveAlert = alertify.notify("Сохранение...", "success", 20);

		let currentWorktime = angular.copy(this.doctor.worktime);
		let timer = null;
		let queues = [];

		let removeWorktime = [];
		let saveWorktime = [];

		for (let nIndex in this.deselectedCells) {
			if (!this.deselectedCells.hasOwnProperty(nIndex)) continue;

			let deselected = this.deselectedCells[nIndex];
			let hour_start = deselected.time.start;
			let hour_end = deselected.time.end;
			let day = deselected.day.index;

			let workTime = _find(currentWorktime, (item) => {
				return (item.hour_start == hour_start && item.hour_end == hour_end && item.day == day);
			});

			if (_isNil(workTime)) continue;

			currentWorktime = _filter(currentWorktime, (item) => {
				return item.id != workTime.id;
			});
			removeWorktime.push(workTime.id);
		}

		if(removeWorktime.length > 0){
			this.HelperService.deleteWorktimeByList(removeWorktime).then((response)=>{
				this.doctor_global = _find(this.PreloadService.helperStuffList, {id : parseInt(this.$stateParams.id)});
				this.doctor = _find(this.PreloadService.clinicStuffList, {id : parseInt(this.$stateParams.id)});
				this.doctor.worktime = response;
				this.doctor_global.worktime = response;
				this.$timeout(()=>{
					this.backToProfile();
				}, 100);
			});
		}
		let type_worktime = 0;
		if(this.doctor.type == 2){
			type_worktime = 1;
		}
		for (let nIndex in this.selectedCells) {
			if (!this.selectedCells.hasOwnProperty(nIndex)) continue;
			let selected = this.selectedCells[nIndex];"";
			if(!selected.hasOwnProperty("time")) continue;

			let hour_start = selected.time.start;
			let hour_end = selected.time.end;
			let day = selected.day.index;

			let workTime = _find(currentWorktime, (item) => {
				return (item.hour_start == hour_start && item.hour_end == hour_end && item.day == day);
			});

			if (!_isNil(workTime)) continue;
			let instance = {};
			instance.hour_start = hour_start;
			instance.hour_end = hour_end;
			instance.day = day;
			instance.doctor = this.doctor.id;
			instance.type = type_worktime;
			saveWorktime.push(instance);
			instance.busytime = [];
			currentWorktime.push(instance);
		}
		if(saveWorktime.length > 0){
			this.HelperService.saveWorktimeByList(saveWorktime).then((response)=>{
				saveAlert.delay(2).setContent("Данные успешно сохранены!");
				this.doctor = _find(this.PreloadService.clinicStuffList, {id : parseInt(this.$stateParams.id)});
				this.doctor_global = _find(this.PreloadService.helperStuffList, {id : parseInt(this.$stateParams.id)});
				if(this.doctor && this.doctor_global){
					this.doctor.worktime = response;
					this.doctor_global.worktime = response;
				}
				this.$timeout(() => {
					this.backToProfile();
				},500);
			});
		}
	}

	attachCell(time, day) {
		if (!this.cells.hasOwnProperty(time.index)) {
			this.cells[time.index] = {};
		}

		this.cells[time.index][day.index] = {
			id: day.index,
			active: false,
			time,
			day
		};
	}

	toggleCell(item) {
		if (!_includes(this.selectedCells, item)) {
			item.active = true;
			this.selectedCells.push(item);
			this.deselectedCells = _without(this.deselectedCells, item);
		} else {
			item.active = false;
			if (!_includes(this.deselectedCells, item)) {
				this.deselectedCells.push(item);
			}
			this.selectedCells = _without(this.selectedCells, item);
		}
	}

	mouseClick(event){
		let item = event.target;
		let row = parseInt(item.dataset["row"]);
		let col = parseInt(item.dataset["cell"]);
		item = this.cells[row][col];
		this.toggleCell(item);
	}

	mouseUp(item) {
		this.isHold = false;

		if (this.isMoving) {
			this.isMoving = false;
		}

		if (item.hasOwnProperty("target")) {
			item = item.target;
			if (!this.isMoving && item == this.currentCell) {
				this.currentCell = null;

				return;
			}

			if (item.dataset.hasOwnProperty("row") && item.dataset.hasOwnProperty("cell")) {
				let row = parseInt(item.dataset["row"]);
				let col = parseInt(item.dataset["cell"]);
				item = this.cells[row][col];
			}
		}

		this.toggleCell(item);
		this.currentCell = null;

	}

	mouseDown() {
		this.isHold = true;
	}

	mouseMove(e) {
		let target = e.target;
		this.isMoving = true;

		if (!this.isHold || target == this.currentCell) {
			return;
		}

		if (!target.dataset.hasOwnProperty("row") && !target.dataset.hasOwnProperty("cell")) {
			return;
		}

		this.lastCell = this.currentCell;
		this.currentCell = target;

		let row = parseInt(target.dataset["row"]);
		let col = parseInt(target.dataset["cell"]);
		let item = this.cells[row][col];
		this.toggleCell(item);
	}
}

export default PersonalProfileStuffWorktimeController;
