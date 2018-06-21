import AdminStatisticsModule from "./adminStatistics";
import AdminStatisticsController from "./adminStatistics.controller";
import AdminStatisticsComponent from "./adminStatistics.component";
import AdminStatisticsTemplate from "./adminStatistics.html";

describe("AdminStatistics", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AdminStatisticsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AdminStatisticsController();
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
			expect(AdminStatisticsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AdminStatisticsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AdminStatisticsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AdminStatisticsController);
		});
	});
});
