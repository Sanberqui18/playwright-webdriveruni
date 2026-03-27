import { test, expect } from "./fixtures";

test.describe("Scriolling Around - Only Path", () => {
  test("Verify page header, titles and button texts", async ({ scrollingAroundPage }) => {
    // Verify url and Header title
    await expect(scrollingAroundPage.page).toHaveURL(/Scrolling/i);
    await expect(scrollingAroundPage.pageNavTitle).toContainText(/WebDriver/);

    //Verify texts
    await expect(scrollingAroundPage.mainTitle).toHaveText("Just Scrolling Around!");

    await expect(scrollingAroundPage.scrollZone1).toContainText("Scroll to me first");
    await expect(scrollingAroundPage.entriesZone2).toHaveText("0 Entries");
    await expect(scrollingAroundPage.entriesZone3).toHaveText("0 Entries");
    await expect(scrollingAroundPage.scrollZone4).toHaveText("Dont forget to scroll to me!");

    await expect(scrollingAroundPage.footer).toContainText("Copyright");
  });

  test("Scroll Section 1 should work correctly when hovered over", async ({
    scrollingAroundPage
  }) => {
    // Verify inital state
    await expect(scrollingAroundPage.scrollZone1).not.toHaveAttribute(
      "style",
      "background: rgb(26, 255, 26); font-size: 24px; text-align: center;"
    );
    await expect(scrollingAroundPage.scrollZone1).toContainText("Scroll to me first");

    //Scroll to section
    await scrollingAroundPage.scrollZone1.scrollIntoViewIfNeeded();
    await scrollingAroundPage.scrollZone1.hover();

    // Verify text and style changed
    await expect(scrollingAroundPage.scrollZone1).toContainText("Well done for scrolling to me!");
    await expect(scrollingAroundPage.scrollZone1).toHaveAttribute(
      "style",
      "background: rgb(26, 255, 26); font-size: 24px; text-align: center;"
    );
  });

  test("Entries sections should increase the count when horevered over", async ({
    scrollingAroundPage
  }) => {
    // Verify inital state
    await expect(scrollingAroundPage.entriesZone2).toHaveText("0 Entries");
    await expect(scrollingAroundPage.entriesZone3).toHaveText("0 Entries");

    //Hover over section to simulate scroll
    for (let count = 1; count < 6; count++) {
      await scrollingAroundPage.entriesZone2.hover();
      await expect(scrollingAroundPage.entriesZone2).toHaveText(`${count} Entries`);

      await scrollingAroundPage.entriesZone3.hover();
      await expect(scrollingAroundPage.entriesZone3).toHaveText(`${count} Entries`);
    }
  });

  test("Scroll Section 2 should show position where the mouse is when hovered over", async ({
    scrollingAroundPage
  }) => {
    // Verify initial state
    await expect(scrollingAroundPage.scrollZone4).toHaveText("Dont forget to scroll to me!");
    await expect(scrollingAroundPage.scrollZone4).not.toHaveAttribute(
      "style",
      "text-align: center; font-size: 32px; color: rgb(255, 255, 255); background: black;"
    );

    // Hover over the section and verify the coordinates are shown and color changed
    // Bug 5 fix: regex instead of hardcoded "X: 625Y: 816" (viewport-dependent value)
    await scrollingAroundPage.scrollZone4.scrollIntoViewIfNeeded();
    await scrollingAroundPage.scrollZone4.hover();
    await expect(scrollingAroundPage.scrollZone4).toHaveText(/^X: \d+Y: \d+$/);
    await expect(scrollingAroundPage.scrollZone4).toHaveAttribute(
      "style",
      "text-align: center; font-size: 32px; color: rgb(255, 255, 255); background: black;"
    );
  });
});
