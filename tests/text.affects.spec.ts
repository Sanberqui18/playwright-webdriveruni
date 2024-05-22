/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "@playwright/test";

test.describe("Text Effects - Only path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify page header, titles and button texts", async ({ page }) => {
    // Navigate to theText Effects page in a separate Tab
    const [textAffectsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "ACCORDION & TEXT AFFECTS" })
        .click()
    ]);

    await textAffectsPage.waitForLoadState();

    // Verify url
    await expect(textAffectsPage).toHaveURL(/Accordion/);

    // Verify Header Title exists
    const headerTitle = textAffectsPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebDriver/);

    // Verify Page title is visible
    const title = textAffectsPage.getByRole("heading", {
      name: "Click on One of the Accordian Items Below!"
    });

    await expect(title).toBeVisible();

    // Verify Buttons QTY = 4 and Texts
    const buttonTexts = [
      "Manual Testing",
      "Cucumber BDD",
      "Automation Testing",
      "Keep Clicking! - Text will Appear After 5 Seconds!"
    ];
    const buttons = textAffectsPage.getByRole("button");

    await expect(buttons).toHaveCount(4);
    await expect(buttons).toHaveText(buttonTexts);

    // Verify footer text exists and is visible
    const footerText = page.getByRole("paragraph").last();

    await expect(footerText).toContainText("Copyright");
    await expect(footerText).toBeVisible();
  });

  test("Verify button texts are initially hidden and show when clicking on them", async ({
    page
  }) => {
    // Navigate to theText Effects page in a separate Tab
    const [textAffectsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "ACCORDION & TEXT AFFECTS" })
        .click()
    ]);

    await textAffectsPage.waitForLoadState();

    // Define Buttons
    const manualTestingBttn = textAffectsPage.getByRole("button", {
      name: "Manual Testing"
    });
    const cucumberBttn = textAffectsPage.getByRole("button", {
      name: "Cucumber BDD"
    });
    const automationBttn = textAffectsPage.getByRole("button", {
      name: "Automation Testing"
    });

    // Define linear paragraphs
    const paragraph1 = textAffectsPage.getByRole("paragraph").nth(0);
    const paragraph2 = textAffectsPage.getByRole("paragraph").nth(1);
    const paragraph3 = textAffectsPage.getByRole("paragraph").nth(2);

    // Verify Paragraphs are initially inactive
    await expect(manualTestingBttn).not.toHaveClass("accordion active");
    await expect(cucumberBttn).not.toHaveClass("accordion active");
    await expect(automationBttn).not.toHaveClass("accordion active");

    // Verify paragraphs are visible and correct when clicking on buttons
    await manualTestingBttn.click();
    await expect(manualTestingBttn).toHaveClass("accordion active");
    await expect(paragraph1).toContainText(
      "Manual testing has for some time been the most popular way to test code."
    );

    await cucumberBttn.click();
    await expect(cucumberBttn).toHaveClass("accordion active");
    await expect(paragraph2).toContainText(
      "Cucumber (BDD) simplifies the requirement capturing process."
    );
    await automationBttn.click();
    await expect(automationBttn).toHaveClass("accordion active");
    await expect(paragraph3).toContainText(
      "Automation testing has been steadily grown in popularity these past few years thanks to the time/ cost savings and efficiency that it offers."
    );

    // Close all buttons and accordion texts should not be active
    await manualTestingBttn.click();
    await cucumberBttn.click();
    await automationBttn.click();

    await expect(manualTestingBttn).not.toHaveClass("accordion active");
    await expect(cucumberBttn).not.toHaveClass("accordion active");
    await expect(automationBttn).not.toHaveClass("accordion active");
  });

  test("Verify asyncronous actions generated in page", async ({ page }) => {
    // Navigate to theText Effects page in a separate Tab
    const [textAffectsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "ACCORDION & TEXT AFFECTS" })
        .click()
    ]);

    await textAffectsPage.waitForLoadState();

    // Define Hide elements
    const appearTextBttn = textAffectsPage.getByRole("button", {
      name: "Keep Clicking!"
    });

    const hiddenParagraph = textAffectsPage.locator("#timeout");

    const messageBanner = textAffectsPage
      .getByRole("paragraph")
      .locator(":scope#hidden-text");

    // Verify loading stage
    await expect(messageBanner).toHaveText("LOADING.. PLEASE WAIT..");

    // Click on button and verify it does not display paragraph
    await appearTextBttn.click();
    await expect(hiddenParagraph).toHaveCSS("max-height", "0px");
    await appearTextBttn.click();

    // After 3 seconds verify loading stage and hidden text still there
    await textAffectsPage.waitForTimeout(3000);

    await appearTextBttn.click();
    await expect(hiddenParagraph).toHaveCSS("max-height", "0px");
    await appearTextBttn.click();

    await expect(messageBanner).toHaveText("LOADING.. PLEASE WAIT..");

    // After 5 seconds verify loading stage changed and hidden text is released
    await textAffectsPage.waitForTimeout(2000);

    await expect(messageBanner).toHaveText("LOADING COMPLETE.");

    await appearTextBttn.click();
    await expect(hiddenParagraph).toHaveCSS("max-height", "20px");
    await expect(hiddenParagraph).toContainText("after 5 seconds!");

    //Closing the accordian item should no longer show it
    await appearTextBttn.click();
    await expect(hiddenParagraph).toHaveCSS("max-height", "0px");
  });
});
