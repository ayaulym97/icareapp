import PersonalProfileModule from "./personalProfile";
import PersonalProfileController from "./personalProfile.controller";
import PersonalProfileComponent from "./personalProfile.component";
import PersonalProfileTemplate from "./personalProfile.html";

describe("PersonalProfile", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileController();
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
			expect(PersonalProfileTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileController);
		});
	});
});
