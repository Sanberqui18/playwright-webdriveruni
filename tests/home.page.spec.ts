import { test, expect } from "@playwright/test";

test.describe("Home Page Tests - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Home Page Header", async ({ page }) => {
    // Verify Header title and redirection
    const headerTitle = page.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
    await headerTitle.click();
    expect(page.url()).toContain("https://webdriveruniversity.com");
  });

  test("Verify Discount, and Course Text/Links", async ({ page }) => {
    // Set expected outputs
    const titlesAndURLs = [
      {
        title: "API Testing in detail using Postman - Test Automation",
        url: `https://www.udemy.com/course/the-api-master-class-testing-in-detail-using-postman/`
      },
      {
        title: "Cypress with Cucumber BDD - Automation Testing Bootcamp",
        url: `https://www.udemy.com/course/cypress-with-cucumber-bdd-beginner-to-expert-in-9-hours/`
      },
      {
        title: "The Complete Cypress v12 Course- Automation Testing Bootcamp",
        url: `https://www.udemy.com/course/cypress-io-master-class/`
      },
      {
        title: "The Complete WebdriverIO Course- Automation Testing Bootcamp",
        url: `https://www.udemy.com/course/automation-testing-javascript-webdriverio-selenium-more/`
      },
      {
        title: "Selenium WebDriver 4 - New Features in Detail!",
        url: `https://www.udemy.com/course/selenium-webdriver-4-new-features-in-detail/`
      },
      {
        title: "Mastering Selectors/ Locators for Automation Testing!",
        url: `https://www.udemy.com/course/mastering-locators/`
      },
      {
        title: "Selenium WebDriver 4, Cucumber BDD, Java & More!",
        url: `https://www.udemy.com/course/cucumber-bdd-selenium-java-complete-automation-course/`
      },
      {
        title: "Selenium Webdriver & Java - Using Real Examples - 2024",
        url: `https://www.udemy.com/course/selenium-webdriver-java-using-real-examples/`
      }
    ];

    // Verify Discount
    const discountText = page.getByRole("heading", {
      name: "🚀Unlock Your Potential:"
    });

    await expect(discountText).toContainText("89%");

    // Verify Course QTY, titles and navigation
    const homeLinks = page.locator("p > a");
    await expect(homeLinks).toHaveCount(9);

    for (const [key, value] of titlesAndURLs.entries()) {
      const linkTitles = await homeLinks.allInnerTexts();

      expect(linkTitles[key]).toBe(value.title);
      await homeLinks.nth(key).click();
      expect(page.url()).toContain(value.url);
      await page.goBack();
    }
  });

  test("Verify Home Section Quantities and Texts", async ({ page }) => {
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
    const pageSections = page.locator(".thumbnail > .section-title");
    await expect(pageSections).toHaveCount(17);
    await expect(pageSections).toHaveText(expectedSections);
  });
});
