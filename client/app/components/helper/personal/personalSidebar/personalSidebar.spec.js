import PersonalSidebarModule from "./personalSidebar";
import PersonalSidebarController from "./personalSidebar.controller";
import PersonalSidebarComponent from "./personalSidebar.component";
import PersonalSidebarTemplate from "./personalSidebar.html";

describe("PersonalSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalSidebarController();
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
			expect(PersonalSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalSidebarController);
		});
	});
});
