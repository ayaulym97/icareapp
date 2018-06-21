import SupportModule from "./support";
import SupportController from "./support.controller";
import SupportComponent from "./support.component";
import SupportTemplate from "./support.html";

describe("Support", () => {
	let $rootScope, makeController;

	beforeEach(window.module(SupportModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new SupportController();
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
			expect(SupportTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = SupportComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(SupportTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(SupportController);
		});
	});
});
