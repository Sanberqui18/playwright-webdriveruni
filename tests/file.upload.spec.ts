import { test, expect } from "./fixtures";
import path from "path";

test.describe("File Upload - Happy Path", () => {
  test("Verify Section and values", async ({ fileUploadPage }) => {
    // Verify navigation
    await expect(fileUploadPage.page).toHaveURL("/File-Upload/index.html");

    // Verify items are visible and have correct values
    await expect(fileUploadPage.pageTitle).toBeVisible();
    await expect(fileUploadPage.subtitle).toBeVisible();
    await expect(fileUploadPage.fileInput).toBeVisible();
    await expect(fileUploadPage.submitButton).toBeVisible();
    await expect(fileUploadPage.footer).toBeVisible();

    await expect(fileUploadPage.pageNavTitle).toContainText(/File Upload/);
    await expect(fileUploadPage.footer).toContainText("Copyright");
  });

  test("Upload a file and submit it should work correclty", async ({
    fileUploadPage
  }) => {
    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    fileUploadPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
      expect(successMessage).toContain("Your file has now been uploaded!");
      await dialog.accept();
    });

    // Upload File
    const fileName = "image.png";
    const filePath: string = path.join(__dirname, `../images/${fileName}`);

    await fileUploadPage.uploadFile(filePath);
    await fileUploadPage.submit();

    await expect(fileUploadPage.page).toHaveURL(
      `/File-Upload/index.html?filename=${fileName}`
    );
  });

  test("Latest file uploaded and submitted is the submitted one", async ({
    fileUploadPage
  }) => {
    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    fileUploadPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
      expect(successMessage).toContain("Your file has now been uploaded!");
      await dialog.accept();
    });

    // Upload first file then replace with second — no delay needed between setInputFiles calls
    const fileName = "image.png";
    const fileName2 = "3mb-file.pdf";
    const filePath: string = path.join(__dirname, `../images/${fileName}`);
    const filePath2: string = path.join(__dirname, `../images/${fileName2}`);

    await fileUploadPage.uploadFile(filePath);
    await fileUploadPage.uploadFile(filePath2);

    await fileUploadPage.submit();

    await expect(fileUploadPage.page).toHaveURL(
      `/File-Upload/index.html?filename=${fileName2}`
    );
  });
});

test.describe("File Upload - Unhappy Path", () => {
  test("Submit without uploading a file should show an error", async ({
    fileUploadPage
  }) => {
    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let errorMessage: string = "";
    fileUploadPage.page.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("You need to select a file to upload!");
      await dialog.accept();
    });

    // Submit
    await fileUploadPage.submit();

    await expect(fileUploadPage.page).toHaveURL(`/File-Upload/index.html?filename=`);
  });
});
