import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class AutocompleteTextPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageNavTitle() {
    return this.page.getByRole("navigation");
  }

  get pageTitle() {
    return this.page.getByRole("heading", {
      name: "Autocomplete TextField"
    });
  }

  get searchField() {
    return this.page.getByRole("textbox");
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Submit" });
  }

  get resultList() {
    return this.page.locator("#myInputautocomplete-list");
  }

  get listItems() {
    return this.resultList.locator("div");
  }

  async search(text: string) {
    await this.searchField.fill(text);
  }

  async clearSearch() {
    await this.searchField.clear();
  }

  async selectAndSubmit(text: string) {
    await this.search(text);
    await this.listItems.click();
    await this.submitButton.click();
  }
}
