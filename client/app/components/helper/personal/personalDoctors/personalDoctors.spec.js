import PersonalDoctorsModule from "./personalDoctors";
import PersonalDoctorsController from "./personalDoctors.controller";
import PersonalDoctorsComponent from "./personalDoctors.component";
import PersonalDoctorsTemplate from "./personalDoctors.html";

describe("PersonalDoctors", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalDoctorsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalDoctorsController();
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
			expect(PersonalDoctorsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalDoctorsComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalDoctorsTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalDoctorsController);
		});
	});
});
