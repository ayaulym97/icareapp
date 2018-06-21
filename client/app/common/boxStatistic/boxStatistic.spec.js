import BoxStatisticModule from "./boxStatistic";
import BoxStatisticController from "./boxStatistic.controller";
import BoxStatisticComponent from "./boxStatistic.component";
import BoxStatisticTemplate from "./boxStatistic.html";

describe("BoxStatistic", () => {
	let $rootScope, makeController;

	beforeEach(window.module(BoxStatisticModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BoxStatisticController();
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
			expect(BoxStatisticTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = BoxStatisticComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(BoxStatisticTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(BoxStatisticController);
		});
	});
});
