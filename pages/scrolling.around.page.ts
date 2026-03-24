import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ScrollingAroundPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageNavTitle() {
    return this.page.getByRole("navigation");
  }

  get mainTitle() {
    return this.page.locator("#main-header");
  }

  get scrollZone1() {
    return this.page.locator("#zone1");
  }

  get entriesZone2() {
    return this.page.locator("#zone2");
  }

  get entriesZone3() {
    return this.page.locator("#zone3");
  }

  get scrollZone4() {
    return this.page.locator("#zone4");
  }
}
