import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Contact Use Tests - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Contact US Page Header", async ({ page }) => {
    // Navigate to the Contact us page in a separate Tab
    const contactPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "CONTACT US" }).click();
    const contactPage = await contactPromise;
    await contactPage.waitForLoadState();

    // Verify Header Title exists
    const headerTitle = contactPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
  });

  test("Submit Form with all fields should work", async ({ page }) => {
    // Navigate to the Contact us page in a separate Tab
    const contactPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "CONTACT US" }).click();
    const contactPage = await contactPromise;
    await contactPage.waitForLoadState();

    // Verify page URL to contain the contact us
    expect(contactPage).toHaveURL(/contact-us/i);

    //Set Values for Input fields
    const firstNameField = contactPage.getByPlaceholder("First Name");
    const lastNameField = contactPage.getByPlaceholder("Last Name");
    const emailField = contactPage.getByPlaceholder("Email Address");
    const commentsField = contactPage.getByPlaceholder("Comments");

    // Fill all Fields
    await firstNameField.fill(faker.person.firstName());
    await lastNameField.fill(faker.person.lastName());
    await emailField.fill(
      faker.internet.email({ firstName: faker.person.firstName() })
    );
    await commentsField.fill(faker.lorem.paragraph(3));

    // Submit form
    const submitBttn = contactPage.getByRole("button", { name: /submit/i });
    await submitBttn.click();

    //Verify page redirection
    expect(contactPage).toHaveURL(/contact-form-thank-you/);

    // Verify Success message form
    const successMessage = contactPage.getByRole("heading", {
      name: "Thank You for your Message!"
    });

    await expect(successMessage).toBeVisible();

    //Verify Animation Exist and is Correct
    const animation = contactPage.locator("#fountainG");
    const animationDots = contactPage.locator("#fountainG > .fountainG");

    await expect(animation).toBeVisible();
    await expect(animationDots).toHaveCount(8);
  });

  test("Reset form field should blank all of them", async ({ page }) => {
    // Navigate to the Contact us page in a separate Tab
    const contactPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "CONTACT US" }).click();
    const contactPage = await contactPromise;
    await contactPage.waitForLoadState();

    //Set Values for Input fields
    const firstNameField = contactPage.getByPlaceholder("First Name");
    const lastNameField = contactPage.getByPlaceholder("Last Name");
    const emailField = contactPage.getByPlaceholder("Email Address");
    const commentsField = contactPage.getByPlaceholder("Comments");

    // Fill all Fields
    await firstNameField.fill(faker.person.firstName());
    await lastNameField.fill(faker.person.lastName());
    await emailField.fill(
      faker.internet.email({ firstName: faker.person.firstName() })
    );
    await commentsField.fill(faker.lorem.paragraph(3));

    //Reset fields and verify they should be blank
    const resetBttn = contactPage.getByRole("button", { name: /reset/i });
    await resetBttn.click();

    await expect(firstNameField).toHaveText("");
    await expect(lastNameField).toHaveText("");
    await expect(emailField).toHaveText("");
    await expect(commentsField).toHaveText("");
  });
});

test.describe("Contact Use Tests - Unhappy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Submit Form without Filling any data should show an error", async ({
    page
  }) => {
    // Navigate to the Contact us page in a separate Tab
    const contactPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "CONTACT US" }).click();
    const contactPage = await contactPromise;
    await contactPage.waitForLoadState();

    // Submit empty form
    const submitBttn = contactPage.getByRole("button", { name: /submit/i });
    await submitBttn.click();

    //Define page errors to validate
    const errors = contactPage.locator("body");
    const errorLength = contactPage.locator("body > br");

    //Validate error QTY and texts
    await expect(errorLength).toHaveCount(2);
    await expect(errors).toContainText("all fields are required");
    await expect(errors).toContainText("Invalid email address");
  });

  test("Submit form without any field should show an error", async ({
    page
  }) => {
    // Navigate to the Contact us page in a separate Tab
    const contactPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "CONTACT US" }).click();
    const contactPage = await contactPromise;
    await contactPage.waitForLoadState();

    //Set Values for Input fields
    const firstNameField = contactPage.getByPlaceholder("First Name");
    const lastNameField = contactPage.getByPlaceholder("Last Name");
    const emailField = contactPage.getByPlaceholder("Email Address");
    const commentsField = contactPage.getByPlaceholder("Comments");

    // Fill First Name
    await firstNameField.fill(faker.person.firstName());

    // Submit Form
    const submitBttn = contactPage.getByRole("button", { name: /submit/i });
    await submitBttn.click();

    //Define page errors to validate
    const errors = contactPage.locator("body");
    const errorLength = contactPage.locator("body > br");

    //Validate error QTY and texts
    await expect(errorLength).toHaveCount(2);
    await expect(errors).toContainText("all fields are required");
    await expect(errors).toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactPage.goBack();

    // Clear first Name Value
    await firstNameField.clear();

    // Fill Last Name
    await lastNameField.fill(faker.person.lastName());

    // Submit Form
    await submitBttn.click();

    // Validate error QTY and texts
    await expect(errorLength).toHaveCount(2);
    await expect(errors).toContainText("all fields are required");
    await expect(errors).toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactPage.goBack();

    // Clear Last Name Value
    await lastNameField.clear();

    // Fill Email Field with a valid Email
    await emailField.fill(
      faker.internet.email({ firstName: faker.person.firstName() })
    );

    // Submit Form
    await submitBttn.click();

    // Validate error QTY and texts
    await expect(errorLength).toHaveCount(1);
    await expect(errors).toContainText("all fields are required");
    await expect(errors).not.toContainText("Invalid email address");

    // Go back to the Contact Us Page
    await contactPage.goBack();

    // Clear Last Name Value
    await emailField.clear();

    // Fill Comments Field with a valid Email
    await commentsField.fill(faker.lorem.paragraph(3));

    // Submit Form
    await submitBttn.click();

    // Validate error QTY and texts
    await expect(errorLength).toHaveCount(2);
    await expect(errors).toContainText("all fields are required");
    await expect(errors).toContainText("Invalid email address");
  });

  test("Submit all data without a valid email should show the email error", async ({
    page
  }) => {
    const contactPromise = page.waitForEvent("popup");
    await page.getByRole("link").filter({ hasText: "CONTACT US" }).click();
    const contactPage = await contactPromise;
    await contactPage.waitForLoadState();

    // Set Values for Input fields
    const firstNameField = contactPage.getByPlaceholder("First Name");
    const lastNameField = contactPage.getByPlaceholder("Last Name");
    const emailField = contactPage.getByPlaceholder("Email Address");
    const commentsField = contactPage.getByPlaceholder("Comments");

    // Fill all Fields (Invalid Email)
    await firstNameField.fill(faker.person.firstName());
    await lastNameField.fill(faker.person.lastName());
    await emailField.fill(faker.person.middleName());
    await commentsField.fill(faker.lorem.paragraph(3));

    // Submit form
    const submitBttn = contactPage.getByRole("button", { name: /submit/i });
    await submitBttn.click();

    // Define page errors to validate
    const errors = contactPage.locator("body");
    const errorLength = contactPage.locator("body > br");

    // Validate error QTY and texts
    await expect(errorLength).toHaveCount(1);
    await expect(errors).not.toContainText("all fields are required");
    await expect(errors).toContainText("Invalid email address");
  });
});
