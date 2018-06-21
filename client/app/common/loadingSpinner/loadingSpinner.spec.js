import LoadingSpinnerModule from "./loadingSpinner";
import LoadingSpinnerController from "./loadingSpinner.controller";
import LoadingSpinnerComponent from "./loadingSpinner.component";
import LoadingSpinnerTemplate from "./loadingSpinner.html";

describe("LoadingSpinner", () => {
	let $rootScope, makeController;

	beforeEach(window.module(LoadingSpinnerModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new LoadingSpinnerController();
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
			expect(LoadingSpinnerTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = LoadingSpinnerComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(LoadingSpinnerTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(LoadingSpinnerController);
		});
	});
});
