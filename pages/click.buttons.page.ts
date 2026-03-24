import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ClickButtonsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get headerTitle() {
    return this.page.locator("#nav-title");
  }

  get pageHeading() {
    return this.page.getByRole("heading", { name: "Lets Get Clicking!" });
  }

  get sections() {
    return this.page.locator(".thumbnail");
  }

  // Bug 1 fix: was `page` (home fixture), now correctly scoped to this.page (popup)
  get copyrightText() {
    return this.page.getByText("Copyright © www.GianniBruno.com");
  }

  get modal() {
    return this.page.locator(".modal-content");
  }

  get modalTitles() {
    return this.modal.locator(".modal-header > h4");
  }

  get modalBodies() {
    return this.modal.locator(".modal-body");
  }

  clickMeButton(index: 0 | 1 | 2) {
    const labels = ["CLICK ME!", "CLICK ME!!", "CLICK ME!!!"] as const;
    return this.page.getByText(labels[index], { exact: true });
  }
}
