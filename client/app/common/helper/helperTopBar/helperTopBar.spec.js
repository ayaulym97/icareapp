import HelperTopBarModule from "./helperTopBar";
import HelperTopBarController from "./helperTopBar.controller";
import HelperTopBarComponent from "./helperTopBar.component";
import HelperTopBarTemplate from "./helperTopBar.html";

describe("HelperTopBar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(HelperTopBarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new HelperTopBarController();
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
			expect(HelperTopBarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = HelperTopBarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(HelperTopBarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(HelperTopBarController);
		});
	});
});
