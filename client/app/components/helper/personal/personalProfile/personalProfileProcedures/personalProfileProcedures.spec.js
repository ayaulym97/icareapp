import PersonalProfileProceduresModule from "./personalProfileProcedures";
import PersonalProfileProceduresController from "./personalProfileProcedures.controller";
import PersonalProfileProceduresComponent from "./personalProfileProcedures.component";
import PersonalProfileProceduresTemplate from "./personalProfileProcedures.html";

describe("PersonalProfileProcedures", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileProceduresModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileProceduresController();
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
			expect(PersonalProfileProceduresTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileProceduresComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileProceduresTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileProceduresController);
		});
	});
});
