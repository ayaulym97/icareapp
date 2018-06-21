import PersonalProfileWorktimeModule from "./personalProfileWorktime";
import PersonalProfileWorktimeController from "./personalProfileWorktime.controller";
import PersonalProfileWorktimeComponent from "./personalProfileWorktime.component";
import PersonalProfileWorktimeTemplate from "./personalProfileWorktime.html";

describe("PersonalProfileWorktime", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileWorktimeModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileWorktimeController();
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
			expect(PersonalProfileWorktimeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileWorktimeComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileWorktimeTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileWorktimeController);
		});
	});
});
