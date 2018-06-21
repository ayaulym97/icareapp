import PersonalProfileStuffProceduresModule from "./personalProfileStuffProcedures";
import PersonalProfileStuffProceduresController from "./personalProfileStuffProcedures.controller";
import PersonalProfileStuffProceduresComponent from "./personalProfileStuffProcedures.component";
import PersonalProfileStuffProceduresTemplate from "./personalProfileStuffProcedures.html";

describe("PersonalProfileStuffProcedures", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileStuffProceduresModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileStuffProceduresController();
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
			expect(PersonalProfileStuffProceduresTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileStuffProceduresComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileStuffProceduresTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileStuffProceduresController);
		});
	});
});
