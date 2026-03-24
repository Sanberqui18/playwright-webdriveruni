import { Page } from "@playwright/test";

export abstract class BasePage {
  constructor(readonly page: Page) {}

  get navTitle() {
    return this.page.locator("#nav-title");
  }

  get footer() {
    return this.page.getByRole("paragraph").last();
  }
}
