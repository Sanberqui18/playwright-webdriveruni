import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import path from "path";

test.describe("File Upload - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Section and values", async ({ page }) => {
    const homePage = new HomePage(page);
    const uploadPage = await homePage.openFileUpload();

    // Verify navigation
    await expect(uploadPage.page).toHaveURL("/File-Upload/index.html");

    // Verify items are visible and have correct values
    await expect(uploadPage.pageTitle).toBeVisible();
    await expect(uploadPage.subtitle).toBeVisible();
    await expect(uploadPage.fileInput).toBeVisible();
    await expect(uploadPage.submitButton).toBeVisible();
    await expect(uploadPage.footer).toBeVisible();

    await expect(uploadPage.pageNavTitle).toContainText(/File Upload/);
    await expect(uploadPage.footer).toContainText("Copyright");
  });

  test("Upload a file and submit it should work correclty", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const uploadPage = await homePage.openFileUpload();

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    uploadPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
      expect(successMessage).toContain("Your file has now been uploaded!");
      await dialog.accept();
    });

    // Upload File
    const fileName = "image.png";
    const filePath: string = path.join(__dirname, `../images/${fileName}`);

    await uploadPage.uploadFile(filePath);
    await uploadPage.submit();

    await expect(uploadPage.page).toHaveURL(
      `/File-Upload/index.html?filename=${fileName}`
    );
  });

  test("Latest file uploaded and submitted is the submitted one", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const uploadPage = await homePage.openFileUpload();

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    uploadPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
      expect(successMessage).toContain("Your file has now been uploaded!");
      await dialog.accept();
    });

    // Upload first file then replace with second — no delay needed between setInputFiles calls
    const fileName = "image.png";
    const fileName2 = "3mb-file.pdf";
    const filePath: string = path.join(__dirname, `../images/${fileName}`);
    const filePath2: string = path.join(__dirname, `../images/${fileName2}`);

    await uploadPage.uploadFile(filePath);
    await uploadPage.uploadFile(filePath2);

    await uploadPage.submit();

    await expect(uploadPage.page).toHaveURL(
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
    const homePage = new HomePage(page);
    const uploadPage = await homePage.openFileUpload();

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let errorMessage: string = "";
    uploadPage.page.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("You need to select a file to upload!");
      await dialog.accept();
    });

    // Submit
    await uploadPage.submit();

    await expect(uploadPage.page).toHaveURL(`/File-Upload/index.html?filename=`);
  });
});
