import PersonalProfileStuffWorktimeModule from "./personalProfileStuffWorktime";
import PersonalProfileStuffWorktimeController from "./personalProfileStuffWorktime.controller";
import PersonalProfileStuffWorktimeComponent from "./personalProfileStuffWorktime.component";
import PersonalProfileStuffWorktimeTemplate from "./personalProfileStuffWorktime.html";

describe("PersonalProfileStuffWorktime", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileStuffWorktimeModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileStuffWorktimeController();
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
			expect(PersonalProfileStuffWorktimeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileStuffWorktimeComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileStuffWorktimeTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileStuffWorktimeController);
		});
	});
});
