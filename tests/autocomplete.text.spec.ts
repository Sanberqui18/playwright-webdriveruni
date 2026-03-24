import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Autocomplete Text - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify title and section elements", async ({ page }) => {
    const homePage = new HomePage(page);
    const autoPage = await homePage.openAutocompleteText();

    // Verify navigation
    await expect(autoPage.page).toHaveURL(
      "Autocomplete-TextField/autocomplete-textfield.html"
    );

    // Verify items are visible and texts are correct
    await expect(autoPage.pageTitle).toBeVisible();
    await expect(autoPage.searchField).toBeVisible();
    await expect(autoPage.searchField).toHaveAttribute("placeholder", "Food Item");
    await expect(autoPage.submitButton).toBeVisible();
    await expect(autoPage.footer).toBeVisible();

    await expect(autoPage.pageNavTitle).toContainText(/WebdriverUniversity/);
    await expect(autoPage.footer).toContainText("Copyright");

    // Verify list search is initially hidden
    await expect(autoPage.resultList).toBeHidden();
    await expect(autoPage.listItems).toHaveCount(0);

    // Take a snapshot to verify image and components location
    await expect(autoPage.page).toHaveScreenshot({
      fullPage: true
    });
  });

  test("Select an option should display a list of elements", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const autoPage = await homePage.openAutocompleteText();

    // Verify autocompletion shows a list between 1 - 10 elements
    await autoPage.search("A");
    await expect(autoPage.resultList).toBeVisible();
    expect((await autoPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await autoPage.clearSearch();

    await autoPage.search("b");
    await expect(autoPage.resultList).toBeVisible();
    expect((await autoPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await autoPage.clearSearch();

    await autoPage.search("C");
    await expect(autoPage.resultList).toBeVisible();
    expect((await autoPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await autoPage.clearSearch();

    await autoPage.search("d");
    await expect(autoPage.resultList).toBeVisible();
    expect((await autoPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);
  });

  test("Validate Autocomplite search works correctly", async ({ page }) => {
    const homePage = new HomePage(page);
    const autoPage = await homePage.openAutocompleteText();

    // Verify autocompletion
    await autoPage.search("F");
    await expect(autoPage.resultList).toBeVisible();
    await expect(autoPage.listItems).toHaveCount(3);
    await expect(autoPage.listItems).toContainText([/F/, /F/, /F/]);

    await autoPage.clearSearch();

    await autoPage.search("french");
    await expect(autoPage.resultList).toBeVisible();
    await expect(autoPage.listItems).toHaveCount(2);
    await expect(autoPage.listItems).toContainText([/French/, /French/]);

    await autoPage.clearSearch();

    await autoPage.search("French d");
    await expect(autoPage.resultList).toBeVisible();
    await expect(autoPage.listItems).toHaveCount(1);
    await expect(autoPage.listItems).toContainText(/French d/);

    await autoPage.clearSearch();

    await autoPage.search("French a");
    await expect(autoPage.resultList).toBeHidden();
    await expect(autoPage.listItems).toHaveCount(0);
  });

  test("Verify submitted option is working correclty", async ({ page }) => {
    const homePage = new HomePage(page);
    const autoPage = await homePage.openAutocompleteText();

    // Set option and submit
    await autoPage.selectAndSubmit("Kiwi");
    await expect(autoPage.page).toHaveURL(/food-item=Kiwi/);

    // Set option and submit
    await autoPage.selectAndSubmit("Cabbage");
    await expect(autoPage.page).toHaveURL(/food-item=Cabbage/);

    // Set option and submit
    await autoPage.selectAndSubmit("Spaghetti");
    await expect(autoPage.page).toHaveURL(/food-item=Spaghetti/);
  });
});
