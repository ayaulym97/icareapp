import PersonalCreateStuffMedtestsModule from "./personalCreateStuffMedtests";
import PersonalCreateStuffMedtestsController from "./personalCreateStuffMedtests.controller";
import PersonalCreateStuffMedtestsComponent from "./personalCreateStuffMedtests.component";
import PersonalCreateStuffMedtestsTemplate from "./personalCreateStuffMedtests.html";

describe("PersonalCreateStuffMedtests", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateStuffMedtestsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateStuffMedtestsController();
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
			expect(PersonalCreateStuffMedtestsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateStuffMedtestsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateStuffMedtestsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateStuffMedtestsController);
		});
	});
});
