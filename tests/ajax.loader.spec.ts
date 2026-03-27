import { test, expect } from "./fixtures";

test.describe("Ajax Loader - Only Path", () => {
  test("Verify URL and header", async ({ ajaxLoaderPage }) => {
    // Verify url and Header title
    await expect(ajaxLoaderPage.page).toHaveURL(/Ajax-Loader/i);
    await expect(ajaxLoaderPage.navTitle).toContainText(/WebdriverUniversity.com/);
  });

  test("Verify Ajax loader is visible then button appears", async ({
    ajaxLoaderPage
  }) => {
    // Verify initial state loader visible button not visible
    await expect(ajaxLoaderPage.loader).toBeVisible();
    await expect(ajaxLoaderPage.loader).not.toHaveCSS("display", "none");

    await expect(ajaxLoaderPage.clickButton).toBeHidden();
    await expect(ajaxLoaderPage.buttonContainer).not.toHaveCSS("display", "block");

    // Wait until the loader disappears
    await ajaxLoaderPage.waitForLoaderToHide();

    // Verify button visible and loader not visible
    await expect(ajaxLoaderPage.loader).toHaveCSS("display", "none");

    await expect(ajaxLoaderPage.clickButton).toBeVisible();
    await expect(ajaxLoaderPage.buttonContainer).toHaveCSS("display", "block");

    await expect(ajaxLoaderPage.clickButton).toHaveText("CLICK ME!");
  });

  test("Button when ajax loader disappears works correcly", async ({
    ajaxLoaderPage
  }) => {
    // Wait until the loader disappears
    await ajaxLoaderPage.waitForLoaderToHide();

    const clickBttn = ajaxLoaderPage.buttonContainer
      .getByRole("paragraph")
      .filter({ hasText: "Click me!" });

    // Verify modal is not visible before clicking on button
    await expect(ajaxLoaderPage.modal).toBeHidden();

    // Open modal and verify it is visible
    await clickBttn.click();
    await expect(ajaxLoaderPage.modal).toBeVisible();

    // Verify modal text
    await expect(ajaxLoaderPage.modalTitle).toHaveText("Well Done For Waiting....!!!");
    await expect(ajaxLoaderPage.modalContent).toContainText(
      "The waiting game can be a tricky one;"
    );

    // verify modal actions
    await ajaxLoaderPage.modalCloseBtn.click();
    await expect(ajaxLoaderPage.modal).toBeHidden();

    await clickBttn.click();

    await ajaxLoaderPage.modalXButton.click();
    await expect(ajaxLoaderPage.modal).toBeHidden();
  });
});
