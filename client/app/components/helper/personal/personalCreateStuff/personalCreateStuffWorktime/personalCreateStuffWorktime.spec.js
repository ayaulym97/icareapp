import PersonalCreateStuffWorktimeModule from "./personalCreateStuffWorktime";
import PersonalCreateStuffWorktimeController from "./personalCreateStuffWorktime.controller";
import PersonalCreateStuffWorktimeComponent from "./personalCreateStuffWorktime.component";
import PersonalCreateStuffWorktimeTemplate from "./personalCreateStuffWorktime.html";

describe("PersonalCreateStuffWorktime", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateStuffWorktimeModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateStuffWorktimeController();
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
			expect(PersonalCreateStuffWorktimeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateStuffWorktimeComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateStuffWorktimeTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateStuffWorktimeController);
		});
	});
});
