import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class AjaxLoaderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get loader() {
    return this.page.locator("#loader");
  }

  get buttonContainer() {
    return this.page.locator("#myDiv");
  }

  get clickButton() {
    return this.buttonContainer.getByRole("paragraph");
  }

  get modal() {
    return this.page.getByRole("dialog");
  }

  get modalTitle() {
    return this.modal.getByRole("heading");
  }

  get modalContent() {
    return this.modal.getByRole("paragraph");
  }

  get modalCloseBtn() {
    return this.modal.getByRole("button").filter({ hasText: "Close" });
  }

  get modalXButton() {
    return this.modal.getByRole("button").nth(0);
  }

  async waitForLoaderToHide() {
    await this.loader.waitFor({ state: "hidden" });
  }
}
