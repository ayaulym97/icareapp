import deleteDoctorModalModule from "./deleteDoctorModal";
import deleteDoctorModalController from "./deleteDoctorModal.controller";
import deleteDoctorModalComponent from "./deleteDoctorModal.component";
import deleteDoctorModalTemplate from "./deleteDoctorModal.html";

describe("deleteDoctorModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(deleteDoctorModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new deleteDoctorModalController();
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
			expect(deleteDoctorModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = deleteDoctorModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(deleteDoctorModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(deleteDoctorModalController);
		});
	});
});
