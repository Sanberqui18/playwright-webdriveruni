import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Login Portal Tests - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Log in with valid credentials should show an alert success message ", async ({
    page
  }) => {
    // Navigate to the Login Portal page in a separate Tab
    const loginPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "LOGIN PORTAL" }).click();
    const loginPage = await loginPromise;
    await loginPage.waitForLoadState();

    // Verify page URL to contain the login portal
    expect(loginPage).toHaveURL(/login-portal/i);

    // Define username password and button fields
    const usernameField = loginPage.getByPlaceholder("Username");
    const passwordField = loginPage.getByPlaceholder("Password");
    const loginBttn = loginPage.getByRole("button", { name: /login/i });

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    loginPage.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("validation succeeded");
      await dialog.accept();
    });

    // Fill out the details and submit form (will fire then on() event)
    await usernameField.fill(process.env.USERNAME as string);
    await passwordField.fill(process.env.PASSWORD as string);
    await loginBttn.click();
  });

  test("Login Page Animation should contain 10 animation bubbles", async ({
    page
  }) => {
    // Navigate to the Login Portal page in a separate Tab
    const loginPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "LOGIN PORTAL" }).click();
    const loginPage = await loginPromise;
    await loginPage.waitForLoadState();

    const bubbles = loginPage.locator("ul > li");
    await expect(bubbles).toHaveCount(10);
  });
});

test.describe("Login Portal Tests - Unhappy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Submit empty/incomplete form should show an alert error message", async ({
    page
  }) => {
    // Navigate to the Login Portal page in a separate Tab
    const loginPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "LOGIN PORTAL" }).click();
    const loginPage = await loginPromise;
    await loginPage.waitForLoadState();

    // Define username password and button fields
    const usernameField = loginPage.getByPlaceholder("Username");
    const passwordField = loginPage.getByPlaceholder("Password");
    const loginBttn = loginPage.getByRole("button", { name: /login/i });

    // Define dialog event (alert) before clicking on the button
    // Grab alert message to assert afterwards
    // Called every time an alert is opened
    let errorMessage: string = "";

    loginPage.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("validation failed");
      await dialog.accept();
      //console.log(1); spy calls
    });

    // Fill username and submit
    await usernameField.fill(process.env.USERNAME as string);
    await loginBttn.click();

    // Wait page to load after closing alert
    await loginPage.waitForLoadState();

    // Fill password and submit
    await passwordField.fill(process.env.PASSWORD as string);
    await loginBttn.click();

    // Wait page to load after closing alert
    await loginPage.waitForLoadState();

    // Submit empty form
    await loginBttn.click();
  });

  test("Submit invalid credentials should show an alert error message", async ({
    page
  }) => {
    // Navigate to the Login Portal page in a separate Tab
    const loginPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "LOGIN PORTAL" }).click();
    const loginPage = await loginPromise;
    await loginPage.waitForLoadState();

    // Define username password and button fields
    const usernameField = loginPage.getByPlaceholder("Username");
    const passwordField = loginPage.getByPlaceholder("Password");
    const loginBttn = loginPage.getByRole("button", { name: /login/i });

    // Define dialog event (alert) before clicking on the button
    // Grab alert message to assert afterwards
    let errorMessage: string = "";

    loginPage.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("validation failed");
      await dialog.accept();
    });

    // Fill out the details and submit form (will fire then on() event)
    await usernameField.fill(faker.person.firstName());
    await passwordField.fill(faker.person.jobArea());
    await loginBttn.click();
  });
});
