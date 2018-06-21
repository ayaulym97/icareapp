import PersonEducationModule from "./personEducation";
import PersonEducationController from "./personEducation.controller";
import PersonEducationComponent from "./personEducation.component";
import PersonEducationTemplate from "./personEducation.html";

describe("PersonEducation", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonEducationModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonEducationController();
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
			expect(PersonEducationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonEducationComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonEducationTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonEducationController);
		});
	});
});
