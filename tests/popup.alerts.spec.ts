import { test, expect } from "./fixtures";

test.describe("Pop-Up & Aletrs - only Path", () => {
  test("Verify titles, sections and button visibility and texts", async ({
    popupAlertsPage
  }) => {
    // Validate Section QTY = 4 and title and footer
    await expect(popupAlertsPage.pageNavTitle).toContainText(/WebdriverUniversity/i);
    await expect(popupAlertsPage.mainTitle).toHaveText("Annoying Popup & Alerts!");
    await expect(popupAlertsPage.sections).toHaveCount(4);
    await expect(popupAlertsPage.footer).toContainText("Copyright");
  });

  test("JavaScript Alert is opened when clicking on button and is working correctly", async ({
    popupAlertsPage
  }) => {
    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    popupAlertsPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
      expect(successMessage).toContain("I am an alert box!");
      await dialog.accept();
    });

    // Click on button to open the alert
    await popupAlertsPage.jsAlertButton.click();
  });

  test("Modal Pop-up should appear when clicking on button and work correctly", async ({
    popupAlertsPage
  }) => {
    // Verify initial state (modal hidden)
    await expect(popupAlertsPage.modal).toBeHidden();

    // Open modal and verify title and texts to exist and be visible
    await popupAlertsPage.modalButton.click();

    await expect(popupAlertsPage.modal).toBeVisible();
    await expect(popupAlertsPage.modalTitle).toBeVisible();
    await expect(popupAlertsPage.modalContent).toBeVisible();

    // Verify close icon and button work correctly
    await popupAlertsPage.modalCloseBtn.click();
    await expect(popupAlertsPage.modal).toBeHidden();

    await popupAlertsPage.modalButton.click();

    await popupAlertsPage.modalCloseIcon.click();
    await expect(popupAlertsPage.modal).toBeHidden();
  });

  test("Ajax Loader Page should be opened when clicking on the Ajax loader button", async ({
    popupAlertsPage
  }) => {
    // Click on button to open the ajax loader page
    await popupAlertsPage.ajaxButton.click();

    await expect(popupAlertsPage.page).toHaveURL(/Ajax-Loader/);
  });

  test("JavaScript Confirm Box (Accept) should be opened when clicking on button and work correcly", async ({
    popupAlertsPage
  }) => {
    //Define dialog event (alert) before clicking on the button
    let dialogMessage: string = "";

    popupAlertsPage.page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      expect(dialogMessage).toContain("Press a button!");
      dialog.accept();
    });

    // Verify initial state
    await expect(popupAlertsPage.confirmResultText).toBeHidden();

    // Click on the Confirm box button to open dialog
    await popupAlertsPage.confirmButton.click();
    await popupAlertsPage.page.waitForLoadState();

    //Verify Section message is shown and correct
    await expect(popupAlertsPage.confirmResultText).toBeVisible();
    await expect(popupAlertsPage.confirmResultText).toHaveText("You pressed OK!");
  });

  test("JavaScript Confirm Box (Dismiss) should be opened when clicking on button and work correcly", async ({
    popupAlertsPage
  }) => {
    //Define dialog event (alert) before clicking on the button
    let dialogMessage: string = "";

    popupAlertsPage.page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      expect(dialogMessage).toContain("Press a button!");
      dialog.dismiss();
    });

    // Verify initial state
    await expect(popupAlertsPage.confirmResultText).toBeHidden();

    // Click on the Confirm box button to open dialog
    await popupAlertsPage.confirmButton.click();
    await popupAlertsPage.page.waitForLoadState();

    //Verify Section message is shown and correct
    await expect(popupAlertsPage.confirmResultText).toBeVisible();
    await expect(popupAlertsPage.confirmResultText).toHaveText("You pressed Cancel!");
  });
});
