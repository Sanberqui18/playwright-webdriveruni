import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HiddenElementsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get headerTitle() {
    return this.page.locator("#nav-title");
  }

  get pageTitle() {
    return this.page.getByRole("heading", { name: "Hidden Elements.." });
  }

  get sections() {
    return this.page.locator(".thumbnail");
  }

  // --- Not Displayed section ---
  get notDisplayedSection() {
    return this.page.locator(".thumbnail").filter({ hasText: "Not Displayed" });
  }

  get notDisplayedButton() {
    return this.notDisplayedSection.locator("#button1");
  }

  // --- Visibility Hidden section ---
  get visibilityHiddenSection() {
    return this.page
      .locator(".thumbnail")
      .filter({ hasText: "Visibility Hidden" });
  }

  get hiddenButton() {
    return this.visibilityHiddenSection.locator("#button2");
  }

  // --- Zero Opacity section ---
  get zeroOpacitySection() {
    return this.page.locator(".thumbnail").filter({ hasText: "Zero Opacity" });
  }

  get opacityButton() {
    return this.zeroOpacitySection.locator("#button3");
  }

  // Bug 2 fix: was `page` (home fixture), now correctly scoped to this.page (popup)
  get modal() {
    return this.page.getByRole("dialog");
  }

  get modalTitle() {
    return this.page.getByRole("heading").filter({
      hasText: "Well done! the Action Move & Click can become very useful!"
    });
  }

  get modalContent() {
    return this.modal.getByRole("paragraph").filter({
      hasText:
        "Advanced user interactions (API) has been developed to enable you to perform more"
    });
  }

  get modalList() {
    return this.modal.getByRole("listitem");
  }

  get modalCloseBtn() {
    return this.modal.getByRole("button", { name: "Close" });
  }

  get modalCloseIcon() {
    return this.modal.getByRole("button", { name: "×" });
  }
}
