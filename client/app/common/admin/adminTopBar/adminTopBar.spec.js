import AdminTopBarModule from "./adminTopBar";
import AdminTopBarController from "./adminTopBar.controller";
import AdminTopBarComponent from "./adminTopBar.component";
import AdminTopBarTemplate from "./adminTopBar.html";

describe("AdminTopBar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AdminTopBarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AdminTopBarController();
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
			expect(AdminTopBarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AdminTopBarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AdminTopBarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AdminTopBarController);
		});
	});
});
