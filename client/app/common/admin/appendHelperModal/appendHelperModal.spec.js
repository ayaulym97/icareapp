import AppendHelperModalModule from "./appendHelperModal";
import AppendHelperModalController from "./appendHelperModal.controller";
import AppendHelperModalComponent from "./appendHelperModal.component";
import AppendHelperModalTemplate from "./appendHelperModal.html";

describe("AppendHelperModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(AppendHelperModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AppendHelperModalController();
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
			expect(AppendHelperModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = AppendHelperModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(AppendHelperModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(AppendHelperModalController);
		});
	});
});
