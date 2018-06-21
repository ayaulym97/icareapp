import PersonalCreateProfileModule from "./personalCreateProfile";
import PersonalCreateProfileController from "./personalCreateProfile.controller";
import PersonalCreateProfileComponent from "./personalCreateProfile.component";
import PersonalCreateProfileTemplate from "./personalCreateProfile.html";

describe("PersonalCreateProfile", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateProfileModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateProfileController();
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
			expect(PersonalCreateProfileTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateProfileComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateProfileTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateProfileController);
		});
	});
});
