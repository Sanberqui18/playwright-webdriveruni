/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "@playwright/test";
import path from "path";

test.describe("File Upload - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Section and values", async ({ page }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [uploadPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /FILE UPLOAD/ })
        .click()
    ]);

    await uploadPage.waitForLoadState();

    // Verify navigation
    await expect(uploadPage).toHaveURL("/File-Upload/index.html");

    // Define section elements
    const headerTitle = uploadPage.getByRole("navigation");
    const title = uploadPage.getByRole("heading", {
      name: "File Upload"
    });
    const subtitle = uploadPage.getByRole("heading", {
      name: "Please choose a file to upload:"
    });

    const footer = uploadPage.getByRole("paragraph").last();

    const fileUpload = uploadPage.locator("#myFile");
    const submitBttn = uploadPage.getByRole("button", {
      name: "Submit"
    });

    // Verify tiems are visible and have correct values
    await expect(title).toBeVisible();
    await expect(subtitle).toBeVisible();
    await expect(fileUpload).toBeVisible();
    await expect(submitBttn).toBeVisible();
    await expect(footer).toBeVisible();

    await expect(headerTitle).toContainText(/File Upload/);
    await expect(footer).toContainText("Copyright");
  });

  test("Upload a file and submit it should work correclty", async ({
    page
  }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [uploadPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /FILE UPLOAD/ })
        .click()
    ]);

    await uploadPage.waitForLoadState();

    // Define section elements
    const fileUpload = "#myFile";
    const submitBttn = uploadPage.getByRole("button", {
      name: "Submit"
    });

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    uploadPage.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("Your file has now been uploaded!");
      await dialog.accept();
    });

    // Upload File
    const fileName = "image.png";
    const filePath: string = path.join(__dirname, `../images/${fileName}`);

    await uploadPage.setInputFiles(fileUpload, filePath);
    await submitBttn.click();

    await expect(uploadPage).toHaveURL(
      `/File-Upload/index.html?filename=${fileName}`
    );
  });

  test("Latest file uploaded and submitted is the submitted one", async ({
    page
  }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [uploadPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /FILE UPLOAD/ })
        .click()
    ]);

    await uploadPage.waitForLoadState();

    // Define section elements
    const fileUpload = "#myFile";
    const submitBttn = uploadPage.getByRole("button", {
      name: "Submit"
    });

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    uploadPage.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("Your file has now been uploaded!");
      await dialog.accept();
    });

    // Upload File
    const fileName = "image.png";
    const fileName2 = "3mb-file.pdf";
    const filePath: string = path.join(__dirname, `../images/${fileName}`);
    const filePath2: string = path.join(__dirname, `../images/${fileName2}`);

    await uploadPage.setInputFiles(fileUpload, filePath);
    await uploadPage.waitForTimeout(1500);
    await uploadPage.setInputFiles(fileUpload, filePath2);

    await submitBttn.click();

    await expect(uploadPage).toHaveURL(
      `/File-Upload/index.html?filename=${fileName2}`
    );
  });
});

test.describe("File Upload - Unhappy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Submit without uploading a file should show an error", async ({
    page
  }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [uploadPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /FILE UPLOAD/ })
        .click()
    ]);

    await uploadPage.waitForLoadState();

    // Define section elements
    const submitBttn = uploadPage.getByRole("button", {
      name: "Submit"
    });

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let errorMessage: string = "";
    uploadPage.on("dialog", async (dialog) => {
      // Grab allert message
      errorMessage = dialog.message();

      // Verify success message from the dialog
      expect(errorMessage).toContain("You need to select a file to upload!");
      await dialog.accept();
    });

    // Submit
    await submitBttn.click();

    await expect(uploadPage).toHaveURL(`/File-Upload/index.html?filename=`);
  });
});
