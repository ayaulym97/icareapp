import PersonalCreateStuffRatingModule from "./personalCreateStuffRating";
import PersonalCreateStuffRatingController from "./personalCreateStuffRating.controller";
import PersonalCreateStuffRatingComponent from "./personalCreateStuffRating.component";
import PersonalCreateStuffRatingTemplate from "./personalCreateStuffRating.html";

describe("PersonalCreateStuffRating", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalCreateStuffRatingModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalCreateStuffRatingController();
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
			expect(PersonalCreateStuffRatingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalCreateStuffRatingComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalCreateStuffRatingTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalCreateStuffRatingController);
		});
	});
});
