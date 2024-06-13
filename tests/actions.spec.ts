import { test, expect } from "@playwright/test";

test.describe("Actions - Happy Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Page URL, Header, Title, Sections and Footer", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Verify url and Header title
    const headerTitle = actionsPage.getByRole("navigation");

    await expect(actionsPage).toHaveURL(/Actions/i);
    await expect(headerTitle).toContainText(/WebdriverUniversity.com/);

    // Define titles and sections
    const title = actionsPage
      .getByRole("heading")
      .locator(":scope#main-header");

    const bigSections = actionsPage.locator(".col-lg-6");
    const tinySection1 = actionsPage.locator("#div-hover");
    const tinySection2 = actionsPage.locator("#click-box");

    const footer = actionsPage.getByRole("paragraph").last();

    // Verify Sections QTY tiny 2 and big 2) and titles
    await expect(title).toHaveText(
      "The Key to Success is to take massive ACTION!"
    );

    await expect(bigSections).toHaveCount(2);
    await expect(tinySection1).toHaveCount(1);
    await expect(tinySection2).toHaveCount(1);

    await expect(footer).toContainText("Copyright");
  });

  test("Drag and Drop section should work correctly", async ({ page }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Define drag and drop elements
    const dragAndDropSection = actionsPage
      .locator("#div-drag-drop-thumbnail")
      .first();
    const draggable = dragAndDropSection.locator("#draggable");
    const droppable = dragAndDropSection.locator("#droppable");

    // Verify initial state
    await expect(draggable).toHaveCSS("position", "relative");
    await expect(draggable).toContainText("DRAG ME TO MY TARGET!");
    await expect(droppable).toContainText("DROP HERE!");

    // Drag the draggable to the droppable section
    await draggable.dragTo(droppable);

    // Verfiy droppable text changed
    await expect(droppable).toContainText("Dropped!");

    // Refresh the page to get all reseted
    await actionsPage.reload();

    //Drag to different locations and verify text
    await draggable.dragTo(droppable, { targetPosition: { x: 35, y: 30 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 190, y: 30 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 350, y: 30 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 35, y: 200 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, {
      targetPosition: { x: 35, y: 100 }
    });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, {
      targetPosition: { x: 190, y: 200 }
    });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, {
      targetPosition: { x: 350, y: 200 }
    });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.reload();

    await draggable.dragTo(droppable, {
      targetPosition: { x: 350, y: 100 }
    });
    await expect(droppable).toContainText("Dropped!");
  });

  test("Double Click section should work correctly", async ({ page }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Define double click elements
    const dblClickSection = actionsPage
      .locator("#div-drag-drop-thumbnail")
      .last();
    const dblClickBttn = dblClickSection.locator("#double-click");

    // Verify inital state
    await expect(dblClickBttn).toContainText("Double Click Me!");
    await expect(dblClickBttn).toHaveClass("div-double-click");

    // Double Click the element and verify color changed
    await dblClickBttn.click({ clickCount: 2 });
    await expect(dblClickBttn).toHaveClass("div-double-click double");

    // Double Click the element again and verify color changed
    await dblClickBttn.dblclick();
    await expect(dblClickBttn).toHaveClass("div-double-click");

    //
  });

  test("Hover Over section should work correctly", async ({ page }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Define hover over elements
    const hoverSection = actionsPage.locator("#div-hover");
    const hoverBttns = hoverSection.locator(".dropbtn");
    const hoverFirst = hoverBttns.nth(0);
    const hoverSecond = hoverBttns.nth(1);
    const hoverThird = hoverBttns.nth(2);

    const alerts = hoverSection.locator(".list-alert");
    const firstAlert = alerts.nth(0);
    const secondAlert = alerts.nth(1);
    const thirdAlert = alerts.nth(2);
    const fourthAlert = alerts.nth(3);

    // Verify Initial State
    await expect(hoverFirst).toContainText("Hover Over Me First!");
    await expect(hoverSecond).toContainText("Hover Over Me Second!");
    await expect(hoverThird).toContainText("Hover Over Me Third!");

    await expect(alerts).toHaveCount(4);

    await expect(firstAlert).toBeHidden();
    await expect(secondAlert).toBeHidden();
    await expect(thirdAlert).toBeHidden();
    await expect(fourthAlert).toBeHidden();

    await expect(firstAlert).toHaveText("Link 1");
    await expect(secondAlert).toHaveText("Link 1");
    await expect(thirdAlert).toHaveText("Link 1");
    await expect(fourthAlert).toHaveText("Link 1");

    //Define dialog event (alert) before clicking on the buttons
    //Grab alert message to assert afterwards
    let successMessage: string = "";
    actionsPage.on("dialog", async (dialog) => {
      // Grab allert message
      successMessage = dialog.message();

      // Verify success message from the dialog
      expect(successMessage).toContain("Well done you clicked on the link!");
      await dialog.accept();
    });

    // Hover Over elements and verify visibility and clicking
    await hoverFirst.hover();
    await expect(firstAlert).toBeVisible();
    await expect(secondAlert).toBeHidden();
    await expect(thirdAlert).toBeHidden();
    await expect(fourthAlert).toBeHidden();
    await firstAlert.click();

    await hoverSecond.hover();
    await expect(firstAlert).toBeHidden();
    await expect(secondAlert).toBeVisible();
    await expect(thirdAlert).toBeHidden();
    await expect(fourthAlert).toBeHidden();
    await secondAlert.click();

    await hoverThird.hover();
    await expect(firstAlert).toBeHidden();
    await expect(secondAlert).toBeHidden();
    await expect(thirdAlert).toBeVisible();
    await expect(fourthAlert).toBeVisible();
    await thirdAlert.click();
    await fourthAlert.click();
  });

  test("Click and Hold section should work correclty", async ({ page }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Define click and hold elements
    const clickAndHoldBttn = actionsPage.locator("#click-box");

    // Verify Initial State
    await expect(clickAndHoldBttn).toContainText("Click and Hold!");
    await expect(clickAndHoldBttn).not.toHaveAttribute("style");

    //Click and Hold (no await on click, assertion made while clicking)
    clickAndHoldBttn.click({ delay: 1000 });

    await expect(clickAndHoldBttn).toHaveText(
      "Well done! keep holding that click now....."
    );
    await expect(clickAndHoldBttn).toHaveAttribute(
      "style",
      "background: rgb(0, 255, 0); font-size: 30px;"
    );

    // When relase the click validate text and color
    await expect(clickAndHoldBttn).toHaveText("Dont release me!!!");
    await expect(clickAndHoldBttn).toHaveAttribute(
      "style",
      "background: tomato; font-size: 30px;"
    );
  });
});

test.describe("Actions - Edge Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Drag and Drop section - Releasing drag outside the drop secion should not change the color", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Define drag and drop elements
    const dragAndDropSection = actionsPage
      .locator("#div-drag-drop-thumbnail")
      .first();
    const draggable = dragAndDropSection.locator("#draggable");
    const droppable = dragAndDropSection.locator("#droppable");

    // Drag the draggable outside the droppable section
    await draggable.dragTo(dragAndDropSection, {
      targetPosition: { x: 350, y: 10 }
    });
    await expect(droppable).toContainText("DROP HERE!");

    await draggable.dragTo(dragAndDropSection, {
      targetPosition: { x: 0, y: 0 }
    });
    await expect(droppable).toContainText("DROP HERE!");
  });

  test("Double Click section - Clicking once should not change click color", async ({
    page
  }) => {
    // Navigate to the Actions page in a separate Tab
    const [actionsPage] = await Promise.all([
      page.waitForEvent("popup"),
      page
        .getByRole("link")
        .filter({ hasText: /ACTIONS/ })
        .click()
    ]);

    await actionsPage.waitForLoadState();

    // Define double click elements
    const dblClickSection = actionsPage
      .locator("#div-drag-drop-thumbnail")
      .last();
    const dblClickBttn = dblClickSection.locator("#double-click");

    // Perforn just one click and verify the color does not change
    await dblClickBttn.click();
    await expect(dblClickBttn).toContainText("Double Click Me!");
    await expect(dblClickBttn).toHaveClass("div-double-click");
    await expect(dblClickBttn).not.toHaveClass("div-double-click double");
  });
});
