import ApprovedRequestModule from "./approvedRequest";
import ApprovedRequestController from "./approvedRequest.controller";
import ApprovedRequestComponent from "./approvedRequest.component";
import ApprovedRequestTemplate from "./approvedRequest.html";

describe("ApprovedRequest", () => {
	let $rootScope, makeController;

	beforeEach(window.module(ApprovedRequestModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ApprovedRequestController();
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
			expect(ApprovedRequestTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = ApprovedRequestComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(ApprovedRequestTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(ApprovedRequestController);
		});
	});
});
