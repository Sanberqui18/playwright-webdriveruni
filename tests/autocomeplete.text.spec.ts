import { test, expect } from "@playwright/test";

test.describe("Autocomoplete Text - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify title and section elements", async ({ page }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [autocompletepage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /AUTOCOMPLETE TEXTFIELD/ })
        .click()
    ]);

    await autocompletepage.waitForLoadState();

    // Verify navigation
    await expect(autocompletepage).toHaveURL(
      "Autocomplete-TextField/autocomplete-textfield.html"
    );

    // Define section items
    const title = autocompletepage.getByRole("heading", {
      name: "Autocomplete TextField"
    });

    const footer = autocompletepage.getByRole("paragraph").last();

    const searchfield = autocompletepage.getByRole("textbox");
    const submitBttn = autocompletepage.getByRole("button", { name: "Submit" });

    // Verify items are visible
    await expect(title).toBeVisible();
    await expect(searchfield).toBeVisible();
    await expect(searchfield).toHaveAttribute("placeholder", "Food Item");
    await expect(submitBttn).toBeVisible();
    await expect(footer).toBeVisible();

    // Verify list search is initially hidden
    const resultList = autocompletepage.locator("#myInputautocomplete-list");
    const listItems = resultList.locator("div");

    await expect(resultList).toBeHidden();
    await expect(listItems).toHaveCount(0);

    // Take a snapshot to verify image and components location
    await expect(autocompletepage).toHaveScreenshot({
      fullPage: true
    });
  });

  test("Select an option should display a list of elements", async ({
    page
  }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [autocompletepage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /AUTOCOMPLETE TEXTFIELD/ })
        .click()
    ]);

    await autocompletepage.waitForLoadState();

    // Define section elements
    const searchfield = autocompletepage.getByRole("textbox");
    const resultList = autocompletepage.locator("#myInputautocomplete-list");
    const listItems = resultList.locator("div");

    // Verify autocompletion shows a list between 1 - 5 elements
    await searchfield.fill("A");
    await expect(resultList).toBeVisible();
    expect((await listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await searchfield.clear();

    await searchfield.fill("b");
    await expect(resultList).toBeVisible();
    expect((await listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await searchfield.clear();

    await searchfield.fill("C");
    await expect(resultList).toBeVisible();
    expect((await listItems.count()).toString()).toMatch(/^(10|[1-9])$/);

    await searchfield.clear();

    await searchfield.fill("d");
    await expect(resultList).toBeVisible();
    expect((await listItems.count()).toString()).toMatch(/^(10|[1-9])$/);
  });

  test("Validate Autocomplite search works correctly", async ({ page }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [autocompletepage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /AUTOCOMPLETE TEXTFIELD/ })
        .click()
    ]);

    await autocompletepage.waitForLoadState();

    // Define section elements
    const searchfield = autocompletepage.getByRole("textbox");
    const resultList = autocompletepage.locator("#myInputautocomplete-list");
    const listItems = resultList.locator("div");

    // Verify autocompletion
    await searchfield.fill("F");
    await expect(resultList).toBeVisible();
    await expect(listItems).toHaveCount(3);
    await expect(listItems).toContainText([/F/, /F/, /F/]);

    await searchfield.clear();

    await searchfield.fill("french");
    await expect(resultList).toBeVisible();
    await expect(listItems).toHaveCount(2);
    await expect(listItems).toContainText([/French/, /French/]);

    await searchfield.clear();

    await searchfield.fill("French d");
    await expect(resultList).toBeVisible();
    await expect(listItems).toHaveCount(1);
    await expect(listItems).toContainText(/French d/);

    await searchfield.clear();

    await searchfield.fill("French a");
    await expect(resultList).toBeHidden();
    await expect(listItems).toHaveCount(0);
  });

  test("Verify submitted option is working correclty", async ({ page }) => {
    // Navigate to the Autocomplete Text page in a separate Tab
    const [autocompletepage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /AUTOCOMPLETE TEXTFIELD/ })
        .click()
    ]);

    await autocompletepage.waitForLoadState();

    // Define section elements
    const searchfield = autocompletepage.getByRole("textbox");
    const resultList = autocompletepage.locator("#myInputautocomplete-list");
    const listItems = resultList.locator("div");
    const submitBttn = autocompletepage.getByRole("button", { name: "Submit" });

    // Set option
    await searchfield.fill("Kiwi");
    await expect(listItems).toHaveCount(1);
    await listItems.click();

    // Submit
    await submitBttn.click();

    await expect(autocompletepage).toHaveURL(/food-item=Kiwi/);

    // Set option
    await searchfield.fill("Cabbage");
    await expect(listItems).toHaveCount(1);
    await listItems.click();

    // Submit
    await submitBttn.click();

    await expect(autocompletepage).toHaveURL(/food-item=Cabbage/);

    // Set option
    await searchfield.fill("Spaghetti");
    await expect(listItems).toHaveCount(1);
    await listItems.click();

    // Submit
    await submitBttn.click();

    await expect(autocompletepage).toHaveURL(/food-item=Spaghetti/);
  });
});
