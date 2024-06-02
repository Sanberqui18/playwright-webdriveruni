import { test, expect } from "@playwright/test";

test.describe("Dropdown, Checkboxes & Radio Buttons - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Page Header, Title, sections and footer", async ({ page }) => {
    // Navigate to the Buttons page in a separate Tab
    const [bttnsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)" })
        .click()
    ]);

    await bttnsPage.waitForLoadState();

    // Verify Header Title exists
    const headerTitle = bttnsPage.locator("#nav-title");
    await expect(headerTitle).toContainText(/WebdriverUniversity.com/);

    // Verify title
    const title = bttnsPage.locator("#main-header");

    await expect(title).toContainText(
      "Dropdown Menu(s), Checkboxe(s) & Radio Button(s)"
    );
    await expect(title).toBeVisible();

    // Verify section QTY = 4 and titles
    const sections = bttnsPage.locator(".thumbnail");
    await expect(sections).toHaveCount(4);

    const sectionTitles = [
      "Dropdown Menu(s)",
      "Checkboxe(s)",
      "Radio Button(s)",
      "Selected & Disabled"
    ];

    for (const titleValue of sectionTitles) {
      const sectionTitle = sections.getByRole("heading");
      await expect(
        sectionTitle.nth(sectionTitles.indexOf(titleValue))
      ).toHaveText(titleValue);
    }

    const footerText = bttnsPage.getByRole("paragraph").last();

    await expect(footerText).toContainText("Copyright");
    await expect(footerText).toBeVisible();
  });

  test("Dropdown Manu(s) values are correct and work correclty", async ({
    page
  }) => {
    // Navigate to the Buttons page in a separate Tab
    const [bttnsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)" })
        .click()
    ]);

    await bttnsPage.waitForLoadState();

    // Define dropdown section
    const dropdownSection = bttnsPage
      .locator(".thumbnail")
      .filter({ hasText: "Dropdown" });

    // Validate dropdown QT3 = 3
    const dropdowns = dropdownSection.getByRole("combobox");
    await expect(dropdowns).toHaveCount(3);

    // Define test dropdowns and their data
    const dropdown1 = dropdowns.nth(0);
    const dropdown2 = dropdowns.nth(1);
    const dropdown3 = dropdowns.nth(2);

    const values1 = ["JAVA", "C#", "Python", "SQL"];
    const values2 = ["Eclipse", "Maven", "TestNG", "JUnit"];
    const values3 = ["HTML", "CSS", "JavaScript", "JQuery"];

    // Verify dropdown values (Alternative way shown in last test)
    const dropdown1Values = await dropdown1.allTextContents().then((values) => {
      const combinedValues = values.join("\n");

      const fixedArray = combinedValues
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      return fixedArray;
    });

    const dropdown2Values = await dropdown2.allTextContents().then((values) => {
      const combinedValues = values.join("\n");

      const fixedArray = combinedValues
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      return fixedArray;
    });

    const dropdown3Values = await dropdown3.allTextContents().then((values) => {
      const combinedValues = values.join("\n");

      const fixedArray = combinedValues
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      return fixedArray;
    });

    expect(dropdown1Values).toEqual(values1);
    expect(dropdown2Values).toEqual(values2);
    expect(dropdown3Values).toEqual(values3);

    // Verify default selected values
    await expect(dropdown1).toHaveValue(/JAVA/i);
    await expect(dropdown2).toHaveValue(/Eclipse/i);
    await expect(dropdown3).toHaveValue(/HTML/i);

    // Select Options and verify they are selected
    await dropdown1.selectOption("C#");
    await expect(dropdown1).toHaveValue(/C#/i);
    await dropdown1.selectOption("Python");
    await expect(dropdown1).toHaveValue(/Python/i);
    await dropdown1.selectOption("SQL");
    await expect(dropdown1).toHaveValue(/SQL/i);

    await dropdown2.selectOption("Maven");
    await expect(dropdown2).toHaveValue(/Maven/i);
    await dropdown2.selectOption("TestNG");
    await expect(dropdown2).toHaveValue(/TestNG/i);
    await dropdown2.selectOption("JUnit");
    await expect(dropdown2).toHaveValue(/JUnit/i);

    await dropdown3.selectOption("CSS");
    await expect(dropdown3).toHaveValue(/CSS/i);
    await dropdown3.selectOption("JavaScript");
    await expect(dropdown3).toHaveValue(/JavaScript/i);
    await dropdown3.selectOption("JQuery");
    await expect(dropdown3).toHaveValue(/JQuery/i);

    // Select initial values and verify they are selected
    await dropdown1.selectOption("JAVA");
    await expect(dropdown1).toHaveValue(/JAVA/i);

    await dropdown2.selectOption("Eclipse");
    await expect(dropdown2).toHaveValue(/Eclipse/i);

    await dropdown3.selectOption("HTML");
    await expect(dropdown3).toHaveValue(/HTML/i);
  });

  test("Checkboxe(s)values are correct and work correclty", async ({
    page
  }) => {
    // Navigate to the Buttons page in a separate Tab
    const [bttnsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)" })
        .click()
    ]);

    await bttnsPage.waitForLoadState();

    // Define checkboxes section
    const checkboxesSection = bttnsPage
      .locator(".thumbnail")
      .filter({ hasText: "Checkboxe(s)" });

    // Validate dropdown QT3 = 4
    const checkboxes = checkboxesSection.getByRole("checkbox");
    await expect(checkboxes).toHaveCount(4);

    // Define test checkboxes and verifiy their data
    const checkbox1 = checkboxes.nth(0);
    const checkbox2 = checkboxes.nth(1);
    const checkbox3 = checkboxes.nth(2);
    const checkbox4 = checkboxes.nth(3);

    await expect(checkbox1).toHaveValue(/Option-1/i);
    await expect(checkbox2).toHaveValue(/Option-2/i);
    await expect(checkbox3).toHaveValue(/Option-3/i);
    await expect(checkbox4).toHaveValue(/Option-4/i);

    // Verify initial state
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).toBeChecked();
    await expect(checkbox4).not.toBeChecked();

    // Check all values and verify they are checked
    await checkbox1.check();
    await checkbox2.check();
    await checkbox4.check();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
    await expect(checkbox3).toBeChecked();
    await expect(checkbox4).toBeChecked();

    // Uncheck all values and verify they are unchecked
    await checkbox1.uncheck();
    await checkbox2.uncheck();
    await checkbox3.uncheck();
    await checkbox4.uncheck();

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).not.toBeChecked();
    await expect(checkbox4).not.toBeChecked();
  });

  test("Radio Button(s) are correct and work correclty", async ({ page }) => {
    // Navigate to the Buttons page in a separate Tab
    const [bttnsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)" })
        .click()
    ]);

    await bttnsPage.waitForLoadState();

    // Define checkboxes section
    const checkboxesSection = bttnsPage
      .locator(".thumbnail")
      .filter({ hasText: "Radio Button(s)" });

    // Validate checkboxes QT3 = 5
    const radioButtons = checkboxesSection.getByRole("radio");
    await expect(radioButtons).toHaveCount(5);

    // Define test checkboxes and verify their data
    const radioButton1 = radioButtons.nth(0);
    const radioButton2 = radioButtons.nth(1);
    const radioButton3 = radioButtons.nth(2);
    const radioButton4 = radioButtons.nth(3);
    const radioButton5 = radioButtons.nth(4);

    await expect(radioButton1).toHaveValue("green");
    await expect(radioButton2).toHaveValue("blue");
    await expect(radioButton3).toHaveValue("yellow");
    await expect(radioButton4).toHaveValue("orange");
    await expect(radioButton5).toHaveValue("purple");

    // Verify initial state
    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).not.toBeChecked();
    await expect(radioButton3).not.toBeChecked();
    await expect(radioButton4).not.toBeChecked();
    await expect(radioButton5).not.toBeChecked();

    // Verify Radio buttons functionality
    await radioButton1.check();

    await expect(radioButton1).toBeChecked();
    await expect(radioButton2).not.toBeChecked();
    await expect(radioButton3).not.toBeChecked();
    await expect(radioButton4).not.toBeChecked();
    await expect(radioButton5).not.toBeChecked();

    await radioButton2.check();

    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).toBeChecked();
    await expect(radioButton3).not.toBeChecked();
    await expect(radioButton4).not.toBeChecked();
    await expect(radioButton5).not.toBeChecked();

    await radioButton3.check();

    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).not.toBeChecked();
    await expect(radioButton3).toBeChecked();
    await expect(radioButton4).not.toBeChecked();
    await expect(radioButton5).not.toBeChecked();

    await radioButton4.check();

    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).not.toBeChecked();
    await expect(radioButton3).not.toBeChecked();
    await expect(radioButton4).toBeChecked();
    await expect(radioButton5).not.toBeChecked();

    await radioButton5.check();

    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).not.toBeChecked();
    await expect(radioButton3).not.toBeChecked();
    await expect(radioButton4).not.toBeChecked();
    await expect(radioButton5).toBeChecked();
  });
  test("Selected & Disabled are correct and work correclty", async ({
    page
  }) => {
    // Navigate to the Buttons page in a separate Tab
    const [bttnsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)" })
        .click()
    ]);

    await bttnsPage.waitForLoadState();

    // Define Selected & Disabled section
    const selectedSection = bttnsPage
      .locator(".thumbnail")
      .filter({ hasText: "Selected & Disabled" });

    const radioButtons = selectedSection.getByRole("radio");
    const dropdown = selectedSection.getByRole("combobox");

    // Verify radio and dropdown QTYs
    await expect(radioButtons).toHaveCount(3);
    await expect(dropdown).toHaveCount(1);

    // Define test items and verify their data
    const radioButton1 = radioButtons.nth(0);
    const radioButton2 = radioButtons.nth(1);
    const radioButton3 = radioButtons.nth(2);

    await expect(radioButton1).toHaveValue(/Lettuce/i);
    await expect(radioButton2).toHaveValue(/Cabbage/i);
    await expect(radioButton3).toHaveValue(/Pumpkin/i);

    const values = ["Apple", "Orange", "Pear", "Grape"];
    const dropdownOptions = dropdown.locator("option");

    /* Alternative Way (Used in Dropdowns section)
    const dropdownValues = await dropdown.allTextContents().then((values) => {
      const combinedValues = values.join("\n");

      const fixedArray = combinedValues
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      return fixedArray;
    });

    // expect(dropdownValues).toEqual(values);
    */
    expect(await dropdownOptions.allTextContents()).toEqual(values);

    // Verify initial state
    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).not.toBeChecked();
    await expect(radioButton3).toBeChecked();

    await expect(dropdown).toHaveValue(/Grape/i);

    //Verify Enabled/Disabled elements
    await expect(radioButton1).toBeEnabled();
    await expect(radioButton2).toBeDisabled();
    await expect(radioButton3).toBeEnabled();

    await expect(dropdownOptions.nth(1)).toBeDisabled();

    //Select Enabled values and verify selection
    await radioButton1.check();

    await expect(radioButton1).toBeChecked();
    await expect(radioButton2).toBeDisabled();
    await expect(radioButton3).not.toBeChecked();

    await radioButton3.check();

    await expect(radioButton1).not.toBeChecked();
    await expect(radioButton2).toBeDisabled();
    await expect(radioButton3).toBeChecked();

    await dropdown.selectOption("Apple");
    await expect(dropdown).toHaveValue(/Apple/i);
    await expect(dropdownOptions.nth(1)).toBeDisabled();

    await dropdown.selectOption("Pear");
    await expect(dropdown).toHaveValue(/Pear/i);
    await expect(dropdownOptions.nth(1)).toBeDisabled();

    await dropdown.selectOption("Grape");
    await expect(dropdown).toHaveValue(/Grape/i);
    await expect(dropdownOptions.nth(1)).toBeDisabled();
  });
});
