import AuthorizationModule from "./authorization";
import AuthorizationController from "./authorization.controller";
import AuthorizationComponent from "./authorization.component";
import AuthorizationTemplate from "./authorization.html";

describe("Authorization", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AuthorizationModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AuthorizationController();
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
			expect(AuthorizationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AuthorizationComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AuthorizationTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AuthorizationController);
		});
	});
});
