import ClinicsModule from "./clinics";
import ClinicsController from "./clinics.controller";
import ClinicsComponent from "./clinics.component";
import ClinicsTemplate from "./clinics.html";

describe("Clinics", () => {
	let $rootScope, makeController;

	beforeEach(window.module(ClinicsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ClinicsController();
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
			expect(ClinicsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = ClinicsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(ClinicsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(ClinicsController);
		});
	});
});
