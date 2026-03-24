import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get firstNameField() {
    return this.page.getByPlaceholder("First Name");
  }

  get lastNameField() {
    return this.page.getByPlaceholder("Last Name");
  }

  get emailField() {
    return this.page.getByPlaceholder("Email Address");
  }

  get commentsField() {
    return this.page.getByPlaceholder("Comments");
  }

  get submitButton() {
    return this.page.getByRole("button", { name: /submit/i });
  }

  get resetButton() {
    return this.page.getByRole("button", { name: /reset/i });
  }

  get successHeading() {
    return this.page.getByRole("heading", {
      name: "Thank You for your Message!"
    });
  }

  get animation() {
    return this.page.locator("#fountainG");
  }

  get animationDots() {
    return this.page.locator("#fountainG > .fountainG");
  }

  get bodyErrors() {
    return this.page.locator("body");
  }

  get errorBreaks() {
    return this.page.locator("body > br");
  }

  async fillForm(
    firstName: string,
    lastName: string,
    email: string,
    comments: string
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.commentsField.fill(comments);
  }

  async submit() {
    await this.submitButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async goBackToForm() {
    await this.page.goBack();
  }
}
