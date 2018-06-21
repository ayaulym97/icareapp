import AdminStatisticsSidebarModule from "./adminStatisticsSidebar";
import AdminStatisticsSidebarController from "./adminStatisticsSidebar.controller";
import AdminStatisticsSidebarComponent from "./adminStatisticsSidebar.component";
import AdminStatisticsSidebarTemplate from "./adminStatisticsSidebar.html";

describe("AdminStatisticsSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AdminStatisticsSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AdminStatisticsSidebarController();
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
			expect(AdminStatisticsSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AdminStatisticsSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AdminStatisticsSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AdminStatisticsSidebarController);
		});
	});
});
