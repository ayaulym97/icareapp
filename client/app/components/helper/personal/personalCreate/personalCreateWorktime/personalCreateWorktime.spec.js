import PersonalCreateWorktimeModule from "./personalCreateWorktime";
import PersonalCreateWorktimeController from "./personalCreateWorktime.controller";
import PersonalCreateWorktimeComponent from "./personalCreateWorktime.component";
import PersonalCreateWorktimeTemplate from "./personalCreateWorktime.html";

describe("PersonalCreateWorktime", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateWorktimeModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateWorktimeController();
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
			expect(PersonalCreateWorktimeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateWorktimeComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateWorktimeTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateWorktimeController);
		});
	});
});
