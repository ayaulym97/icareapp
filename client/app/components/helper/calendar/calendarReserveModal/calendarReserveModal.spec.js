import CalendarReserveModalModule from "./calendarReserveModal";
import CalendarReserveModalController from "./calendarReserveModal.controller";
import CalendarReserveModalComponent from "./calendarReserveModal.component";
import CalendarReserveModalTemplate from "./calendarReserveModal.html";

describe("CalendarReserveModal", () => {
	let $rootScope, makeController;

	beforeEach(window.module(CalendarReserveModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new CalendarReserveModalController();
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
			expect(CalendarReserveModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = CalendarReserveModalComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(CalendarReserveModalTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(CalendarReserveModalController);
		});
	});
});
