import helperIndicatorsSidebarModule from "./helperIndicatorsSidebar";
import helperIndicatorsSidebarController from "./helperIndicatorsSidebar.controller";
import helperIndicatorsSidebarComponent from "./helperIndicatorsSidebar.component";
import helperIndicatorsSidebarTemplate from "./helperIndicatorsSidebar.html";

describe("helperIndicatorsSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(helperIndicatorsSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new helperIndicatorsSidebarController();
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
			expect(helperIndicatorsSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = helperIndicatorsSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(helperIndicatorsSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(helperIndicatorsSidebarController);
		});
	});
});
