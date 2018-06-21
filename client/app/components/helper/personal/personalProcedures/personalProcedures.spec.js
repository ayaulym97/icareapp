import PersonalProceduresModule from "./personalProcedures";
import PersonalProceduresController from "./personalProcedures.controller";
import PersonalProceduresComponent from "./personalProcedures.component";
import PersonalProceduresTemplate from "./personalProcedures.html";

describe("PersonalProcedures", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProceduresModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProceduresController();
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
			expect(PersonalProceduresTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProceduresComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProceduresTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProceduresController);
		});
	});
});
