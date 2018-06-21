import HelperStatisticsSidebarModule from "./helperStatisticsSidebar";
import HelperStatisticsSidebarController from "./helperStatisticsSidebar.controller";
import HelperStatisticsSidebarComponent from "./helperStatisticsSidebar.component";
import HelperStatisticsSidebarTemplate from "./helperStatisticsSidebar.html";

describe("HelperStatisticsSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(HelperStatisticsSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new HelperStatisticsSidebarController();
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
			expect(HelperStatisticsSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = HelperStatisticsSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(HelperStatisticsSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(HelperStatisticsSidebarController);
		});
	});
});
