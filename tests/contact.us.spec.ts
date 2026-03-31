import { test, expect } from "./fixtures";
import { faker } from "@faker-js/faker";

test.describe("Contact Use Tests - Happy Path", () => {
  test("Verify Contact US Page Header", async ({ contactUsPage }) => {
    // Verify Header Title exists
    await expect(contactUsPage.navTitle).toContainText(/WebdriverUniversity.com/);
  });

  test("Submit Form with all fields should work", async ({ contactUsPage }) => {
    // Verify page URL to contain the contact us
    await expect(contactUsPage.page).toHaveURL(/contact-us/i);

    // Fill all Fields
    await contactUsPage.fillForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email({ firstName: faker.person.firstName() }),
      faker.lorem.paragraph(3)
    );

    // Submit form
    await contactUsPage.submit();

    //Verify page redirection
    await expect(contactUsPage.page).toHaveURL(/contact-form-thank-you/);

    // Verify Success message form
    await expect(contactUsPage.successHeading).toBeVisible();

    //Verify Animation Exist and is Correct
    await expect(contactUsPage.animation).toBeVisible();
    await expect(contactUsPage.animationDots).toHaveCount(8);
  });

  test("Reset form field should blank all of them", async ({ contactUsPage }) => {
    // Fill all Fields
    await contactUsPage.fillForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email({ firstName: faker.person.firstName() }),
      faker.lorem.paragraph(3)
    );

    //Reset fields and verify they should be blank
    await contactUsPage.reset();

    await expect(contactUsPage.firstNameField).toHaveText("");
    await expect(contactUsPage.lastNameField).toHaveText("");
    await expect(contactUsPage.emailField).toHaveText("");
    await expect(contactUsPage.commentsField).toHaveText("");
  });
});

test.describe("Contact Use Tests - Unhappy Path", () => {
  test("Submit Form without Filling any data should show an error", async ({
    contactUsPage
  }) => {
    // Submit empty form
    await contactUsPage.submit();

    //Validate error QTY and texts
    await expect(contactUsPage.errorBreaks).toHaveCount(2);
    await expect(contactUsPage.bodyErrors).toContainText("all fields are required");
    await expect(contactUsPage.bodyErrors).toContainText("Invalid email address");
  });

  test("Submit form without any field should show an error", async ({
    contactUsPage
  }) => {
    // Fill First Name
    await contactUsPage.firstNameField.fill(faker.person.firstName());

    // Submit Form
    await contactUsPage.submit();

    //Validate error QTY and texts
    await expect(contactUsPage.errorBreaks).toHaveCount(2);
    await expect(contactUsPage.bodyErrors).toContainText("all fields are required");
    await expect(contactUsPage.bodyErrors).toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactUsPage.goBackToForm();

    // Clear first Name Value
    await contactUsPage.firstNameField.clear();

    // Fill Last Name
    await contactUsPage.lastNameField.fill(faker.person.lastName());

    // Submit Form
    await contactUsPage.submit();

    // Validate error QTY and texts
    await expect(contactUsPage.errorBreaks).toHaveCount(2);
    await expect(contactUsPage.bodyErrors).toContainText("all fields are required");
    await expect(contactUsPage.bodyErrors).toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactUsPage.goBackToForm();

    // Clear Last Name Value
    await contactUsPage.lastNameField.clear();

    // Fill Email Field with a valid Email
    await contactUsPage.emailField.fill(
      faker.internet.email({ firstName: faker.person.firstName() })
    );

    // Submit Form
    await contactUsPage.submit();

    // Validate error QTY and texts
    await expect(contactUsPage.errorBreaks).toHaveCount(1);
    await expect(contactUsPage.bodyErrors).toContainText("all fields are required");
    await expect(contactUsPage.bodyErrors).not.toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactUsPage.goBackToForm();

    // Clear email Value
    await contactUsPage.emailField.clear();

    // Fill Comments Field
    await contactUsPage.commentsField.fill(faker.lorem.paragraph(3));

    // Submit Form
    await contactUsPage.submit();

    // Validate error QTY and texts
    await expect(contactUsPage.errorBreaks).toHaveCount(2);
    await expect(contactUsPage.bodyErrors).toContainText("all fields are required");
    await expect(contactUsPage.bodyErrors).toContainText("Invalid email address");
  });

  test("Submit all data without a valid email should show the email error", async ({
    contactUsPage
  }) => {
    // Fill all Fields (Invalid Email)
    await contactUsPage.fillForm(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.person.middleName(),
      faker.lorem.paragraph(3)
    );

    // Submit form
    await contactUsPage.submit();

    // Validate error QTY and texts
    await expect(contactUsPage.errorBreaks).toHaveCount(1);
    await expect(contactUsPage.bodyErrors).not.toContainText("all fields are required");
    await expect(contactUsPage.bodyErrors).toContainText("Invalid email address");
  });
});
