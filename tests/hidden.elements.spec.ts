import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Hidden Elements - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify URL, sections and footer", async ({ page }) => {
    const homePage = new HomePage(page);
    const hiddenPage = await homePage.openHiddenElements();

    // Verify url
    await expect(hiddenPage.page).toHaveURL(/Hidden-Elements/i);

    // Verify Header Title exists
    await expect(hiddenPage.headerTitle).toContainText(/WebdriverUniversity/);

    // Verify title is visible and exists
    await expect(hiddenPage.pageTitle).toBeVisible();

    // Define sections and verify QTY 3
    await expect(hiddenPage.sections).toHaveCount(3);

    // Verify footer text exists and is visible
    await expect(hiddenPage.footer).toContainText("Copyright");
    await expect(hiddenPage.footer).toBeVisible();
  });

  test("No displayed section shows no element and work correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const hiddenPage = await homePage.openHiddenElements();

    await expect(hiddenPage.notDisplayedSection).toBeVisible();

    // Bug 2 fix: dead code `const modal = page.getByRole("dialog")` removed
    // Verify no displayed element
    await expect(hiddenPage.notDisplayedButton).toBeAttached();
    await expect(hiddenPage.notDisplayedButton).toBeHidden();
  });

  test("Visibility Hidden section shows no element and work correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const hiddenPage = await homePage.openHiddenElements();

    await expect(hiddenPage.visibilityHiddenSection).toBeVisible();

    // Verify no displayed element
    await expect(hiddenPage.hiddenButton).toBeAttached();
    await expect(hiddenPage.hiddenButton).toBeHidden();
  });

  test("Zero Opacity Section should show an element, open a modal and work correcly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const hiddenPage = await homePage.openHiddenElements();

    await expect(hiddenPage.zeroOpacitySection).toBeVisible();

    // Verify Opacity button
    await expect(hiddenPage.opacityButton).toBeAttached();
    await expect(hiddenPage.opacityButton).toBeVisible();

    const listItems = ["Drag & Drop", "Hover & Click", "Click & Hold...."];

    // Verify Inital State
    await expect(hiddenPage.modal).toBeHidden();

    // Open the modal and verify items
    await hiddenPage.opacityButton.click();

    await expect(hiddenPage.modal).toBeVisible();
    await expect(hiddenPage.modalTitle).toBeVisible();
    await expect(hiddenPage.modalContent).toBeVisible();
    await expect(hiddenPage.modalList).toHaveText(listItems);

    // Verify close icon and button work correctly
    await hiddenPage.modalCloseBtn.click();
    await expect(hiddenPage.modal).toBeHidden();

    await hiddenPage.opacityButton.click();

    await hiddenPage.modalCloseIcon.click();
    await expect(hiddenPage.modal).toBeHidden();
  });
});
