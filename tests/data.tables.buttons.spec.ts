import { test, expect } from "./fixtures";
import { faker } from "@faker-js/faker";

test.describe("Data Tables and Buttons - Only Path", () => {
  test("Verify URL, sections and footer", async ({ dataTablesButtonsPage }) => {
    // Verify url
    await expect(dataTablesButtonsPage.page).toHaveURL(/Data-Table/i);

    // Verify Header Title exists
    await expect(dataTablesButtonsPage.headerTitle).toContainText(/WebdriverUniversity/);

    // Verify title is visible and exists
    await expect(dataTablesButtonsPage.pageTitle).toBeVisible();

    // Define sections and verify QTY = 8
    await expect(dataTablesButtonsPage.sections).toHaveCount(8);

    // Verify footer text exists and is visible
    await expect(dataTablesButtonsPage.footer).toContainText("Copyright");
    await expect(dataTablesButtonsPage.footer).toBeVisible();
  });

  // Data Section

  test("Data Section - Verify inital state fields are empty", async ({
    dataTablesButtonsPage
  }) => {
    //Verify initial state
    await expect(dataTablesButtonsPage.firstNameField).toHaveValue("");
    await expect(dataTablesButtonsPage.lastNameField).toHaveValue("");
    await expect(dataTablesButtonsPage.textAreaField).toHaveValue("      ");
  });

  test("Data Section - Verify Table 1 information is correct", async ({
    dataTablesButtonsPage
  }) => {
    // Verify it exists and is visible
    await expect(dataTablesButtonsPage.table1).toBeVisible();

    //  Define table elements
    const tableHeaders = dataTablesButtonsPage.table1.locator("th");
    const tableValues = dataTablesButtonsPage.table1.locator("td");

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
    dataTablesButtonsPage
  }) => {
    // Verify it exists and is visible
    await expect(dataTablesButtonsPage.table2).toBeVisible();

    //  Define table elements
    const tableHeaders = dataTablesButtonsPage.table2.locator("th");
    const tableValues = dataTablesButtonsPage.table2.locator("td");

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

  test("Data Section - Verify input values work correcly", async ({ dataTablesButtonsPage }) => {
    //Define values
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const text = faker.lorem.sentence({ min: 2, max: 4 });

    // Fill values
    await dataTablesButtonsPage.firstNameField.fill(firstName);
    await dataTablesButtonsPage.lastNameField.fill(lastName);
    await dataTablesButtonsPage.textAreaField.fill(text);

    // Verify values
    await expect(dataTablesButtonsPage.firstNameField).toHaveValue(firstName);
    await expect(dataTablesButtonsPage.lastNameField).toHaveValue(lastName);
    await expect(dataTablesButtonsPage.textAreaField).toHaveValue(text);

    // Delete values
    await dataTablesButtonsPage.firstNameField.clear();
    await dataTablesButtonsPage.lastNameField.clear();
    await dataTablesButtonsPage.textAreaField.clear();

    // Verify fields are empty
    await expect(dataTablesButtonsPage.firstNameField).toHaveValue("");
    await expect(dataTablesButtonsPage.lastNameField).toHaveValue("");
    await expect(dataTablesButtonsPage.textAreaField).toHaveValue("");
  });

  // BreadCrumb

  test("BreadCrumb Section - Verify title and values", async ({ dataTablesButtonsPage }) => {
    await dataTablesButtonsPage.breadcrumbSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataTablesButtonsPage.breadcrumbSection.getByRole("heading", {
      name: "Breadcrumb"
    });

    const breadcrumbValues = ["Home", "About Us", "Contact Us"];

    // Verify texts
    await expect(title).toBeVisible();
    await expect(dataTablesButtonsPage.breadcrumbItems).toHaveText(breadcrumbValues);
  });

  test("BreadCrumb Section - Verify breadcrumb options", async ({ dataTablesButtonsPage }) => {
    await dataTablesButtonsPage.breadcrumbSection.scrollIntoViewIfNeeded();

    const home = dataTablesButtonsPage.breadcrumbItems.filter({ hasText: "Home" });
    const aboutUs = dataTablesButtonsPage.breadcrumbItems.filter({ hasText: "About Us" });
    const contactUs = dataTablesButtonsPage.breadcrumbItems.filter({ hasText: "Contact Us" });

    // Verify options status
    await expect(home.locator("a")).toHaveAttribute("href", "#");
    await expect(aboutUs.locator("a")).toHaveAttribute("href", "#");
    await expect(contactUs.locator("a")).not.toBeAttached();

    // Click on options and verify redirection
    await home.click();
    await expect(dataTablesButtonsPage.page).toHaveURL(/Data-Table/i);

    await dataTablesButtonsPage.breadcrumbSection.scrollIntoViewIfNeeded();

    await aboutUs.click();
    await expect(dataTablesButtonsPage.page).toHaveURL(/Data-Table/i);
  });

  // Badges

  test("Badges Section - Verify title and values", async ({ dataTablesButtonsPage }) => {
    await dataTablesButtonsPage.badgeSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataTablesButtonsPage.badgeSection.getByRole("heading", {
      name: "Badges"
    });

    const menu = dataTablesButtonsPage.badgeMenuItems;

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

  test("Pagination Section - Verify title and values", async ({ dataTablesButtonsPage }) => {
    await dataTablesButtonsPage.paginationSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataTablesButtonsPage.paginationSection.getByRole("heading", {
      name: "Pagination"
    });

    const expectedOptions = [/«/, "1", "2", "3", "4", "5", /»/];

    // Verify title exists
    await expect(title).toBeVisible();

    // Verify pagination options
    await expect(dataTablesButtonsPage.paginationListItems).toHaveText(expectedOptions);
  });

  test("Pagination Section - Verify pagination works correctly", async ({
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.paginationSection.scrollIntoViewIfNeeded();

    // Verify pagination works correctly
    await dataTablesButtonsPage.clickPaginationPage(/«/);
    await expect(dataTablesButtonsPage.page).toHaveURL(/Data-Table/i);
    await dataTablesButtonsPage.paginationSection.scrollIntoViewIfNeeded();

    for (let i = 1; i < 6; i++) {
      await dataTablesButtonsPage.clickPaginationPage(i.toString());
      // Bug 3 fix: replaced waitForTimeout(500) with deterministic waitForLoadState
      await dataTablesButtonsPage.page.waitForLoadState("domcontentloaded");
      await expect(dataTablesButtonsPage.page).toHaveURL(/Data-Table/i);
      await dataTablesButtonsPage.paginationSection.scrollIntoViewIfNeeded();
    }

    await dataTablesButtonsPage.clickPaginationPage(/»/);
    await expect(dataTablesButtonsPage.page).toHaveURL(/Data-Table/i);
    await dataTablesButtonsPage.paginationSection.scrollIntoViewIfNeeded();
  });

  // Table

  test("Table Section - Verify title and Table Values", async ({ dataTablesButtonsPage }) => {
    await dataTablesButtonsPage.tableSection.scrollIntoViewIfNeeded();

    // Define section Items
    const title = dataTablesButtonsPage.tableSection.getByRole("heading", {
      name: "Table"
    });

    const table = dataTablesButtonsPage.tableSection
      .getByRole("table")
      .locator("th")
      .or(dataTablesButtonsPage.tableSection.locator("td"));

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
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.buttonStatesSection.scrollIntoViewIfNeeded();

    // Define section Items
    const title = dataTablesButtonsPage.buttonStatesSection.getByRole("heading", {
      name: "Buttons & States"
    });

    const linkBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Link" });
    const buttonBttn = dataTablesButtonsPage.buttonStatesSection
      .getByRole("button", { name: /Button/ })
      .first();
    const inputBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Input" });
    const submitBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Submit" });
    const resetBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Reset" });
    const dangerBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Danger" });
    const warningBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Warning" });
    const infoBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Info" });
    const alertBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Alert" });
    const button1Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-1" });
    const button2Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-2" });
    const button3Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-3" });
    const button4Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-4" });

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
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.buttonStatesSection.scrollIntoViewIfNeeded();

    const linkBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Link" });
    const buttonBttn = dataTablesButtonsPage.buttonStatesSection
      .getByRole("button", { name: /Button/ })
      .first();
    const inputBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Input" });
    const submitBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Submit" });
    const resetBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Reset" });
    const dangerBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Danger" });
    const warningBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Warning" });
    const infoBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Info" });
    const alertBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Alert" });

    await expect(linkBttn).toBeEnabled();
    await linkBttn.click();
    await expect(dataTablesButtonsPage.page).toHaveURL(/index.html#/i);

    await dataTablesButtonsPage.buttonStatesSection.scrollIntoViewIfNeeded();

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
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.buttonStatesSection.scrollIntoViewIfNeeded();

    const dangerBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Danger" });
    const warningBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Warning" });
    const infoBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Info" });
    const alertBttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Alert" });

    await expect(dangerBttn).not.toHaveClass(/disabled/);
    await dangerBttn.click();

    await expect(warningBttn).toHaveClass(/disabled/);

    await expect(infoBttn).not.toHaveClass(/disabled/);
    await infoBttn.click();

    await expect(alertBttn).not.toHaveClass(/disabled/);
    await alertBttn.click();
  });

  test("Button & States Section - Verify active buttons click interactions work correctly", async ({
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.buttonStatesSection.scrollIntoViewIfNeeded();

    const button1Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-1" });
    const button2Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-2" });
    const button3Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-3" });
    const button4Bttn = dataTablesButtonsPage.buttonStatesSection.getByRole("button", { name: "Button-4" });

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
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.randomTextSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataTablesButtonsPage.randomTextSection.getByRole("heading", {
      name: "Random Text"
    });

    const paragraph1 = dataTablesButtonsPage.randomTextSection.getByRole("paragraph").first();
    const paragraph2 = dataTablesButtonsPage.randomTextSection.getByRole("paragraph").last();

    const footerParagraph = dataTablesButtonsPage.randomTextSection.locator("footer");

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
    dataTablesButtonsPage
  }) => {
    await dataTablesButtonsPage.listSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = dataTablesButtonsPage.listSection.getByRole("heading", {
      name: "Lists"
    });

    const coffeeList = dataTablesButtonsPage.listSection.getByRole("list").first().locator("li");
    const fruitsList = dataTablesButtonsPage.listSection.getByRole("list").nth(1).locator("li");
    const jobsList = dataTablesButtonsPage.listSection.getByRole("list").nth(2).locator("li");

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
