import CalendarSidebarModule from "./calendarSidebar";
import CalendarSidebarController from "./calendarSidebar.controller";
import CalendarSidebarComponent from "./calendarSidebar.component";
import CalendarSidebarTemplate from "./calendarSidebar.html";

describe("CalendarSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(CalendarSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new CalendarSidebarController();
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
			expect(CalendarSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = CalendarSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(CalendarSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(CalendarSidebarController);
		});
	});
});
