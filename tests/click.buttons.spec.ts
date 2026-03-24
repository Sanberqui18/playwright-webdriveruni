import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Click Buttons - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Page URL, Heading, Title and Copywright should be correct", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const clickBttnPage = await homePage.openButtonClicks();

    // Verify Header Title exists
    await expect(clickBttnPage.headerTitle).toContainText(/WebdriverUniversity.com/);

    // Verify Page Title exists and is correct
    await expect(clickBttnPage.pageHeading).toBeVisible();

    // Define expected section/button titles and page sections
    const titles = [
      "WebElement Click",
      "JavaScript Click",
      "Action Move & Click"
    ];

    const buttons = ["CLICK ME!", "CLICK ME!!", "CLICK ME!!!"];

    // Verify each section title and content QTY= 3 are correct
    for (const key in titles) {
      const clickBox = clickBttnPage.sections.nth(parseInt(key));
      const textList = clickBox.locator(".section-title > ol > li");
      const buttonText = clickBox.locator(".caption > span");

      await expect(clickBox).toContainText(titles[parseInt(key)]);
      await expect(textList).toHaveCount(3);
      await expect(buttonText).toHaveText(buttons[parseInt(key)]);
    }

    // Bug 1 fix: copyrightText is now scoped to clickBttnPage (popup), not the home page
    await expect(clickBttnPage.copyrightText).toBeVisible();
  });

  test("Clicking on all buttons should open a modal and contain expected text", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const clickBttnPage = await homePage.openButtonClicks();

    // Define expected texts
    const expectedModalTxts = [
      {
        title: "Congratulations!",
        body: "Well done for successfully using the click() method!",
        list: false
      },
      {
        title: "It’s that Easy!!  Well I think it is.....",
        body: "We can use JavaScript code if all else fails! Remember always try to use the WebDriver Library method(s) first such as WebElement.click().",
        list: false
      },
      {
        title: "Well done! the Action Move & Click can become very useful!",
        body: "Advanced user interactions (API) has been developed to enable you to perform more complex interactions such as:",
        list: true,
        items: ["Drag & Drop", "Hover & Click", "Click & Hold...."]
      }
    ];

    // Click on Buttons and verify modal texts
    for (const [key, modalValue] of expectedModalTxts.entries()) {
      // eslint-disable-next-line playwright/no-force-option
      await clickBttnPage.clickMeButton(key as 0 | 1 | 2).click({ force: true });
      await expect(clickBttnPage.modalTitles.nth(key)).toHaveText(modalValue.title);
      await expect(clickBttnPage.modalBodies.nth(key)).toContainText(modalValue.body);

      // eslint-disable-next-line playwright/no-conditional-in-test
      if (modalValue.list) {
        const modalList = clickBttnPage.modalBodies.locator("ul > li");
        // eslint-disable-next-line playwright/no-conditional-expect
        await expect(modalList).toHaveText(modalValue.items as string[]);
      }
    }
  });
});
