import { test, expect } from "./fixtures";
import { faker } from "@faker-js/faker";

test.describe("Login Portal Tests - Happy Path", () => {
  test("Log in with valid credentials should show an alert success message", async ({
    loginPortalPage
  }) => {
    // Verify page URL to contain the login portal
    await expect(loginPortalPage.page).toHaveURL(/login-portal/i);

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    loginPortalPage.page.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("validation succeeded");
      await dialog.accept();
    });

    // Fill out the details and submit form (will fire then on() event)
    await loginPortalPage.login(
      process.env.USERNAME as string,
      process.env.PASSWORD as string
    );
  });

  test("Login Page Animation should contain 10 animation bubbles", async ({
    loginPortalPage
  }) => {
    await expect(loginPortalPage.animationBubbles).toHaveCount(10);
  });
});

test.describe("Login Portal Tests - Unhappy Path", () => {
  test("Submit empty/incomplete form should show an alert error message", async ({
    loginPortalPage
  }) => {
    // Define dialog event (alert) before clicking on the button
    // Grab alert message to assert afterwards
    // Called every time an alert is opened
    let errorMessage: string = "";

    loginPortalPage.page.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("validation failed");
      await dialog.accept();
    });

    // Fill username and submit
    await loginPortalPage.usernameField.fill(process.env.USERNAME as string);
    await loginPortalPage.loginButton.click();

    // Wait page to load after closing alert
    await loginPortalPage.page.waitForLoadState();

    // Fill password and submit
    await loginPortalPage.passwordField.fill(process.env.PASSWORD as string);
    await loginPortalPage.loginButton.click();

    // Wait page to load after closing alert
    await loginPortalPage.page.waitForLoadState();

    // Submit empty form
    await loginPortalPage.loginButton.click();
  });

  test("Submit invalid credentials should show an alert error message", async ({
    loginPortalPage
  }) => {
    // Define dialog event (alert) before clicking on the button
    // Grab alert message to assert afterwards
    let errorMessage: string = "";

    loginPortalPage.page.on("dialog", async (dialog) => {
      errorMessage = dialog.message();
      expect(errorMessage).toContain("validation failed");
      await dialog.accept();
    });

    // Fill out the details and submit form (will fire then on() event)
    await loginPortalPage.login(
      faker.person.firstName(),
      faker.person.jobArea()
    );
  });
});
