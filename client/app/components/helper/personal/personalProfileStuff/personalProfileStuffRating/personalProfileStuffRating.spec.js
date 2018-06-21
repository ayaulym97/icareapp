import PersonalProfileStuffRatingModule from "./personalProfileStuffRating";
import PersonalProfileStuffRatingController from "./personalProfileStuffRating.controller";
import PersonalProfileStuffRatingComponent from "./personalProfileStuffRating.component";
import PersonalProfileStuffRatingTemplate from "./personalProfileStuffRating.html";

describe("PersonalProfileStuffRating", () => {
	let $rootScope, makeController;

	beforeEach(window.module(PersonalProfileStuffRatingModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PersonalProfileStuffRatingController();
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
			expect(PersonalProfileStuffRatingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = PersonalProfileStuffRatingComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(PersonalProfileStuffRatingTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(PersonalProfileStuffRatingController);
		});
	});
});
