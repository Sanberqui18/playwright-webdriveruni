import { test, expect } from "@playwright/test";

test.describe("Click Buttons - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Page URL, Heading, Title and Copywright should be correct", async ({
    page
  }) => {
    // Navigate to the Click Buttons page in a separate Tab
    const clickBttnPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "BUTTON CLICKS" }).click();
    const clickBttnPage = await clickBttnPromise;
    await clickBttnPage.waitForLoadState();

    // Verify Header Title exists
    const headerTitle = clickBttnPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity.com/);

    // Verify Page Title exists and is correct
    const title = clickBttnPage.getByRole("heading", {
      name: "Lets Get Clicking!"
    });
    await expect(title).toBeVisible();

    // Define expected section/button titles and page sections
    const titles = [
      "WebElement Click",
      "JavaScript Click",
      "Action Move & Click"
    ];

    const buttons = ["CLICK ME!", "CLICK ME!!", "CLICK ME!!!"];

    const clickBoxes = clickBttnPage.locator(".thumbnail");

    // Verify each section title and content QTY= 3 are correct
    for (let key in titles) {
      let clickBox = clickBoxes.nth(parseInt(key));
      let textList = clickBox.locator(".section-title > ol > li");
      let buttonText = clickBox.locator(".caption > span");

      await expect(clickBox).toContainText(titles[parseInt(key)]);
      await expect(textList).toHaveCount(3);
      await expect(buttonText).toHaveText(buttons[parseInt(key)]);
    }

    // Define copywright locator and verify it is visible
    const copywrightText = page.getByText("Copyright © www.GianniBruno.com");
    await expect(copywrightText).toBeVisible();
  });

  test("Clicking on all buttons should open a modal and contain expected text", async ({
    page
  }) => {
    // Navigate to the Click Buttons page in a separate Tab
    const clickBttnPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "BUTTON CLICKS" }).click();
    const clickBttnPage = await clickBttnPromise;
    await clickBttnPage.waitForLoadState();

    // Define button variables
    const buttons = [
      clickBttnPage.getByText("CLICK ME!", { exact: true }),
      clickBttnPage.getByText("CLICK ME!!", { exact: true }),
      clickBttnPage.getByText("CLICK ME!!!", { exact: true })
    ];

    // Define Modal and their components
    const modal = clickBttnPage.locator(".modal-content");
    const modalTitle = modal.locator(".modal-header > h4");
    const modalContent = modal.locator(".modal-body");
    const closeBttn = modal.getByRole("button", { name: "Close" });

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
    for (let [key, modalValue] of expectedModalTxts.entries()) {
      await buttons[key].click({ force: true });
      await expect(modalTitle.nth(key)).toHaveText(modalValue.title);
      await expect(modalContent.nth(key)).toContainText(modalValue.body);

      if (modalValue.list) {
        const modalList = modalContent.locator("ul > li");
        await expect(modalList).toHaveText(modalValue.items as string[]);
      }
    }
  });
});
