import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";

test.describe("Data Tables and Buttons - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify URL, sections and footer", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    // Verify url
    await expect(dataPage.page).toHaveURL(/Data-Table/i);

    // Verify Header Title exists
    await expect(dataPage.headerTitle).toContainText(/WebdriverUniversity/);

    // Verify title is visible and exists
    await expect(dataPage.pageTitle).toBeVisible();

    // Define sections and verify QTY = 8
    await expect(dataPage.sections).toHaveCount(8);

    // Verify footer text exists and is visible
    await expect(dataPage.footer).toContainText("Copyright");
    await expect(dataPage.footer).toBeVisible();
  });

  // Data Section

  test("Data Section - Verify inital state fields are empty", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    //Verify initial state
    await expect(dataPage.firstNameField).toHaveValue("");
    await expect(dataPage.lastNameField).toHaveValue("");
    await expect(dataPage.textAreaField).toHaveValue("      ");
  });

  test("Data Section - Verify Table 1 information is correct", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    // Verify it exists and is visible
    await expect(dataPage.table1).toBeVisible();

    //  Define table elements
    const tableHeaders = dataPage.table1.locator("th");
    const tableValues = dataPage.table1.locator("td");

    // Define expected values
    const headers = ["Firstname", "Lastname", "Age"];
    const values = [
      "John",
      "Smith",
      "45",
      "Jemma",
      "Jackson",
      "94",
      "Michael",
      "Doe",
      "20"
    ];

    //Verify table count and values
    await expect(tableHeaders).toHaveCount(3);
    await expect(tableHeaders).toHaveText(headers);

    await expect(tableValues).toHaveCount(9);
    await expect(tableValues).toHaveText(values);
  });

  test("Data Section - Verify Table 2 information is correct", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    // Verify it exists and is visible
    await expect(dataPage.table2).toBeVisible();

    //  Define table elements
    const tableHeaders = dataPage.table2.locator("th");
    const tableValues = dataPage.table2.locator("td");

    // Define expected values
    const headers = ["Firstname", "Lastname", "Age"];
    const values = [
      "Jason",
      "Jones",
      "27",
      "Sarah",
      "Jackson",
      "56",
      "Bob",
      "Woods",
      "80"
    ];

    //Verify table count and values
    await expect(tableHeaders).toHaveCount(3);
    await expect(tableHeaders).toHaveText(headers);

    await expect(tableValues).toHaveCount(9);
    await expect(tableValues).toHaveText(values);
  });

  test("Data Section - Verify input values work correcly", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    //Define values
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const text = faker.lorem.sentence({ min: 2, max: 4 });

    // Fill values
    await dataPage.firstNameField.fill(firstName);
    await dataPage.lastNameField.fill(lastName);
    await dataPage.textAreaField.fill(text);

    // Verify values
    await expect(dataPage.firstNameField).toHaveValue(firstName);
    await expect(dataPage.lastNameField).toHaveValue(lastName);
    await expect(dataPage.textAreaField).toHaveValue(text);

    // Delete values
    await dataPage.firstNameField.clear();
    await dataPage.lastNameField.clear();
    await dataPage.textAreaField.clear();

    // Verify fields are empty
    await expect(dataPage.firstNameField).toHaveValue("");
    await expect(dataPage.lastNameField).toHaveValue("");
    await expect(dataPage.textAreaField).toHaveValue("");
  });

  // BreadCrumb

  test("BreadCrumb Section - Verify title and values", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.breadcrumbSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataPage.breadcrumbSection.getByRole("heading", {
      name: "Breadcrumb"
    });

    const breadcrumbValues = ["Home", "About Us", "Contact Us"];

    // Verify texts
    await expect(title).toBeVisible();
    await expect(dataPage.breadcrumbItems).toHaveText(breadcrumbValues);
  });

  test("BreadCrumb Section - Verify breadcrumb options", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.breadcrumbSection.scrollIntoViewIfNeeded();

    const home = dataPage.breadcrumbItems.filter({ hasText: "Home" });
    const aboutUs = dataPage.breadcrumbItems.filter({ hasText: "About Us" });
    const contactUs = dataPage.breadcrumbItems.filter({ hasText: "Contact Us" });

    // Verify options status
    await expect(home.locator("a")).toHaveAttribute("href", "#");
    await expect(aboutUs.locator("a")).toHaveAttribute("href", "#");
    await expect(contactUs.locator("a")).not.toBeAttached();

    // Click on options and verify redirection
    await home.click();
    await expect(dataPage.page).toHaveURL(/Data-Table/i);

    await dataPage.breadcrumbSection.scrollIntoViewIfNeeded();

    await aboutUs.click();
    await expect(dataPage.page).toHaveURL(/Data-Table/i);
  });

  // Badges

  test("Badges Section - Verify title and values", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.badgeSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataPage.badgeSection.getByRole("heading", {
      name: "Badges"
    });

    const menu = dataPage.badgeMenuItems;

    const deals = menu.filter({ hasText: "Today's Deals" });
    const allProducts = menu.filter({ hasText: "All Products" });

    // Verify section and option items exist
    await expect(title).toBeVisible();
    await expect(deals).toBeVisible();
    await expect(allProducts).toBeVisible();

    // Verify items values
    await expect(deals).toContainText("5");
    await expect(allProducts).toContainText("20");
  });

  //Pagination

  test("Pagination Section - Verify title and values", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.paginationSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataPage.paginationSection.getByRole("heading", {
      name: "Pagination"
    });

    const expectedOptions = [/«/, "1", "2", "3", "4", "5", /»/];

    // Verify title exists
    await expect(title).toBeVisible();

    // Verify pagination options
    await expect(dataPage.paginationListItems).toHaveText(expectedOptions);
  });

  test("Pagination Section - Verify pagination works correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.paginationSection.scrollIntoViewIfNeeded();

    // Verify pagination works correctly
    await dataPage.clickPaginationPage(/«/);
    await expect(dataPage.page).toHaveURL(/Data-Table/i);
    await dataPage.paginationSection.scrollIntoViewIfNeeded();

    for (let i = 1; i < 6; i++) {
      await dataPage.clickPaginationPage(i.toString());
      // Bug 3 fix: replaced waitForTimeout(500) with deterministic waitForLoadState
      await dataPage.page.waitForLoadState("domcontentloaded");
      await expect(dataPage.page).toHaveURL(/Data-Table/i);
      await dataPage.paginationSection.scrollIntoViewIfNeeded();
    }

    await dataPage.clickPaginationPage(/»/);
    await expect(dataPage.page).toHaveURL(/Data-Table/i);
    await dataPage.paginationSection.scrollIntoViewIfNeeded();
  });

  // Table

  test("Table Section - Verify title and Table Values", async ({ page }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.tableSection.scrollIntoViewIfNeeded();

    // Define section Items
    const title = dataPage.tableSection.getByRole("heading", {
      name: "Table"
    });

    const table = dataPage.tableSection
      .getByRole("table")
      .locator("th")
      .or(dataPage.tableSection.locator("td"));

    const tableValues = [
      "#",
      "First",
      "Last",
      "1",
      "Andy",
      "Otto",
      "2",
      "Jacob",
      "Jones",
      "3",
      "Larry",
      "Scott"
    ];

    // Verify title exists and table values are correct
    await expect(title).toBeVisible();
    await expect(table).toHaveText(tableValues);
  });

  // Button & States

  test("Button & States Section - Verify title and section Values", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.buttonStatesSection.scrollIntoViewIfNeeded();

    // Define section Items
    const title = dataPage.buttonStatesSection.getByRole("heading", {
      name: "Buttons & States"
    });

    const linkBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Link" });
    const buttonBttn = dataPage.buttonStatesSection
      .getByRole("button", { name: /Button/ })
      .first();
    const inputBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Input" });
    const submitBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Submit" });
    const resetBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Reset" });
    const dangerBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Danger" });
    const warningBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Warning" });
    const infoBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Info" });
    const alertBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Alert" });
    const button1Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-1" });
    const button2Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-2" });
    const button3Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-3" });
    const button4Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-4" });

    // Verify elements exist and are visible
    await expect(title).toBeVisible();

    await expect(linkBttn).toBeVisible();
    await expect(buttonBttn).toBeVisible();
    await expect(inputBttn).toBeVisible();
    await expect(submitBttn).toBeVisible();
    await expect(resetBttn).toBeVisible();
    await expect(dangerBttn).toBeVisible();
    await expect(warningBttn).toBeVisible();
    await expect(infoBttn).toBeVisible();
    await expect(alertBttn).toBeVisible();
    await expect(button1Bttn).toBeVisible();
    await expect(button2Bttn).toBeVisible();
    await expect(button3Bttn).toBeVisible();
    await expect(button4Bttn).toBeVisible();
  });

  test("Button & States Section - Verify normal buttons click interactions work correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.buttonStatesSection.scrollIntoViewIfNeeded();

    const linkBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Link" });
    const buttonBttn = dataPage.buttonStatesSection
      .getByRole("button", { name: /Button/ })
      .first();
    const inputBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Input" });
    const submitBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Submit" });
    const resetBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Reset" });
    const dangerBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Danger" });
    const warningBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Warning" });
    const infoBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Info" });
    const alertBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Alert" });

    await expect(linkBttn).toBeEnabled();
    await linkBttn.click();
    await expect(dataPage.page).toHaveURL(/index.html#/i);

    await dataPage.buttonStatesSection.scrollIntoViewIfNeeded();

    await expect(buttonBttn).toBeEnabled();
    await buttonBttn.click();

    await expect(inputBttn).toBeEnabled();
    await submitBttn.click();

    await expect(submitBttn).toBeEnabled();
    await submitBttn.click();

    await expect(resetBttn).toBeEnabled();
    await resetBttn.click();

    await expect(dangerBttn).toBeEnabled();
    await dangerBttn.click();

    await expect(warningBttn).toHaveClass(/disabled/);

    await expect(infoBttn).toBeEnabled();
    await infoBttn.click();

    await expect(alertBttn).toBeEnabled();
    await alertBttn.click();
  });

  test("Button & States Section - Verify enabled buttons click interactions work correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.buttonStatesSection.scrollIntoViewIfNeeded();

    const dangerBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Danger" });
    const warningBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Warning" });
    const infoBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Info" });
    const alertBttn = dataPage.buttonStatesSection.getByRole("button", { name: "Alert" });

    await expect(dangerBttn).not.toHaveClass(/disabled/);
    await dangerBttn.click();

    await expect(warningBttn).toHaveClass(/disabled/);

    await expect(infoBttn).not.toHaveClass(/disabled/);
    await infoBttn.click();

    await expect(alertBttn).not.toHaveClass(/disabled/);
    await alertBttn.click();
  });

  test("Button & States Section - Verify active buttons click interactions work correctly", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.buttonStatesSection.scrollIntoViewIfNeeded();

    const button1Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-1" });
    const button2Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-2" });
    const button3Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-3" });
    const button4Bttn = dataPage.buttonStatesSection.getByRole("button", { name: "Button-4" });

    // Verify initial state
    await expect(button1Bttn).toHaveClass(/active/);
    await expect(button1Bttn).not.toHaveClass(/focus/);
    await expect(button2Bttn).not.toHaveClass(/focus/);
    await expect(button3Bttn).not.toHaveClass(/focus/);
    await expect(button4Bttn).not.toHaveClass(/focus/);

    // Click buttons and should be active
    await button2Bttn.click();

    await expect(button1Bttn).toHaveClass(/active/);
    await expect(button1Bttn).not.toHaveClass(/focus/);
    await expect(button2Bttn).toHaveClass(/focus/);
    await expect(button3Bttn).not.toHaveClass(/focus/);
    await expect(button4Bttn).not.toHaveClass(/focus/);

    await button3Bttn.click();

    await expect(button1Bttn).toHaveClass(/active/);
    await expect(button1Bttn).not.toHaveClass(/focus/);
    await expect(button2Bttn).not.toHaveClass(/focus/);
    await expect(button3Bttn).toHaveClass(/focus/);
    await expect(button4Bttn).not.toHaveClass(/focus/);

    await button4Bttn.click();

    await expect(button1Bttn).toHaveClass(/active/);
    await expect(button1Bttn).not.toHaveClass(/focus/);
    await expect(button2Bttn).not.toHaveClass(/focus/);
    await expect(button3Bttn).not.toHaveClass(/focus/);
    await expect(button4Bttn).toHaveClass(/focus/);

    await button1Bttn.click();

    await expect(button1Bttn).toHaveClass(/active/);
    await expect(button1Bttn).toHaveClass(/focus/);
    await expect(button2Bttn).not.toHaveClass(/focus/);
    await expect(button3Bttn).not.toHaveClass(/focus/);
    await expect(button4Bttn).not.toHaveClass(/focus/);
  });

  // Random Text

  test("Random Text Section - Verify title and texts are correct", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.randomTextSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataPage.randomTextSection.getByRole("heading", {
      name: "Random Text"
    });

    const paragraph1 = dataPage.randomTextSection.getByRole("paragraph").first();
    const paragraph2 = dataPage.randomTextSection.getByRole("paragraph").last();

    const footerParagraph = dataPage.randomTextSection.locator("footer");

    // Verify texts and classes
    await expect(title).toBeVisible();

    await expect(paragraph1).toContainText(
      "sed do eiusmod tempor incididunt ut labore"
    );
    await expect(paragraph1.locator("mark")).toHaveClass("traversal-mark");

    await expect(paragraph2).toHaveText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    );

    await expect(footerParagraph).toHaveText(
      "Platea dictumst quisque sagittis purus sit amet volutpat consequat."
    );
    await expect(footerParagraph.locator("cite")).toHaveClass("traversal-cite");
  });

  // Lists

  test("List Section - Verify section title and list values", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const dataPage = await homePage.openDataTables();

    await dataPage.listSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataPage.listSection.getByRole("heading", {
      name: "Lists"
    });

    const coffeeList = dataPage.listSection.getByRole("list").first().locator("li");
    const fruitsList = dataPage.listSection.getByRole("list").nth(1).locator("li");
    const jobsList = dataPage.listSection.getByRole("list").nth(2).locator("li");

    const expectedCoffeeList = ["Coffee", "Tea", "Milk", "Espresso", "Sugar"];
    const expectedFruitsList = [
      "Fruits",
      "Apple",
      "Banana",
      "Blackberries",
      "Cherries",
      "Figs",
      "Vegetables",
      "Asparagus",
      "Broccoli",
      "Kidney beans",
      "Lentils"
    ];

    const expectedJobsList = [
      "Types of Jobs",
      "Finance",
      "Technology",
      "Sales"
    ];

    // Verify title and lists QTY
    await expect(title).toBeVisible();

    await expect(coffeeList).toHaveCount(5);
    await expect(fruitsList).toHaveCount(11);
    await expect(jobsList).toHaveCount(4);

    // Verify List values
    await expect(coffeeList).toHaveText(expectedCoffeeList);
    await expect(fruitsList).toHaveText(expectedFruitsList);
    await expect(jobsList).toHaveText(expectedJobsList);

    // Verify titles
    await expect(fruitsList.first()).toHaveClass("list-header");
    await expect(fruitsList.nth(6)).toHaveClass("list-header");
  });
});
