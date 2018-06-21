import PersonalCreateModule from "./personalCreate";
import PersonalCreateController from "./personalCreate.controller";
import PersonalCreateComponent from "./personalCreate.component";
import PersonalCreateTemplate from "./personalCreate.html";

describe("PersonalCreate", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateController();
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
			expect(PersonalCreateTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateController);
		});
	});
});
