import SidebarDateRequestModule from "./sidebarListItems";
import SidebarDateRequestController from "./sidebarListItems.controller";
import SidebarDateRequestComponent from "./sidebarListItems.component";
import SidebarDateRequestTemplate from "./sidebarListItems.html";

describe("SidebarDateRequest", () => {
	let $rootScope, makeController;

	beforeEach(window.module(SidebarDateRequestModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new SidebarDateRequestController();
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
			expect(SidebarDateRequestTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = SidebarDateRequestComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(SidebarDateRequestTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(SidebarDateRequestController);
		});
	});
});
