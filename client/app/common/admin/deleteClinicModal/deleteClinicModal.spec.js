import DeleteClinicModalModule from "./deleteClinicModal";
import DeleteClinicModalController from "./deleteClinicModal.controller";
import DeleteClinicModalComponent from "./deleteClinicModal.component";
import DeleteClinicModalTemplate from "./deleteClinicModal.html";

describe("DeleteClinicModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(DeleteClinicModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new DeleteClinicModalController();
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
			expect(DeleteClinicModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = DeleteClinicModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(DeleteClinicModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(DeleteClinicModalController);
		});
	});
});
