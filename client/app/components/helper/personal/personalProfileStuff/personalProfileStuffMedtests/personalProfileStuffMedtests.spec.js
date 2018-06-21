import PersonalProfileStuffMedtestsModule from "./personalProfileStuffMedtests";
import PersonalProfileStuffMedtestsController from "./personalProfileStuffMedtests.controller";
import PersonalProfileStuffMedtestsComponent from "./personalProfileStuffMedtests.component";
import PersonalProfileStuffMedtestsTemplate from "./personalProfileStuffMedtests.html";

describe("PersonalProfileStuffMedtests", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileStuffMedtestsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileStuffMedtestsController();
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
			expect(PersonalProfileStuffMedtestsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileStuffMedtestsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileStuffMedtestsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileStuffMedtestsController);
		});
	});
});
