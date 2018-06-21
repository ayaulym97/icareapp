import ClinicsSidebarModule from "./clinicsSidebar";
import ClinicsSidebarController from "./clinicsSidebar.controller";
import ClinicsSidebarComponent from "./clinicsSidebar.component";
import ClinicsSidebarTemplate from "./clinicsSidebar.html";

describe("ClinicsSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(ClinicsSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ClinicsSidebarController();
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
			expect(ClinicsSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = ClinicsSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(ClinicsSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(ClinicsSidebarController);
		});
	});
});
