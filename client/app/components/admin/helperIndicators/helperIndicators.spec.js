import HelperIndicatorsModule from "./helperIndicators";
import HelperIndicatorsController from "./helperIndicators.controller";
import HelperIndicatorsComponent from "./helperIndicators.component";
import HelperIndicatorsTemplate from "./helperIndicators.html";

describe("HelperIndicators", () => {
	let $rootScope, makeController;

	beforeEach(window.module(HelperIndicatorsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new HelperIndicatorsController();
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
			expect(HelperIndicatorsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = HelperIndicatorsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(HelperIndicatorsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(HelperIndicatorsController);
		});
	});
});
