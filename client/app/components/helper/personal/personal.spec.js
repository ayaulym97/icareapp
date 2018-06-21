import PersonalModule from "./personal";
import PersonalController from "./personal.controller";
import PersonalComponent from "./personal.component";
import PersonalTemplate from "./personal.html";

describe("Personal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalController();
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
			expect(PersonalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalController);
		});
	});
});
