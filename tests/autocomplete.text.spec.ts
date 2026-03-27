import { test, expect } from "./fixtures";

test.describe("Autocomplete Text - Only Path", () => {
  test("Verify title and section elements", async ({ autocompleteTextPage }) => {
    // Verify navigation
    await expect(autocompleteTextPage.page).toHaveURL(
      "Autocomplete-TextField/autocomplete-textfield.html"
    );

    // Verify items are visible and texts are correct
    await expect(autocompleteTextPage.pageTitle).toBeVisible();
    await expect(autocompleteTextPage.searchField).toBeVisible();
    await expect(autocompleteTextPage.searchField).toHaveAttribute("placeholder", "Food Item");
    await expect(autocompleteTextPage.submitButton).toBeVisible();
    await expect(autocompleteTextPage.footer).toBeVisible();

    await expect(autocompleteTextPage.pageNavTitle).toContainText(/WebdriverUniversity/);
    await expect(autocompleteTextPage.footer).toContainText("Copyright");

    // Verify list search is initially hidden
    await expect(autocompleteTextPage.resultList).toBeHidden();
    await expect(autocompleteTextPage.listItems).toHaveCount(0);

    // Take a snapshot to verify image and components location
    await expect(autocompleteTextPage.page).toHaveScreenshot({
      fullPage: true
    });
  });

  test("Select an option should display a list of elements", async ({
    autocompleteTextPage
  }) => {
    // Verify autocompletion shows a list between 1 - 10 elements
    await autocompleteTextPage.search("A");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    expect((await autocompleteTextPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await autocompleteTextPage.clearSearch();

    await autocompleteTextPage.search("b");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    expect((await autocompleteTextPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await autocompleteTextPage.clearSearch();

    await autocompleteTextPage.search("C");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    expect((await autocompleteTextPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await autocompleteTextPage.clearSearch();

    await autocompleteTextPage.search("d");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    expect((await autocompleteTextPage.listItems.count()).toString()).toMatch(/^(10|[1-9])$/);
  });

  test("Validate Autocomplite search works correctly", async ({ autocompleteTextPage }) => {
    // Verify autocompletion
    await autocompleteTextPage.search("F");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    await expect(autocompleteTextPage.listItems).toHaveCount(3);
    await expect(autocompleteTextPage.listItems).toContainText([/F/, /F/, /F/]);

    await autocompleteTextPage.clearSearch();

    await autocompleteTextPage.search("french");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    await expect(autocompleteTextPage.listItems).toHaveCount(2);
    await expect(autocompleteTextPage.listItems).toContainText([/French/, /French/]);

    await autocompleteTextPage.clearSearch();

    await autocompleteTextPage.search("French d");
    await expect(autocompleteTextPage.resultList).toBeVisible();
    await expect(autocompleteTextPage.listItems).toHaveCount(1);
    await expect(autocompleteTextPage.listItems).toContainText(/French d/);

    await autocompleteTextPage.clearSearch();

    await autocompleteTextPage.search("French a");
    await expect(autocompleteTextPage.resultList).toBeHidden();
    await expect(autocompleteTextPage.listItems).toHaveCount(0);
  });

  test("Verify submitted option is working correclty", async ({ autocompleteTextPage }) => {
    // Set option and submit
    await autocompleteTextPage.selectAndSubmit("Kiwi");
    await expect(autocompleteTextPage.page).toHaveURL(/food-item=Kiwi/);

    // Set option and submit
    await autocompleteTextPage.selectAndSubmit("Cabbage");
    await expect(autocompleteTextPage.page).toHaveURL(/food-item=Cabbage/);

    // Set option and submit
    await autocompleteTextPage.selectAndSubmit("Spaghetti");
    await expect(autocompleteTextPage.page).toHaveURL(/food-item=Spaghetti/);
  });
});
