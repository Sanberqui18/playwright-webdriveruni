import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PopupAlertsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageNavTitle() {
    return this.page.getByRole("navigation");
  }

  get mainTitle() {
    return this.page.locator("#main-header");
  }

  get sections() {
    return this.page.locator(".thumbnail");
  }

  // --- JavaScript Alert ---
  get jsAlertSection() {
    return this.page.getByText("Javascript Alert").locator("..");
  }

  get jsAlertButton() {
    return this.jsAlertSection.locator("#button1");
  }

  // --- Modal Popup ---
  get modalSection() {
    return this.page.getByText("Modal Popup").locator("..");
  }

  get modalButton() {
    return this.modalSection.locator("#button2");
  }

  get modal() {
    return this.page.getByRole("dialog");
  }

  get modalTitle() {
    return this.page
      .getByRole("heading")
      .filter({ hasText: "It’s that Easy!! Well I think it is....." });
  }

  get modalContent() {
    return this.modal.getByRole("paragraph").filter({
      hasText: "We can inject and use JavaScript code if all else fails!"
    });
  }

  get modalCloseBtn() {
    return this.modal.getByRole("button", { name: "Close" });
  }

  get modalCloseIcon() {
    return this.modal.getByRole("button", { name: "×" });
  }

  // --- Ajax Loader ---
  get ajaxSection() {
    return this.page.getByText("Ajax Loader").locator("..");
  }

  get ajaxButton() {
    return this.ajaxSection.locator("#button3");
  }

  // --- JavaScript Confirm Box ---
  get confirmSection() {
    return this.page.getByText("JavaScript Confirm Box").locator("..");
  }

  get confirmButton() {
    return this.confirmSection.locator("#button4");
  }

  get confirmResultText() {
    return this.page.locator("#confirm-alert-text");
  }
}
