import HelperStatisticsModule from "./helperStatistics";
import HelperStatisticsController from "./helperStatistics.controller";
import HelperStatisticsComponent from "./helperStatistics.component";
import HelperStatisticsTemplate from "./helperStatistics.html";

describe("HelperStatistics", () => {
	let $rootScope, makeController;

	beforeEach(window.module(HelperStatisticsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new HelperStatisticsController();
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
			expect(HelperStatisticsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = HelperStatisticsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(HelperStatisticsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(HelperStatisticsController);
		});
	});
});
