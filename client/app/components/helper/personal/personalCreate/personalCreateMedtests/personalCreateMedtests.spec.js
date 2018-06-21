import PersonalCreateMedtestsModule from "./personalCreateMedtests";
import PersonalCreateMedtestsController from "./personalCreateMedtests.controller";
import PersonalCreateMedtestsComponent from "./personalCreateMedtests.component";
import PersonalCreateMedtestsTemplate from "./personalCreateMedtests.html";

describe("PersonalCreateMedtests", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateMedtestsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateMedtestsController();
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
			expect(PersonalCreateMedtestsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateMedtestsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateMedtestsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateMedtestsController);
		});
	});
});
