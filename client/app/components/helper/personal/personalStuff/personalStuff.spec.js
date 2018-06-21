import PersonalStuffModule from "./personalStuff";
import PersonalStuffController from "./personalStuff.controller";
import PersonalStuffComponent from "./personalStuff.component";
import PersonalStuffTemplate from "./personalStuff.html";

describe("PersonalStuff", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalStuffModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalStuffController();
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
			expect(PersonalStuffTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalStuffComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalStuffTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalStuffController);
		});
	});
});
