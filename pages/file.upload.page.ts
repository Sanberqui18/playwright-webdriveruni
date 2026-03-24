import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class FileUploadPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pageNavTitle() {
    return this.page.getByRole("navigation");
  }

  get pageTitle() {
    return this.page.getByRole("heading", { name: "File Upload" });
  }

  get subtitle() {
    return this.page.getByRole("heading", {
      name: "Please choose a file to upload:"
    });
  }

  get fileInput() {
    return this.page.locator("#myFile");
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Submit" });
  }

  async uploadFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async submit() {
    await this.submitButton.click();
  }
}
