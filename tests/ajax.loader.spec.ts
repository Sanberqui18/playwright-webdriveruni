import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Ajax Loader - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify URL and header", async ({ page }) => {
    const homePage = new HomePage(page);
    const ajaxPage = await homePage.openAjaxLoader();

    // Verify url and Header title
    await expect(ajaxPage.page).toHaveURL(/Ajax-Loader/i);
    await expect(ajaxPage.navTitle).toContainText(/WebdriverUniversity.com/);
  });

  test("Verify Ajax loader is visible then button appears", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const ajaxPage = await homePage.openAjaxLoader();

    // Verify initial state loader visible button not visible
    await expect(ajaxPage.loader).toBeVisible();
    await expect(ajaxPage.loader).not.toHaveCSS("display", "none");

    await expect(ajaxPage.clickButton).toBeHidden();
    await expect(ajaxPage.buttonContainer).not.toHaveCSS("display", "block");

    // Wait until the loader disappears
    await ajaxPage.waitForLoaderToHide();

    // Verify button visible and loader not visible
    await expect(ajaxPage.loader).toHaveCSS("display", "none");

    await expect(ajaxPage.clickButton).toBeVisible();
    await expect(ajaxPage.buttonContainer).toHaveCSS("display", "block");

    await expect(ajaxPage.clickButton).toHaveText("CLICK ME!");
  });

  test("Button when ajax loader disappears works correcly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const ajaxPage = await homePage.openAjaxLoader();

    // Wait until the loader disappears
    await ajaxPage.waitForLoaderToHide();

    const clickBttn = ajaxPage.buttonContainer
      .getByRole("paragraph")
      .filter({ hasText: "Click me!" });

    // Verify modal is not visible before clicking on button
    await expect(ajaxPage.modal).toBeHidden();

    // Open modal and verify it is visible
    await clickBttn.click();
    await expect(ajaxPage.modal).toBeVisible();

    // Verify modal text
    await expect(ajaxPage.modalTitle).toHaveText("Well Done For Waiting....!!!");
    await expect(ajaxPage.modalContent).toContainText(
      "The waiting game can be a tricky one;"
    );

    // verify modal actions
    await ajaxPage.modalCloseBtn.click();
    await expect(ajaxPage.modal).toBeHidden();

    await clickBttn.click();

    await ajaxPage.modalXButton.click();
    await expect(ajaxPage.modal).toBeHidden();
  });
});
