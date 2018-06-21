import PersonalMedtestsModule from "./personalMedtests";
import PersonalMedtestsController from "./personalMedtests.controller";
import PersonalMedtestsComponent from "./personalMedtests.component";
import PersonalMedtestsTemplate from "./personalMedtests.html";

describe("PersonalMedtests", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalMedtestsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalMedtestsController();
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
			expect(PersonalMedtestsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalMedtestsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalMedtestsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalMedtestsController);
		});
	});
});
