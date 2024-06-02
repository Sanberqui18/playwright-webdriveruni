import { test, expect } from "@playwright/test";

test.describe("Ajax Loader - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify URL and header", async ({ page }) => {
    // Navigate to the Ajax Loader page in a separate Tab
    const [ajaxPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "AJAX LOADER" }).click()
    ]);

    await ajaxPage.waitForLoadState();

    // Verify url and Header title
    await expect(ajaxPage).toHaveURL(/Ajax-Loader/i);

    const headerTitle = ajaxPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
  });

  test("Verify Ajax loader is visible then button appears", async ({
    page
  }) => {
    // Navigate to the Ajax Loader page in a separate Tab
    const [ajaxPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "AJAX LOADER" }).click()
    ]);

    await ajaxPage.waitForLoadState();

    // Define loader and button section/click
    const loader = ajaxPage.locator("#loader");
    const bttnContainer = ajaxPage.locator("#myDiv");
    const clickBttn = bttnContainer.getByRole("paragraph");

    // Verify initial state loader visible button not visible
    await expect(loader).toBeVisible();
    await expect(loader).not.toHaveCSS("display", "none");

    await expect(clickBttn).toBeHidden();
    await expect(bttnContainer).not.toHaveCSS("display", "block");

    // Wait unitl the loader disappears
    await loader.waitFor({ state: "hidden" });

    // Verify button visible and loader not visible
    await expect(loader).toHaveCSS("display", "none");

    await expect(clickBttn).toBeVisible();
    await expect(bttnContainer).toHaveCSS("display", "block");

    await expect(clickBttn).toHaveText("CLICK ME!");
  });

  test("Button when ajax loader disappears works correcly", async ({
    page
  }) => {
    // Navigate to the Ajax Loader page in a separate Tab
    const [ajaxPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "AJAX LOADER" }).click()
    ]);

    await ajaxPage.waitForLoadState();

    // Define loader and button section/click
    const loader = ajaxPage.locator("#loader");
    const bttnContainer = ajaxPage.locator("#myDiv");
    const clickBttn = bttnContainer
      .getByRole("paragraph")
      .filter({ hasText: "Click me!" });

    // Wait unitl the loader disappears
    await loader.waitFor({ state: "hidden" });

    // Define modal elements
    const modal = ajaxPage.getByRole("dialog");
    const modalTitle = modal.getByRole("heading");
    const modalContent = modal.getByRole("paragraph");
    const closeBttn = modal.getByRole("button").filter({ hasText: "Close" });
    const xButton = modal.getByRole("button").nth(0);

    // Verify modal is not visible before clickin on button
    await expect(modal).toBeHidden();

    // Open modal and verify it is visible
    await clickBttn.click();
    await expect(modal).toBeVisible();

    // Verify modal text
    await expect(modalTitle).toHaveText("Well Done For Waiting....!!!");
    await expect(modalContent).toContainText(
      "The waiting game can be a tricky one;"
    );

    // verify modal actions
    await closeBttn.click();
    await expect(modal).toBeHidden();

    await clickBttn.click();

    await xButton.click();
    await expect(modal).toBeHidden();
  });
});
