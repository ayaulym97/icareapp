import SupportTopBarModule from "./supportTopBar";
import SupportTopBarController from "./supportTopBar.controller";
import SupportTopBarComponent from "./supportTopBar.component";
import SupportTopBarTemplate from "./supportTopBar.html";

describe("SupportTopBar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(SupportTopBarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new SupportTopBarController();
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
			expect(SupportTopBarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = SupportTopBarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(SupportTopBarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(SupportTopBarController);
		});
	});
});
