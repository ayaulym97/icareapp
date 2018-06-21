import AdminModule from "./admin";
import AdminController from "./admin.controller";
import AdminComponent from "./admin.component";
import AdminTemplate from "./admin.html";

describe("Admin", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AdminModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AdminController();
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
			expect(AdminTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AdminComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AdminTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AdminController);
		});
	});
});
