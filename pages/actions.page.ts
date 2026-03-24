import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ActionsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageNavTitle() {
    return this.page.getByRole("navigation");
  }

  get mainHeader() {
    return this.page.getByRole("heading").locator(":scope#main-header");
  }

  get bigSections() {
    return this.page.locator(".col-lg-6");
  }

  get tinyHoverSection() {
    return this.page.locator("#div-hover");
  }

  get tinyClickBox() {
    return this.page.locator("#click-box");
  }

  // --- Drag and Drop ---
  get dragDropSectionFirst() {
    return this.page.locator("#div-drag-drop-thumbnail").first();
  }

  get dragDropSectionLast() {
    return this.page.locator("#div-drag-drop-thumbnail").last();
  }

  draggable(section: Locator) {
    return section.locator("#draggable");
  }

  droppable(section: Locator) {
    return section.locator("#droppable");
  }

  // --- Double Click ---
  get doubleClickButton() {
    return this.dragDropSectionLast.locator("#double-click");
  }

  // --- Hover ---
  get hoverSection() {
    return this.page.locator("#div-hover");
  }

  get hoverButtons() {
    return this.hoverSection.locator(".dropbtn");
  }

  get hoverAlerts() {
    return this.hoverSection.locator(".list-alert");
  }

  // --- Click and Hold ---
  get clickAndHoldBox() {
    return this.page.locator("#click-box");
  }
}
