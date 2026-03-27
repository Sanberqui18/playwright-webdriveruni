import { test, expect } from "./fixtures";

test.describe("Hidden Elements - Only Path", () => {
  test("Verify URL, sections and footer", async ({ hiddenElementsPage }) => {
    // Verify url
    await expect(hiddenElementsPage.page).toHaveURL(/Hidden-Elements/i);

    // Verify Header Title exists
    await expect(hiddenElementsPage.headerTitle).toContainText(/WebdriverUniversity/);

    // Verify title is visible and exists
    await expect(hiddenElementsPage.pageTitle).toBeVisible();

    // Define sections and verify QTY 3
    await expect(hiddenElementsPage.sections).toHaveCount(3);

    // Verify footer text exists and is visible
    await expect(hiddenElementsPage.footer).toContainText("Copyright");
    await expect(hiddenElementsPage.footer).toBeVisible();
  });

  test("No displayed section shows no element and work correctly", async ({
    hiddenElementsPage
  }) => {
    await expect(hiddenElementsPage.notDisplayedSection).toBeVisible();

    // Bug 2 fix: dead code `const modal = page.getByRole("dialog")` removed
    // Verify no displayed element
    await expect(hiddenElementsPage.notDisplayedButton).toBeAttached();
    await expect(hiddenElementsPage.notDisplayedButton).toBeHidden();
  });

  test("Visibility Hidden section shows no element and work correctly", async ({
    hiddenElementsPage
  }) => {
    await expect(hiddenElementsPage.visibilityHiddenSection).toBeVisible();

    // Verify no displayed element
    await expect(hiddenElementsPage.hiddenButton).toBeAttached();
    await expect(hiddenElementsPage.hiddenButton).toBeHidden();
  });

  test("Zero Opacity Section should show an element, open a modal and work correcly", async ({
    hiddenElementsPage
  }) => {
    await expect(hiddenElementsPage.zeroOpacitySection).toBeVisible();

    // Verify Opacity button
    await expect(hiddenElementsPage.opacityButton).toBeAttached();
    await expect(hiddenElementsPage.opacityButton).toBeVisible();

    const listItems = ["Drag & Drop", "Hover & Click", "Click & Hold...."];

    // Verify Inital State
    await expect(hiddenElementsPage.modal).toBeHidden();

    // Open the modal and verify items
    await hiddenElementsPage.opacityButton.click();

    await expect(hiddenElementsPage.modal).toBeVisible();
    await expect(hiddenElementsPage.modalTitle).toBeVisible();
    await expect(hiddenElementsPage.modalContent).toBeVisible();
    await expect(hiddenElementsPage.modalList).toHaveText(listItems);

    // Verify close icon and button work correctly
    await hiddenElementsPage.modalCloseBtn.click();
    await expect(hiddenElementsPage.modal).toBeHidden();

    await hiddenElementsPage.opacityButton.click();

    await hiddenElementsPage.modalCloseIcon.click();
    await expect(hiddenElementsPage.modal).toBeHidden();
  });
});
