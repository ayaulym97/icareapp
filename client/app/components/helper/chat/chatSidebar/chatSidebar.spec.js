import ChatSidebarModule from "./chatSidebar";
import ChatSidebarController from "./chatSidebar.controller";
import ChatSidebarComponent from "./chatSidebar.component";
import ChatSidebarTemplate from "./chatSidebar.html";

describe("ChatSidebar", () => {
	let $rootScope, makeController;

	beforeEach(window.module(ChatSidebarModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ChatSidebarController();
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
			expect(ChatSidebarTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe("Component", () => {
		// component/directive specs
		let component = ChatSidebarComponent;

		it("includes the intended template", () => {
			expect(component.template).to.equal(ChatSidebarTemplate);
		});

		it("invokes the right controller", () => {
			expect(component.controller).to.equal(ChatSidebarController);
		});
	});
});
