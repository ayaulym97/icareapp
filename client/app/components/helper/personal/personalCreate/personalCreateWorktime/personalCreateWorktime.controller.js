import _includes from "lodash/includes";
import _without from "lodash/without";
// import _range from "lodash/range";
import _find from "lodash/find";
import _isNil from "lodash/isNil";
import _filter from "lodash/filter";
// import alertify from "alertifyjs/build/alertify.min";


class PersonalProfileWorktimeController {
	constructor(PreloadService,HelperService, $timeout, $rootScope, $q, $stateParams, $scope) {
		"ngInject";
		// super(arguments);
		this.PreloadService = PreloadService;
		this.$scope = $scope;
		this.HelperService = HelperService;
		this.$timeout = $timeout;
		this.$rootScope = $rootScope;
		this.$q = $q;
		this.$stateParams = $stateParams;
		this.isLoading = true;
		// console.log(this.info, "DATA");
		// this.id = this.$stateParams.id;
		this.worktimeList = [];
		// this.globalWorktime = this.info;
		// console.log(this.info, "GLOBAL WORKTIME");


		this.isMoving = false;
		this.isHold = false;
		this.currentCell = null;
		this.selectedCells = [];
		this.deselectedCells = [];
		this.cells = {};
		this.lastCell = null;

		// let timeRange = _range(0, 23);
		// let dayRange = _range(0, 7);

		this.timeRange = [];
		this.dayRange = [];

		this.lastSelectedCells = [];

		this.workTimeInstance = this.worktimeList;

		let type_work = 1;
		// creating indexes to Calendar, if type_work - parameter to find, which type Doctor will have. 0 - simple doctor, 1 - med test doctor
		if(type_work == 0){
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
					data["end"] = ((key+1) < 10 ? "0" + (key+1) : (key+1)) + ":00";
				}
				this.timeRange.push(data);
			}
		}
		else{
			for (let i = 0; i < 46; i++) {
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
					data["end"] = ((key+1) < 10 ? "0" + (key+1) : (key+1)) + ":00";
				}
				this.timeRange.push(data);
			}
		}

		for (let i = 1; i <= 7; i++) {
			this.dayRange.push({
				index: i
			});
		}

		this.$timeout(() => {
			this.computeCells();
		}, 100);
	}

	$onInit() {
		this.setWorktime();
	}
	setWorktime(){
		this.worktimeList = this.info;
		// console.log(this.worktime);
	}

	backToProfile(){
		this.saveTime();
		this.$scope.$emit("back");
	}

	computeCells() {
		this.isLoading = false;
		// console.log("CALLING COMPUTE", this.cells);

		for (let i in this.cells) {
			let iItem = this.cells[i];
			for (let jItem in iItem) {
				let info = iItem[jItem];

				let findedWorkTime = _find(this.worktimeList, (o) => {
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
		let currentWorktime = angular.copy(this.worktimeList);
		// let timer = null;
		// let queues = [];

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
		}

		for (let nIndex in this.selectedCells) {
			if (!this.selectedCells.hasOwnProperty(nIndex)) continue;
			let selected = this.selectedCells[nIndex];
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
			if (!currentWorktime.includes(instance)) currentWorktime.push(instance);

		}
		this.$rootScope.$broadcast("Personal.Create.Worktime", {
			worktimeList: currentWorktime
		});
		this.$scope.$emit("back");
	}

	attachCell(time, day) {
		if (!this.cells.hasOwnProperty(time.index)) this.cells[time.index] = {};

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

	mouseUp(item) {
		this.isHold = false;

		if (this.isMoving) this.isMoving = false;

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

	mouseClick(event){
		let item = event.target;
		let row = parseInt(item.dataset["row"]);
		let col = parseInt(item.dataset["cell"]);
		item = this.cells[row][col];
		this.toggleCell(item);
	}

	mouseDown() {
		this.isHold = true;
	}

	mouseMove(e) {
		let target = e.target;
		this.isMoving = true;

		if (!this.isHold || target == this.currentCell) return;

		if (!target.dataset.hasOwnProperty("row") && !target.dataset.hasOwnProperty("cell")) return;

		this.lastCell = this.currentCell;
		this.currentCell = target;

		let row = parseInt(target.dataset["row"]);
		let col = parseInt(target.dataset["cell"]);
		let item = this.cells[row][col];
		this.toggleCell(item);
	}
}

export default PersonalProfileWorktimeController;
