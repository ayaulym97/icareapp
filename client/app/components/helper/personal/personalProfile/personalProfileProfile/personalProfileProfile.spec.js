import PersonalProfileProfileModule from "./personalProfileProfile";
import PersonalProfileProfileController from "./personalProfileProfile.controller";
import PersonalProfileProfileComponent from "./personalProfileProfile.component";
import PersonalProfileProfileTemplate from "./personalProfileProfile.html";

describe("PersonalProfileProfile", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileProfileModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileProfileController();
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
			expect(PersonalProfileProfileTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileProfileComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileProfileTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileProfileController);
		});
	});
});
