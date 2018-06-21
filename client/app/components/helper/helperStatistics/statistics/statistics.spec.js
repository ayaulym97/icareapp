import StatisticsModule from "./statistics";
import StatisticsController from "./statistics.controller";
import StatisticsComponent from "./statistics.component";
import StatisticsTemplate from "./statistics.html";

describe("Statistics", () => {
	let $rootScope, makeController;

	beforeEach(window.module(StatisticsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new StatisticsController();
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
			expect(StatisticsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = StatisticsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(StatisticsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(StatisticsController);
		});
	});
});
