import PersonalProfileStuffProfileModule from "./personalProfileStuffProfile";
import PersonalProfileStuffProfileController from "./personalProfileStuffProfile.controller";
import PersonalProfileStuffProfileComponent from "./personalProfileStuffProfile.component";
import PersonalProfileStuffProfileTemplate from "./personalProfileStuffProfile.html";

describe("PersonalProfileStuffProfile", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileStuffProfileModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileStuffProfileController();
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
			expect(PersonalProfileStuffProfileTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileStuffProfileComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileStuffProfileTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileStuffProfileController);
		});
	});
});
