import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class TextAffectsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageTitle() {
    return this.page.getByRole("heading", {
      name: "Click on One of the Accordian Items Below!"
    });
  }

  get buttons() {
    return this.page.getByRole("button");
  }

  get paragraphs() {
    return this.page.getByRole("paragraph");
  }

  get timeoutBox() {
    return this.page.locator("#timeout");
  }

  get hiddenText() {
    return this.page.getByRole("paragraph").locator(":scope#hidden-text");
  }
}
