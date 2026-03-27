import { test, expect } from "./fixtures";

test.describe("Home Page Tests - Only Path", () => {
  test("Verify Home Page Header", async ({ homePage }) => {
    // Verify Header title and redirection
    await expect(homePage.navTitle).toContainText(/WebdriverUniversity.com/);
    await homePage.navTitle.click();
    expect(homePage.page.url()).toContain("https://webdriveruniversity.com");
  });

  test("Verify Discount, and Course Text/Links", async ({ homePage }) => {
    // Set expected outputs
    const titlesAndURLs = [
      {
        title: "Master Generative AI for Software Testing",
        url: `https://www.udemy.com/course/master-generative-ai-for-software-testing-manual-to-auto/`
      },
      {
        title: "API Testing with Postman",
        url: `https://www.udemy.com/course/the-api-master-class-testing-in-detail-using-postman/`
      },
      {
        title: "Playwright with TypeScript",
        url: `https://www.udemy.com/course/playwright-with-cucumber-bdd-typescript-beginner-to-pro/`
      },
      {
        title: "Playwright with Java",
        url: `https://www.udemy.com/course/playwright-cucumber-bdd-with-java-novice-to-pro/`
      },
      {
        title: "Cypress with Cucumber BDD",
        url: `https://www.udemy.com/course/cypress-with-cucumber-bdd-beginner-to-expert-in-9-hours/`
      },
      {
        title: "Complete Cypress v13 Course",
        url: `https://www.udemy.com/course/cypress-io-master-class/`
      },
      {
        title: "Complete WebdriverIO Course",
        url: `https://www.udemy.com/course/automation-testing-javascript-webdriverio-selenium-more/`
      },
      {
        title: "Selenium WebDriver 4",
        url: `https://www.udemy.com/course/selenium-webdriver-4-new-features-in-detail/`
      },
      {
        title: "Selenium + Cucumber + Java",
        url: `https://www.udemy.com/course/cucumber-bdd-selenium-java-complete-automation-course/`
      },
      {
        title: "Mastering Locators",
        url: `https://www.udemy.com/course/mastering-locators/`
      },
    ];

    // Verify Discount
    await expect(homePage.discountHeading).toContainText("89%");

    // Verify Course QTY, titles and navigation
    await expect(homePage.courseLinks).toHaveCount(10);

    for (const [key, value] of titlesAndURLs.entries()) {
      const linkTitles = await homePage.courseLinks.allInnerTexts();

      expect(linkTitles[key]).toBe(value.title);
      await homePage.courseLinks.nth(key).click();
      expect(homePage.page.url()).toContain(value.url);
      await homePage.page.goBack();
    }
  });

  test("Verify Home Section Quantities and Texts", async ({ homePage }) => {
    // Set expected sections
    const expectedSections = [
      "CONTACT US",
      "LOGIN PORTAL",
      "BUTTON CLICKS",
      "TO DO LIST",
      "PAGE OBJECT MODEL",
      "ACCORDION & TEXT AFFECTS (APPEAR & DISAPPEAR)",
      "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)",
      "AJAX LOADER",
      "ACTIONS",
      "SCROLLING AROUND",
      "POPUP & ALERTS",
      "IFRAME",
      "HIDDEN ELEMENTS",
      "DATA, TABLES & BUTTON STATES",
      "AUTOCOMPLETE TEXTFIELD",
      "FILE UPLOAD",
      "DATEPICKER"
    ];

    // Verify Section QTY and Texts
    await expect(homePage.pageSections).toHaveCount(17);
    await expect(homePage.pageSections).toHaveText(expectedSections);
  });
});
