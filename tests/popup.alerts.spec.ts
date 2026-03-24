import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Pop-Up & Aletrs - only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify titles, sections and button visibility and texts", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const popupPage = await homePage.openPopupAlerts();

    // Validate Section QTY = 4 and title and footer
    await expect(popupPage.pageNavTitle).toContainText(/WebdriverUniversity/i);
    await expect(popupPage.mainTitle).toHaveText("Annoying Popup & Alerts!");
    await expect(popupPage.sections).toHaveCount(4);
    await expect(popupPage.footer).toContainText("Copyright");
  });

  test("JavaScript Alert is opened when clicking on button and is working correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const popupPage = await homePage.openPopupAlerts();

    //Define dialog event (alert) before clicking on the button
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    popupPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
      expect(successMessage).toContain("I am an alert box!");
      await dialog.accept();
    });

    // Click on button to open the alert
    await popupPage.jsAlertButton.click();
  });

  test("Modal Pop-up should appear when clicking on button and work correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const popupPage = await homePage.openPopupAlerts();

    // Verify initial state (modal hidden)
    await expect(popupPage.modal).toBeHidden();

    // Open modal and verify title and texts to exist and be visible
    await popupPage.modalButton.click();

    await expect(popupPage.modal).toBeVisible();
    await expect(popupPage.modalTitle).toBeVisible();
    await expect(popupPage.modalContent).toBeVisible();

    // Verify close icon and button work correctly
    await popupPage.modalCloseBtn.click();
    await expect(popupPage.modal).toBeHidden();

    await popupPage.modalButton.click();

    await popupPage.modalCloseIcon.click();
    await expect(popupPage.modal).toBeHidden();
  });

  test("Ajax Loader Page should be opened when clicking on the Ajax loader button", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const popupPage = await homePage.openPopupAlerts();

    // Click on button to open the ajax loader page
    await popupPage.ajaxButton.click();

    await expect(popupPage.page).toHaveURL(/Ajax-Loader/);
  });

  test("JavaScript Confirm Box (Accept) should be opened when clicking on button and work correcly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const popupPage = await homePage.openPopupAlerts();

    //Define dialog event (alert) before clicking on the button
    let dialogMessage: string = "";

    popupPage.page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      expect(dialogMessage).toContain("Press a button!");
      dialog.accept();
    });

    // Verify initial state
    await expect(popupPage.confirmResultText).toBeHidden();

    // Click on the Confirm box button to open dialog
    await popupPage.confirmButton.click();
    await popupPage.page.waitForLoadState();

    //Verify Section message is shown and correct
    await expect(popupPage.confirmResultText).toBeVisible();
    await expect(popupPage.confirmResultText).toHaveText("You pressed OK!");
  });

  test("JavaScript Confirm Box (Dismiss) should be opened when clicking on button and work correcly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const popupPage = await homePage.openPopupAlerts();

    //Define dialog event (alert) before clicking on the button
    let dialogMessage: string = "";

    popupPage.page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      expect(dialogMessage).toContain("Press a button!");
      dialog.dismiss();
    });

    // Verify initial state
    await expect(popupPage.confirmResultText).toBeHidden();

    // Click on the Confirm box button to open dialog
    await popupPage.confirmButton.click();
    await popupPage.page.waitForLoadState();

    //Verify Section message is shown and correct
    await expect(popupPage.confirmResultText).toBeVisible();
    await expect(popupPage.confirmResultText).toHaveText("You pressed Cancel!");
  });
});
