import PersonalProfileStuffModule from "./personalProfileStuff";
import PersonalProfileStuffController from "./personalProfileStuff.controller";
import PersonalProfileStuffComponent from "./personalProfileStuff.component";
import PersonalProfileStuffTemplate from "./personalProfileStuff.html";

describe("PersonalProfileStuff", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileStuffModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileStuffController();
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
			expect(PersonalProfileStuffTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileStuffComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileStuffTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileStuffController);
		});
	});
});
