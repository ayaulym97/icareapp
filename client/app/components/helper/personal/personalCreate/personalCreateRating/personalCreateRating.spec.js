import PersonalCreateRatingModule from "./personalCreateRating";
import PersonalCreateRatingController from "./personalCreateRating.controller";
import PersonalCreateRatingComponent from "./personalCreateRating.component";
import PersonalCreateRatingTemplate from "./personalCreateRating.html";

describe("PersonalCreateRating", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateRatingModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateRatingController();
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
			expect(PersonalCreateRatingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateRatingComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateRatingTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateRatingController);
		});
	});
});
