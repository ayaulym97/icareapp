import PersonQualificationModule from "./personQualification";
import PersonQualificationController from "./personQualification.controller";
import PersonQualificationComponent from "./personQualification.component";
import PersonQualificationTemplate from "./personQualification.html";

describe("PersonQualification", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonQualificationModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonQualificationController();
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
			expect(PersonQualificationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonQualificationComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonQualificationTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonQualificationController);
		});
	});
});
