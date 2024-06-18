import { test, expect } from "@playwright/test";

test.describe("Scriolling Around - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify page header, titles and button texts", async ({ page }) => {
    // Navigate to the Text Affects page in a separate Tab
    const [scrollingPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "SCROLLING AROUND" }).click()
    ]);

    await scrollingPage.waitForLoadState();

    // Verify url and Header title
    const headerTitle = scrollingPage.getByRole("navigation");

    await expect(scrollingPage).toHaveURL(/Scrolling/i);
    await expect(headerTitle).toContainText(/WebDriver/);

    const title = scrollingPage.locator("#main-header");
    const scrollSection = scrollingPage.locator("#zone1");
    const entries1Section = scrollingPage.locator("#zone2");
    const entries2Section = scrollingPage.locator("#zone3");
    const scrollSection2 = scrollingPage.locator("#zone4");
    const footer = scrollingPage.getByRole("paragraph").last();

    //Verify texts
    await expect(title).toHaveText("Just Scrolling Around!");

    await expect(scrollSection).toContainText("Scroll to me first");
    await expect(entries1Section).toHaveText("0 Entries");
    await expect(entries2Section).toHaveText("0 Entries");
    await expect(scrollSection2).toHaveText("Dont forget to scroll to me!");

    await expect(footer).toContainText("Copyright");
  });

  test("Scroll Section 1 should work correctly when hovered over", async ({
    page
  }) => {
    // Navigate to the Text Affects page in a separate Tab
    const [scrollingPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "SCROLLING AROUND" }).click()
    ]);

    await scrollingPage.waitForLoadState();

    // Define Scroll Section element
    const scrollSection = scrollingPage.locator("#zone1");

    // Verify inital state
    await expect(scrollSection).not.toHaveAttribute(
      "style",
      "background: rgb(26, 255, 26); font-size: 24px; text-align: center;"
    );
    await expect(scrollSection).toContainText("Scroll to me first");

    //Scroll to section
    await scrollSection.scrollIntoViewIfNeeded();
    await scrollSection.hover();

    // Verify text and style changed
    await expect(scrollSection).toContainText("Well done for scrolling to me!");
    await expect(scrollSection).toHaveAttribute(
      "style",
      "background: rgb(26, 255, 26); font-size: 24px; text-align: center;"
    );
  });

  test("Entries sections should increase the count when horevered over", async ({
    page
  }) => {
    // Navigate to the Text Affects page in a separate Tab
    const [scrollingPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "SCROLLING AROUND" }).click()
    ]);

    await scrollingPage.waitForLoadState();

    // Define entries Elements
    const entries1Section = scrollingPage.locator("#zone2");
    const entries2Section = scrollingPage.locator("#zone3");

    // Verify inital state
    await expect(entries1Section).toHaveText("0 Entries");
    await expect(entries2Section).toHaveText("0 Entries");

    //Hover over section to simulate scroll
    for (let count = 1; count < 6; count++) {
      await entries1Section.hover();
      await expect(entries1Section).toHaveText(`${count} Entries`);

      await entries2Section.hover();
      await expect(entries2Section).toHaveText(`${count} Entries`);
    }
  });

  test("Scroll Section 2 should show position where the mouse is when hovered over", async ({
    page
  }) => {
    // var x,y; document.onmousemove=(e)=>{x=e.pageX;y=e.pageY}  "("+x+","+y+")"
    // Navigate to the Text Affects page in a separate Tab
    const [scrollingPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "SCROLLING AROUND" }).click()
    ]);

    await scrollingPage.waitForLoadState();

    // Define scroll section 2 element
    const scrollSection2 = scrollingPage.locator("#zone4");

    // Verify initial state
    await expect(scrollSection2).toHaveText("Dont forget to scroll to me!");
    await expect(scrollSection2).not.toHaveAttribute(
      "style",
      "text-align: center; font-size: 32px; color: rgb(255, 255, 255); background: black;"
    );

    // Hover over the section and verify the coordinates are correct and color changed
    await scrollSection2.scrollIntoViewIfNeeded();
    await scrollSection2.hover();
    await expect(scrollSection2).toHaveText("X: 625Y: 816");
    await expect(scrollSection2).toHaveAttribute(
      "style",
      "text-align: center; font-size: 32px; color: rgb(255, 255, 255); background: black;"
    );
  });
});
