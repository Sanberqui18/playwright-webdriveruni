import { test, expect } from "@playwright/test";

test.describe("Hidden Elements - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify URL, sections and footer", async ({ page }) => {
    // Navigate to the Hidden Elements page in a separate Tab
    const [hiddenPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "HIDDEN ELEMENTS" }).click()
    ]);

    await hiddenPage.waitForLoadState();

    // Verify url
    await expect(hiddenPage).toHaveURL(/Hidden-Elements/i);

    // Verify Header Title exists
    const headerTitle = hiddenPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity/);

    // Verify title is visible and exists
    const title = hiddenPage.getByRole("heading", {
      name: "Hidden Elements.."
    });

    await expect(title).toBeVisible();

    // Define sections and verify QTY 3
    const hiddenSections = hiddenPage.locator(".thumbnail");
    await expect(hiddenSections).toHaveCount(3);

    // Verify footer text exists and is visible
    const footerText = hiddenPage.getByRole("paragraph").last();

    await expect(footerText).toContainText("Copyright");
    await expect(footerText).toBeVisible();
  });

  test("No displayed section shows no element and work correctly", async ({
    page
  }) => {
    // Navigate to the Hidden Elements page in a separate Tab
    const [hiddenPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "HIDDEN ELEMENTS" }).click()
    ]);

    await hiddenPage.waitForLoadState();

    // Define No Displayed section
    const noDisplayedSection = hiddenPage
      .locator(".thumbnail")
      .filter({ hasText: "Not Displayed" });

    await expect(noDisplayedSection).toBeVisible();

    // Define modal for that section
    const modal = page.getByRole("dialog");

    // Verify no displayed element
    const noDisplayedBttn = noDisplayedSection.locator("#button1");
    await expect(noDisplayedBttn).toBeAttached();
    await expect(noDisplayedBttn).toBeHidden();
  });

  test("Visibility Hidden section shows no element and work correctly", async ({
    page
  }) => {
    // Navigate to the Hidden Elements page in a separate Tab
    const [hiddenPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "HIDDEN ELEMENTS" }).click()
    ]);

    await hiddenPage.waitForLoadState();

    // Define No Displayed section
    const hiddenSection = hiddenPage
      .locator(".thumbnail")
      .filter({ hasText: "Visibility Hidden" });

    await expect(hiddenSection).toBeVisible();

    // Verify no displayed element
    const hiddenBttn = hiddenSection.locator("#button2");
    await expect(hiddenBttn).toBeAttached();
    await expect(hiddenBttn).toBeHidden();
  });

  test("Zero Opacity Section should show an element, open a modal and work correcly", async ({
    page
  }) => {
    // Navigate to the Hidden Elements page in a separate Tab
    const [hiddenPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "HIDDEN ELEMENTS" }).click()
    ]);

    await hiddenPage.waitForLoadState();

    // Define No Displayed section
    const opacitySection = hiddenPage
      .locator(".thumbnail")
      .filter({ hasText: "Zero Opacity" });

    await expect(opacitySection).toBeVisible();

    // Verify Opacity button
    const opacityBttn = opacitySection.locator("#button3");
    await expect(opacityBttn).toBeAttached();
    await expect(opacityBttn).toBeVisible();

    // Define modal elements
    const modal = hiddenPage.getByRole("dialog");
    const modalTitle = hiddenPage.getByRole("heading").filter({
      hasText: "Well done! the Action Move & Click can become very useful!"
    });
    const modalContent = modal.getByRole("paragraph").filter({
      hasText:
        "Advanced user interactions (API) has been developed to enable you to perform more"
    });

    const modalList = modal.getByRole("listitem");
    const listItems = ["Drag & Drop", "Hover & Click", "Click & Hold...."];

    const closeBttn = modal.getByRole("button", { name: "Close" });
    const modalCloseIcon = modal.getByRole("button", { name: "×" });

    // Verify Inital State
    await expect(modal).toBeHidden();

    // Open the modal and veriy items
    await opacityBttn.click();

    await expect(modal).toBeVisible();
    await expect(modalTitle).toBeVisible();
    await expect(modalContent).toBeVisible();
    await expect(modalList).toHaveText(listItems);

    // Verify close icon and button work correclty
    await closeBttn.click();
    await expect(modal).toBeHidden();

    await opacityBttn.click();

    await modalCloseIcon.click();
    await expect(modal).toBeHidden();
  });
});
