import PersonalCreateStuffModule from "./personalCreateStuff";
import PersonalCreateStuffController from "./personalCreateStuff.controller";
import PersonalCreateStuffComponent from "./personalCreateStuff.component";
import PersonalCreateStuffTemplate from "./personalCreateStuff.html";

describe("PersonalCreateStuff", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateStuffModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateStuffController();
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
			expect(PersonalCreateStuffTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateStuffComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateStuffTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateStuffController);
		});
	});
});
