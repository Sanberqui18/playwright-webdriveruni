/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "./fixtures";

test.describe("Text Effects - Only path", () => {
  test("Verify page header, titles and button texts", async ({ textAffectsPage }) => {
    // Verify url
    await expect(textAffectsPage.page).toHaveURL(/Accordion/);

    // Verify Header Title exists
    await expect(textAffectsPage.navTitle).toContainText(/WebDriver/);

    // Verify Page title is visible
    await expect(textAffectsPage.pageTitle).toBeVisible();

    // Verify Buttons QTY = 4 and Texts
    const buttonTexts = [
      "Manual Testing",
      "Cucumber BDD",
      "Automation Testing",
      "Keep Clicking! - Text will Appear After 5 Seconds!"
    ];

    await expect(textAffectsPage.buttons).toHaveCount(4);
    await expect(textAffectsPage.buttons).toHaveText(buttonTexts);

    // Verify footer text exists and is visible
    await expect(textAffectsPage.footer).toContainText("Copyright");
    await expect(textAffectsPage.footer).toBeVisible();
  });

  test("Verify button texts are initially hidden and show when clicking on them", async ({
    textAffectsPage
  }) => {
    // Define Buttons
    const manualTestingBttn = textAffectsPage.page.getByRole("button", {
      name: "Manual Testing"
    });
    const cucumberBttn = textAffectsPage.page.getByRole("button", {
      name: "Cucumber BDD"
    });
    const automationBttn = textAffectsPage.page.getByRole("button", {
      name: "Automation Testing"
    });

    // Define linear paragraphs
    const paragraph1 = textAffectsPage.paragraphs.nth(0);
    const paragraph2 = textAffectsPage.paragraphs.nth(1);
    const paragraph3 = textAffectsPage.paragraphs.nth(2);

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

  test("Verify asyncronous actions generated in page", async ({ textAffectsPage }) => {
    // Define Hide elements
    const appearTextBttn = textAffectsPage.page.getByRole("button", {
      name: "Keep Clicking!"
    });

    // Verify loading stage
    await expect(textAffectsPage.hiddenText).toHaveText("LOADING.. PLEASE WAIT..");

    // Click on button and verify it does not display paragraph
    await appearTextBttn.click();
    await expect(textAffectsPage.timeoutBox).toHaveCSS("max-height", "0px");
    await appearTextBttn.click();

    // After 3 seconds verify loading stage and hidden text still there
    // waitForTimeout is intentional here: testing 5-second async behavior
    await textAffectsPage.page.waitForTimeout(3000);

    await appearTextBttn.click();
    await expect(textAffectsPage.timeoutBox).toHaveCSS("max-height", "0px");
    await appearTextBttn.click();

    await expect(textAffectsPage.hiddenText).toHaveText("LOADING.. PLEASE WAIT..");

    // After 5 seconds verify loading stage changed and hidden text is released
    // waitForTimeout is intentional here: testing 5-second async behavior
    await textAffectsPage.page.waitForTimeout(2000);

    await expect(textAffectsPage.hiddenText).toHaveText("LOADING COMPLETE.");

    await appearTextBttn.click();
    await expect(textAffectsPage.timeoutBox).toHaveCSS("max-height", "20px");
    await expect(textAffectsPage.timeoutBox).toContainText("after 5 seconds!");

    //Closing the accordian item should no longer show it
    await appearTextBttn.click();
    await expect(textAffectsPage.timeoutBox).toHaveCSS("max-height", "0px");
  });
});
