import PersonalProfileMedtestsModule from "./personalProfileMedtests";
import PersonalProfileMedtestsController from "./personalProfileMedtests.controller";
import PersonalProfileMedtestsComponent from "./personalProfileMedtests.component";
import PersonalProfileMedtestsTemplate from "./personalProfileMedtests.html";

describe("PersonalProfileMedtests", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileMedtestsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileMedtestsController();
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
			expect(PersonalProfileMedtestsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileMedtestsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileMedtestsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileMedtestsController);
		});
	});
});
