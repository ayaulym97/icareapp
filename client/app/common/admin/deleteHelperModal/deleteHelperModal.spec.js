import DeleteHelperModalModule from "./deleteHelperModal";
import DeleteHelperModalController from "./deleteHelperModal.controller";
import DeleteHelperModalComponent from "./deleteHelperModal.component";
import DeleteHelperModalTemplate from "./deleteHelperModal.html";

describe("DeleteHelperModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(DeleteHelperModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new DeleteHelperModalController();
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
			expect(DeleteHelperModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = DeleteHelperModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(DeleteHelperModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(DeleteHelperModalController);
		});
	});
});
