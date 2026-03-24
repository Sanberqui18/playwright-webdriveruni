import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DropdownButtonsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get sections() {
    return this.page.locator(".thumbnail");
  }

  get dropdownSection() {
    return this.page.locator(".thumbnail").filter({ hasText: "Dropdown" });
  }

  get dropdowns() {
    return this.dropdownSection.getByRole("combobox");
  }

  get checkboxesSection() {
    return this.page.locator(".thumbnail").filter({ hasText: "Checkboxe" });
  }

  get checkboxes() {
    return this.checkboxesSection.getByRole("checkbox");
  }

  get radioButtonsSection() {
    return this.page.locator(".thumbnail").filter({ hasText: "Radio Button" });
  }

  get radioButtons() {
    return this.radioButtonsSection.getByRole("radio");
  }

  get selectedDisabledSection() {
    return this.page
      .locator(".thumbnail")
      .filter({ hasText: "Selected & Disabled" });
  }

  get selectedDisabledRadioButtons() {
    return this.selectedDisabledSection.getByRole("radio");
  }

  get selectedDisabledDropdown() {
    return this.selectedDisabledSection.getByRole("combobox");
  }
}
