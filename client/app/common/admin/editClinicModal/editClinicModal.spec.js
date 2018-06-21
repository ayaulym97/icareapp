import EditClinicModalModule from "./editClinicModal";
import EditClinicModalController from "./editClinicModal.controller";
import EditClinicModalComponent from "./editClinicModal.component";
import EditClinicModalTemplate from "./editClinicModal.html";

describe("EditClinicModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(EditClinicModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new EditClinicModalController();
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
			expect(EditClinicModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = EditClinicModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(EditClinicModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(EditClinicModalController);
		});
	});
});
