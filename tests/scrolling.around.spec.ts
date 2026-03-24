import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Scriolling Around - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify page header, titles and button texts", async ({ page }) => {
    const homePage = new HomePage(page);
    const scrollingPage = await homePage.openScrollingAround();

    // Verify url and Header title
    await expect(scrollingPage.page).toHaveURL(/Scrolling/i);
    await expect(scrollingPage.pageNavTitle).toContainText(/WebDriver/);

    //Verify texts
    await expect(scrollingPage.mainTitle).toHaveText("Just Scrolling Around!");

    await expect(scrollingPage.scrollZone1).toContainText("Scroll to me first");
    await expect(scrollingPage.entriesZone2).toHaveText("0 Entries");
    await expect(scrollingPage.entriesZone3).toHaveText("0 Entries");
    await expect(scrollingPage.scrollZone4).toHaveText("Dont forget to scroll to me!");

    await expect(scrollingPage.footer).toContainText("Copyright");
  });

  test("Scroll Section 1 should work correctly when hovered over", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const scrollingPage = await homePage.openScrollingAround();

    // Verify inital state
    await expect(scrollingPage.scrollZone1).not.toHaveAttribute(
      "style",
      "background: rgb(26, 255, 26); font-size: 24px; text-align: center;"
    );
    await expect(scrollingPage.scrollZone1).toContainText("Scroll to me first");

    //Scroll to section
    await scrollingPage.scrollZone1.scrollIntoViewIfNeeded();
    await scrollingPage.scrollZone1.hover();

    // Verify text and style changed
    await expect(scrollingPage.scrollZone1).toContainText("Well done for scrolling to me!");
    await expect(scrollingPage.scrollZone1).toHaveAttribute(
      "style",
      "background: rgb(26, 255, 26); font-size: 24px; text-align: center;"
    );
  });

  test("Entries sections should increase the count when horevered over", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const scrollingPage = await homePage.openScrollingAround();

    // Verify inital state
    await expect(scrollingPage.entriesZone2).toHaveText("0 Entries");
    await expect(scrollingPage.entriesZone3).toHaveText("0 Entries");

    //Hover over section to simulate scroll
    for (let count = 1; count < 6; count++) {
      await scrollingPage.entriesZone2.hover();
      await expect(scrollingPage.entriesZone2).toHaveText(`${count} Entries`);

      await scrollingPage.entriesZone3.hover();
      await expect(scrollingPage.entriesZone3).toHaveText(`${count} Entries`);
    }
  });

  test("Scroll Section 2 should show position where the mouse is when hovered over", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const scrollingPage = await homePage.openScrollingAround();

    // Verify initial state
    await expect(scrollingPage.scrollZone4).toHaveText("Dont forget to scroll to me!");
    await expect(scrollingPage.scrollZone4).not.toHaveAttribute(
      "style",
      "text-align: center; font-size: 32px; color: rgb(255, 255, 255); background: black;"
    );

    // Hover over the section and verify the coordinates are shown and color changed
    // Bug 5 fix: regex instead of hardcoded "X: 625Y: 816" (viewport-dependent value)
    await scrollingPage.scrollZone4.scrollIntoViewIfNeeded();
    await scrollingPage.scrollZone4.hover();
    await expect(scrollingPage.scrollZone4).toHaveText(/^X: \d+Y: \d+$/);
    await expect(scrollingPage.scrollZone4).toHaveAttribute(
      "style",
      "text-align: center; font-size: 32px; color: rgb(255, 255, 255); background: black;"
    );
  });
});
