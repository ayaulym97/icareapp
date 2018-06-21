import PersonalCreateStuffProfileModule from "./personalCreateStuffProfile";
import PersonalCreateStuffProfileController from "./personalCreateStuffProfile.controller";
import PersonalCreateStuffProfileComponent from "./personalCreateStuffProfile.component";
import PersonalCreateStuffProfileTemplate from "./personalCreateStuffProfile.html";

describe("PersonalCreateStuffProfile", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateStuffProfileModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateStuffProfileController();
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
			expect(PersonalCreateStuffProfileTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateStuffProfileComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateStuffProfileTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateStuffProfileController);
		});
	});
});
