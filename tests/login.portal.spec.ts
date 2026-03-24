import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";

test.describe("Login Portal Tests - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Log in with valid credentials should show an alert success message", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLoginPortal();

    // Verify page URL to contain the login portal
    await expect(loginPage.page).toHaveURL(/login-portal/i);

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    loginPage.page.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("validation succeeded");
      await dialog.accept();
    });

    // Fill out the details and submit form (will fire then on() event)
    await loginPage.login(
      process.env.USERNAME as string,
      process.env.PASSWORD as string
    );
  });

  test("Login Page Animation should contain 10 animation bubbles", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLoginPortal();

    await expect(loginPage.animationBubbles).toHaveCount(10);
  });
});

test.describe("Login Portal Tests - Unhappy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Submit empty/incomplete form should show an alert error message", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLoginPortal();

    // Define dialog event (alert) before clicking on the button
    // Grab alert message to assert afterwards
    // Called every time an alert is opened
    let errorMessage: string = "";

    loginPage.page.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("validation failed");
      await dialog.accept();
    });

    // Fill username and submit
    await loginPage.usernameField.fill(process.env.USERNAME as string);
    await loginPage.loginButton.click();

    // Wait page to load after closing alert
    await loginPage.page.waitForLoadState();

    // Fill password and submit
    await loginPage.passwordField.fill(process.env.PASSWORD as string);
    await loginPage.loginButton.click();

    // Wait page to load after closing alert
    await loginPage.page.waitForLoadState();

    // Submit empty form
    await loginPage.loginButton.click();
  });

  test("Submit invalid credentials should show an alert error message", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const loginPage = await homePage.openLoginPortal();

    // Define dialog event (alert) before clicking on the button
    // Grab alert message to assert afterwards
    let errorMessage: string = "";

    loginPage.page.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("validation failed");
      await dialog.accept();
    });

    // Fill out the details and submit form (will fire then on() event)
    await loginPage.login(
      faker.person.firstName(),
      faker.person.jobArea()
    );
  });
});
