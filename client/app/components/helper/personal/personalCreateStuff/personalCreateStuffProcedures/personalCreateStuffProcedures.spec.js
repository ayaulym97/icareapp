import PersonalCreateStuffProceduresModule from "./personalCreateStuffProcedures";
import PersonalCreateStuffProceduresController from "./personalCreateStuffProcedures.controller";
import PersonalCreateStuffProceduresComponent from "./personalCreateStuffProcedures.component";
import PersonalCreateStuffProceduresTemplate from "./personalCreateStuffProcedures.html";

describe("PersonalCreateStuffProcedures", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateStuffProceduresModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateStuffProceduresController();
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
			expect(PersonalCreateStuffProceduresTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateStuffProceduresComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateStuffProceduresTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateStuffProceduresController);
		});
	});
});
