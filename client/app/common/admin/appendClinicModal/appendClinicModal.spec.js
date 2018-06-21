import AppendClinicModalModule from "./appendClinicModal";
import AppendClinicModalController from "./appendClinicModal.controller";
import AppendClinicModalComponent from "./appendClinicModal.component";
import AppendClinicModalTemplate from "./appendClinicModal.html";

describe("AppendClinicModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AppendClinicModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AppendClinicModalController();
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
			expect(AppendClinicModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AppendClinicModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AppendClinicModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AppendClinicModalController);
		});
	});
});
