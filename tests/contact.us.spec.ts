import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";

test.describe("Contact Use Tests - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Contact US Page Header", async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = await homePage.openContactUs();

    // Verify Header Title exists
    await expect(contactPage.navTitle).toContainText(/WebdriverUniversity.com/);
  });

  test("Submit Form with all fields should work", async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = await homePage.openContactUs();

    // Verify page URL to contain the contact us
    await expect(contactPage.page).toHaveURL(/contact-us/i);

    // Fill all Fields
    await contactPage.fillForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email({ firstName: faker.person.firstName() }),
      faker.lorem.paragraph(3)
    );

    // Submit form
    await contactPage.submit();

    //Verify page redirection
    await expect(contactPage.page).toHaveURL(/contact-form-thank-you/);

    // Verify Success message form
    await expect(contactPage.successHeading).toBeVisible();

    //Verify Animation Exist and is Correct
    await expect(contactPage.animation).toBeVisible();
    await expect(contactPage.animationDots).toHaveCount(8);
  });

  test("Reset form field should blank all of them", async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = await homePage.openContactUs();

    // Fill all Fields
    await contactPage.fillForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email({ firstName: faker.person.firstName() }),
      faker.lorem.paragraph(3)
    );

    //Reset fields and verify they should be blank
    await contactPage.reset();

    await expect(contactPage.firstNameField).toHaveText("");
    await expect(contactPage.lastNameField).toHaveText("");
    await expect(contactPage.emailField).toHaveText("");
    await expect(contactPage.commentsField).toHaveText("");
  });
});

test.describe("Contact Use Tests - Unhappy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Submit Form without Filling any data should show an error", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const contactPage = await homePage.openContactUs();

    // Submit empty form
    await contactPage.submit();

    //Validate error QTY and texts
    await expect(contactPage.errorBreaks).toHaveCount(2);
    await expect(contactPage.bodyErrors).toContainText("all fields are required");
    await expect(contactPage.bodyErrors).toContainText("Invalid email address");
  });

  test("Submit form without any field should show an error", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const contactPage = await homePage.openContactUs();

    // Fill First Name
    await contactPage.firstNameField.fill(faker.person.firstName());

    // Submit Form
    await contactPage.submit();

    //Validate error QTY and texts
    await expect(contactPage.errorBreaks).toHaveCount(2);
    await expect(contactPage.bodyErrors).toContainText("all fields are required");
    await expect(contactPage.bodyErrors).toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactPage.goBackToForm();

    // Clear first Name Value
    await contactPage.firstNameField.clear();

    // Fill Last Name
    await contactPage.lastNameField.fill(faker.person.lastName());

    // Submit Form
    await contactPage.submit();

    // Validate error QTY and texts
    await expect(contactPage.errorBreaks).toHaveCount(2);
    await expect(contactPage.bodyErrors).toContainText("all fields are required");
    await expect(contactPage.bodyErrors).toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactPage.goBackToForm();

    // Clear Last Name Value
    await contactPage.lastNameField.clear();

    // Fill Email Field with a valid Email
    await contactPage.emailField.fill(
      faker.internet.email({ firstName: faker.person.firstName() })
    );

    // Submit Form
    await contactPage.submit();

    // Validate error QTY and texts
    await expect(contactPage.errorBreaks).toHaveCount(1);
    await expect(contactPage.bodyErrors).toContainText("all fields are required");
    await expect(contactPage.bodyErrors).not.toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactPage.goBackToForm();

    // Clear email Value
    await contactPage.emailField.clear();

    // Fill Comments Field
    await contactPage.commentsField.fill(faker.lorem.paragraph(3));

    // Submit Form
    await contactPage.submit();

    // Validate error QTY and texts
    await expect(contactPage.errorBreaks).toHaveCount(2);
    await expect(contactPage.bodyErrors).toContainText("all fields are required");
    await expect(contactPage.bodyErrors).toContainText("Invalid email address");
  });

  test("Submit all data without a valid email should show the email error", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const contactPage = await homePage.openContactUs();

    // Fill all Fields (Invalid Email)
    await contactPage.fillForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.person.middleName(),
      faker.lorem.paragraph(3)
    );

    // Submit form
    await contactPage.submit();

    // Validate error QTY and texts
    await expect(contactPage.errorBreaks).toHaveCount(1);
    await expect(contactPage.bodyErrors).not.toContainText("all fields are required");
    await expect(contactPage.bodyErrors).toContainText("Invalid email address");
  });
});
