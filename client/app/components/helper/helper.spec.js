import HelperModule from "./helper";
import HelperController from "./helper.controller";
import HelperComponent from "./helper.component";
import HelperTemplate from "./helper.html";

describe("Helper", () => {
	let $rootScope, makeController;

	beforeEach(window.module(HelperModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new HelperController();
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
			expect(HelperTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = HelperComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(HelperTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(HelperController);
		});
	});
});
