import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPortalPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameField() {
    return this.page.getByPlaceholder("Username");
  }

  get passwordField() {
    return this.page.getByPlaceholder("Password");
  }

  get loginButton() {
    return this.page.getByRole("button", { name: /login/i });
  }

  get animationBubbles() {
    return this.page.locator("ul > li");
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
