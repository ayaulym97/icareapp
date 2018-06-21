import PersonalProfileRatingModule from "./personalProfileRating";
import PersonalProfileRatingController from "./personalProfileRating.controller";
import PersonalProfileRatingComponent from "./personalProfileRating.component";
import PersonalProfileRatingTemplate from "./personalProfileRating.html";

describe("PersonalProfileRating", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileRatingModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileRatingController();
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
			expect(PersonalProfileRatingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileRatingComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileRatingTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileRatingController);
		});
	});
});
