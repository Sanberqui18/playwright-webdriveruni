import { test, expect } from "@playwright/test";

test.describe("Pop-Up & Aletrs - only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify titles, sections and button visibility and texts", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /POPUP & ALERTS/ })
        .click()
    ]);

    await popupPage.waitForLoadState();

    // Define title and sections
    const headerTitle = popupPage.getByRole("navigation");

    const title = popupPage.locator("#main-header");

    const sections = popupPage.locator(".thumbnail");

    const footer = popupPage.getByRole("paragraph").last();

    // Validate Section QTY = 4 and title and footer
    await expect(headerTitle).toContainText(/WebdriverUniversity/i);
    await expect(title).toHaveText("Annoying Popup & Alerts!");
    await expect(sections).toHaveCount(4);
    await expect(footer).toContainText("Copyright");
  });

  test("JavaScript Alert is opened when clicking on button and is working correctly", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /POPUP & ALERTS/ })
        .click()
    ]);

    await popupPage.waitForLoadState();

    // Define section and elements
    const jsAlertSection = popupPage
      .getByText("Javascript Alert")
      .locator("..");

    const jsAlertbttn = jsAlertSection.locator("#button1");

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    popupPage.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("I am an alert box!");
      await dialog.accept();
    });

    // Click on button to open the alert
    await jsAlertbttn.click();
  });

  test("Modal Pop-up should appear when clicking on button and work correctly", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /POPUP & ALERTS/ })
        .click()
    ]);

    await popupPage.waitForLoadState();

    // Define section and elements
    const modalSection = popupPage.getByText("Modal Popup").locator("..");

    const modalBttn = modalSection.locator("#button2");

    // Define modal elements
    const modal = popupPage.getByRole("dialog");
    const modalTitle = popupPage
      .getByRole("heading")
      .filter({ hasText: "It’s that Easy!! Well I think it is....." });
    const modalContent = modal.getByRole("paragraph").filter({
      hasText: "We can inject and use JavaScript code if all else fails!"
    });

    const closeBttn = modal.getByRole("button", { name: "Close" });
    const modalCloseIcon = modal.getByRole("button", { name: "×" });

    // Verify initial state (modal hidden)
    await expect(modal).toBeHidden();

    // Open modal and verify title and texts to exist and be visible
    await modalBttn.click();

    await expect(modal).toBeVisible();
    await expect(modalTitle).toBeVisible();
    await expect(modalContent).toBeVisible();

    // Verify close icon and button work correclty
    await closeBttn.click();
    await expect(modal).toBeHidden();

    await modalBttn.click();

    await modalCloseIcon.click();
    await expect(modal).toBeHidden();
  });

  test("Ajax Loader Page should be opened when clicking on the Ajax loader button", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /POPUP & ALERTS/ })
        .click()
    ]);

    await popupPage.waitForLoadState();

    // Define section and elements
    const ajaxSection = popupPage.getByText("Ajax Loader").locator("..");

    const ajaxBttn = ajaxSection.locator("#button3");

    // Click on button to open the ajax loader page
    await ajaxBttn.click();

    await expect(popupPage).toHaveURL(/Ajax-Loader/);
  });

  test("JavaScript Confirm Box (Accept) should be opened when clicking on button and work correcly", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /POPUP & ALERTS/ })
        .click()
    ]);

    await popupPage.waitForLoadState();

    // Define section and elements
    const jsConfirmSection = popupPage
      .getByText("JavaScript Confirm Box")
      .locator("..");

    const jsConfirmBttn = jsConfirmSection.locator("#button4");

    const message = popupPage.locator("#confirm-alert-text");

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let dialogMessage: string = "";

    popupPage.on("dialog", async (dialog) => {
      // Grab allert message
      dialogMessage = dialog.message();

      // Verify success message from the dialog
      expect(dialogMessage).toContain("Press a button!");
      dialog.accept();
    });

    // Verify initial state
    await expect(message).toBeHidden();

    // Click on the Confirm box button to open dialog
    await jsConfirmBttn.click();
    await popupPage.waitForLoadState();

    //Verify Section message is shown and correct
    await expect(message).toBeVisible();
    await expect(message).toHaveText("You pressed OK!");
  });

  test("JavaScript Confirm Box (Dismiss) should be opened when clicking on button and work correcly", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [popupPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /POPUP & ALERTS/ })
        .click()
    ]);

    await popupPage.waitForLoadState();

    // Define section and elements
    const jsConfirmSection = popupPage
      .getByText("JavaScript Confirm Box")
      .locator("..");

    const jsConfirmBttn = jsConfirmSection.locator("#button4");

    const message = popupPage.locator("#confirm-alert-text");

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let dialogMessage: string = "";

    popupPage.on("dialog", async (dialog) => {
      // Grab allert message
      dialogMessage = dialog.message();

      // Verify success message from the dialog
      expect(dialogMessage).toContain("Press a button!");
      dialog.dismiss();
    });

    // Verify initial state
    await expect(message).toBeHidden();

    // Click on the Confirm box button to open dialog
    await jsConfirmBttn.click();
    await popupPage.waitForLoadState();

    //Verify Section message is shown and correct
    await expect(message).toBeVisible();
    await expect(message).toHaveText("You pressed Cancel!");
  });
});
