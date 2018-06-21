import BoxTotalStatisticModule from "./boxTotalStatistic";
import BoxTotalStatisticController from "./boxTotalStatistic.controller";
import BoxTotalStatisticComponent from "./boxTotalStatistic.component";
import BoxTotalStatisticTemplate from "./boxTotalStatistic.html";

describe("BoxTotalStatistic", () => {
	let $rootScope, makeController;

	beforeEach(window.module(BoxTotalStatisticModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BoxTotalStatisticController();
		};
	}));

	describe("Module", () => {
		// top-level specs: i.e., routes, injection, naming
	});

	describe("Controller", () => {
		// controller specs
		it("has a name property [REMOVE]", () => { // erase if removing this.name from the controller
			let controller = makeController();
			expect(controller).to.have.property("name");
		});
	});

	describe("Template", () => {
		// template specs
		// tip: use regex to ensure correct bindings are used e.g., {{  }}
		it("has name in template [REMOVE]", () => {
			expect(BoxTotalStatisticTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = BoxTotalStatisticComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(BoxTotalStatisticTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(BoxTotalStatisticController);
		});
	});
});
