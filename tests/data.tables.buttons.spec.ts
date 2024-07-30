/* eslint-disable playwright/no-wait-for-timeout */
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Data Tables and Buttons - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify URL, sections and footer", async ({ page }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Verify url
    await expect(dataPage).toHaveURL(/Data-Table/i);

    // Verify Header Title exists
    const headerTitle = dataPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity/);

    // Verify title is visible and exists
    const title = dataPage.getByRole("heading", {
      name: "Data, Tables & Button States"
    });

    await expect(title).toBeVisible();

    // Define sections and verify QTY 3
    const dataSections = dataPage.locator(".thumbnail");
    await expect(dataSections).toHaveCount(8);

    // Verify footer text exists and is visible
    const footerText = dataPage.getByRole("paragraph").last();

    await expect(footerText).toContainText("Copyright");
    await expect(footerText).toBeVisible();
  });

  // Data Section

  test("Data Section - Verify inital state fields are empty", async ({
    page
  }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const dataTableSection = dataSections.first();

    const firstNameField = dataTableSection.getByRole("textbox").nth(0);
    const lastNameField = dataTableSection.getByRole("textbox").nth(1);
    const textField = dataTableSection.getByRole("textbox").nth(2);

    //Verify initial state
    await expect(firstNameField).toHaveValue("");
    await expect(lastNameField).toHaveValue("");
    await expect(textField).toHaveValue("      ");
  });

  test("Data Section - Verify Table 1 information is correct", async ({
    page
  }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const dataTableSection = dataSections.first();

    const table1 = dataTableSection.getByRole("table").first();

    // Verify it exists and is visible
    await expect(table1).toBeVisible();

    //  Define table elements
    const tableHeaders = table1.locator("th");
    const tableValues = table1.locator("td");

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const dataTableSection = dataSections.first();

    const table2 = dataTableSection.getByRole("table").last();

    // Verify it exists and is visible
    await expect(table2).toBeVisible();

    //  Define table elements
    const tableHeaders = table2.locator("th");
    const tableValues = table2.locator("td");

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const dataTableSection = dataSections.first();

    const firstNameField = dataTableSection.getByRole("textbox").nth(0);
    const lastNameField = dataTableSection.getByRole("textbox").nth(1);
    const textField = dataTableSection.getByRole("textbox").nth(2);

    //Define values
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const text = faker.lorem.sentence({ min: 2, max: 4 });

    // Fill values
    await firstNameField.fill(firstName);
    await lastNameField.fill(lastName);
    await textField.fill(text);

    // Verify values
    await expect(firstNameField).toHaveValue(firstName);
    await expect(lastNameField).toHaveValue(lastName);
    await expect(textField).toHaveValue(text);

    // Delete values
    await firstNameField.clear();
    await lastNameField.clear();
    await textField.clear();

    // Verify fields are empty
    await expect(firstNameField).toHaveValue("");
    await expect(lastNameField).toHaveValue("");
    await expect(textField).toHaveValue("");
  });

  // BreadCrumb

  test("BreadCrumb Section - Verify title and values", async ({ page }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const breadcrumbSection = dataSections.nth(1);

    await breadcrumbSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = breadcrumbSection.getByRole("heading", {
      name: "Breadcrumb"
    });

    const breadcrumb = breadcrumbSection.getByRole("listitem");

    const breadcrumbValues = ["Home", "About Us", "Contact Us"];

    // Verify texts
    await expect(title).toBeVisible();
    await expect(breadcrumb).toHaveText(breadcrumbValues);
  });

  test("BreadCrumb Section - Verify breadcrumb options", async ({ page }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const breadcrumbSection = dataSections.nth(1);

    await breadcrumbSection.scrollIntoViewIfNeeded();

    const breadcrumb = breadcrumbSection.getByRole("listitem");
    const home = breadcrumb.filter({ hasText: "Home" });
    const aboutUs = breadcrumb.filter({ hasText: "About Us" });
    const contactUs = breadcrumb.filter({ hasText: "Contact Us" });

    // Verify options status
    await expect(home.locator("a")).toHaveAttribute("href", "#");
    await expect(aboutUs.locator("a")).toHaveAttribute("href", "#");
    await expect(contactUs.locator("a")).not.toBeAttached();

    // Click on options and verify redirection
    await home.click();
    await expect(dataPage).toHaveURL(/Data-Table/i);

    await breadcrumbSection.scrollIntoViewIfNeeded();

    await aboutUs.click();
    await expect(dataPage).toHaveURL(/Data-Table/i);
  });

  // Badges

  test("Badges Section - Verify title and values", async ({ page }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const badgeSection = dataSections.nth(2);

    await badgeSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = badgeSection.getByRole("heading", {
      name: "Badges"
    });

    const menu = badgeSection.getByRole("listitem");

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const paginationSection = dataSections.nth(3);

    await paginationSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = paginationSection.getByRole("heading", {
      name: "Pagination"
    });

    const menu = paginationSection.getByRole("listitem").locator("a");

    const expectedOptions = [/«/, "1", "2", "3", "4", "5", /»/];

    // Verify title exists
    await expect(title).toBeVisible();

    // Verify pagination optiones
    await expect(menu).toHaveText(expectedOptions);
  });

  test("Pagination Section - Verify pagination works correctly", async ({
    page
  }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const paginationSection = dataSections.nth(3);

    await paginationSection.scrollIntoViewIfNeeded();

    // Define function to reduce code lines to verify pagination
    const goToPage = async function (pageNumber: string | RegExp) {
      const menu = paginationSection.getByRole("listitem").locator("a");

      await menu.filter({ hasText: pageNumber }).click();
    };

    // Verify pagination works correclty
    await goToPage(/«/);
    await expect(dataPage).toHaveURL(/Data-Table/i);
    await paginationSection.scrollIntoViewIfNeeded();

    for (let i = 1; i < 6; i++) {
      await goToPage(i.toString());
      await expect(dataPage).toHaveURL(/Data-Table/i);
      await paginationSection.scrollIntoViewIfNeeded();
      await dataPage.waitForTimeout(500);
    }

    await goToPage(/»/);
    await expect(dataPage).toHaveURL(/Data-Table/i);
    await paginationSection.scrollIntoViewIfNeeded();
  });

  // Table

  test("Table Section - Verify title and Table Values", async ({ page }) => {
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const tableSection = dataSections.nth(4);

    await tableSection.scrollIntoViewIfNeeded();

    // Define section Items
    const title = tableSection.getByRole("heading", {
      name: "Table"
    });

    const table = tableSection
      .getByRole("table")
      .locator("th")
      .or(tableSection.locator("td"));

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const buttonsSection = dataSections.nth(5);

    await buttonsSection.scrollIntoViewIfNeeded();

    // Define section Items
    const title = buttonsSection.getByRole("heading", {
      name: "Buttons & States"
    });

    const linkBttn = buttonsSection.getByRole("button", { name: "Link" });
    const buttonBttn = buttonsSection
      .getByRole("button", { name: /Button/ })
      .first();
    const inputBttn = buttonsSection.getByRole("button", { name: "Input" });
    const submitBttn = buttonsSection.getByRole("button", { name: "Submit" });
    const resetBttn = buttonsSection.getByRole("button", { name: "Reset" });
    const dangerBttn = buttonsSection.getByRole("button", { name: "Danger" });
    const warningBttn = buttonsSection.getByRole("button", { name: "Warning" });
    const infoBttn = buttonsSection.getByRole("button", { name: "Info" });
    const alertBttn = buttonsSection.getByRole("button", { name: "Alert" });
    const button1Bttn = buttonsSection.getByRole("button", {
      name: "Button-1"
    });
    const button2Bttn = buttonsSection.getByRole("button", {
      name: "Button-2"
    });
    const button3Bttn = buttonsSection.getByRole("button", {
      name: "Button-3"
    });
    const button4Bttn = buttonsSection.getByRole("button", {
      name: "Button-4"
    });

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const buttonsSection = dataSections.nth(5);

    await buttonsSection.scrollIntoViewIfNeeded();

    // Define section Items
    const linkBttn = buttonsSection.getByRole("button", { name: "Link" });
    const buttonBttn = buttonsSection
      .getByRole("button", { name: /Button/ })
      .first();
    const inputBttn = buttonsSection.getByRole("button", { name: "Input" });
    const submitBttn = buttonsSection.getByRole("button", { name: "Submit" });
    const resetBttn = buttonsSection.getByRole("button", { name: "Reset" });
    const dangerBttn = buttonsSection.getByRole("button", { name: "Danger" });
    const warningBttn = buttonsSection.getByRole("button", {
      name: "Warning"
    });
    const infoBttn = buttonsSection.getByRole("button", { name: "Info" });
    const alertBttn = buttonsSection.getByRole("button", { name: "Alert" });

    // Verify elements exist and are visible
    await expect(linkBttn).toBeEnabled();
    await linkBttn.click();
    await expect(dataPage).toHaveURL(/index.html#/i);

    await buttonsSection.scrollIntoViewIfNeeded();

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const buttonsSection = dataSections.nth(5);

    await buttonsSection.scrollIntoViewIfNeeded();

    // Define section Items
    const dangerBttn = buttonsSection.getByRole("button", { name: "Danger" });
    const warningBttn = buttonsSection.getByRole("button", {
      name: "Warning"
    });
    const infoBttn = buttonsSection.getByRole("button", { name: "Info" });
    const alertBttn = buttonsSection.getByRole("button", { name: "Alert" });

    // Verify enabled buttons and click on them

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const buttonsSection = dataSections.nth(5);

    await buttonsSection.scrollIntoViewIfNeeded();

    // Define active buttons
    const button1Bttn = buttonsSection.getByRole("button", {
      name: "Button-1"
    });
    const button2Bttn = buttonsSection.getByRole("button", {
      name: "Button-2"
    });
    const button3Bttn = buttonsSection.getByRole("button", {
      name: "Button-3"
    });
    const button4Bttn = buttonsSection.getByRole("button", {
      name: "Button-4"
    });

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const randomTextSection = dataSections.nth(6);

    await randomTextSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = randomTextSection.getByRole("heading", {
      name: "Random Text"
    });

    const paragraph1 = randomTextSection.getByRole("paragraph").first();
    const paragraph2 = randomTextSection.getByRole("paragraph").last();

    const footerParagraph = randomTextSection.locator("footer");

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
    // Navigate to the Data, Tables and Button States page in a separate Tab
    const [dataPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DATA, TABLES & BUTTON STATES" })
        .click()
    ]);

    await dataPage.waitForLoadState();

    // Define fields section
    const dataSections = dataPage.locator(".thumbnail");
    const listSection = dataSections.nth(7);

    await listSection.scrollIntoViewIfNeeded();

    // Define section items
    const title = listSection.getByRole("heading", {
      name: "Lists"
    });

    const coffeeList = listSection.getByRole("list").first().locator("li");
    const fruitsList = listSection.getByRole("list").nth(1).locator("li");
    const jobsList = listSection.getByRole("list").nth(2).locator("li");

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
