import { test, expect } from "./fixtures";

test.describe("Actions - Happy Path", () => {
  test("Verify Page URL, Header, Title, Sections and Footer", async ({
    actionsPage
  }) => {
    // Verify url and Header title
    await expect(actionsPage.page).toHaveURL(/Actions/i);
    await expect(actionsPage.pageNavTitle).toContainText(/WebdriverUniversity.com/);

    await expect(actionsPage.mainHeader).toHaveText(
      "The Key to Success is to take massive ACTION!"
    );

    await expect(actionsPage.bigSections).toHaveCount(2);
    await expect(actionsPage.tinyHoverSection).toHaveCount(1);
    await expect(actionsPage.tinyClickBox).toHaveCount(1);

    await expect(actionsPage.footer).toContainText("Copyright");
  });

  test("Drag and Drop section should work correctly", async ({ actionsPage }) => {
    // Define drag and drop elements
    const dragDropSection = actionsPage.dragDropSectionFirst;
    const draggable = actionsPage.draggable(dragDropSection);
    const droppable = actionsPage.droppable(dragDropSection);

    // Verify initial state
    await expect(draggable).toHaveCSS("position", "relative");
    await expect(draggable).toContainText("DRAG ME TO MY TARGET!");
    await expect(droppable).toContainText("DROP HERE!");

    // Drag the draggable to the droppable section
    await draggable.dragTo(droppable);

    // Verify droppable text changed
    await expect(droppable).toContainText("Dropped!");

    // Refresh the page to get all reseted
    await actionsPage.page.reload();

    //Drag to different locations and verify text
    await draggable.dragTo(droppable, { targetPosition: { x: 35, y: 30 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 190, y: 30 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 350, y: 30 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 35, y: 200 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 35, y: 100 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 190, y: 200 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 350, y: 200 } });
    await expect(droppable).toContainText("Dropped!");
    await actionsPage.page.reload();

    await draggable.dragTo(droppable, { targetPosition: { x: 350, y: 100 } });
    await expect(droppable).toContainText("Dropped!");
  });

  test("Double Click section should work correctly", async ({ actionsPage }) => {
    const dblClickBttn = actionsPage.doubleClickButton;

    // Verify inital state
    await expect(dblClickBttn).toContainText("Double Click Me!");
    await expect(dblClickBttn).toHaveClass("div-double-click");

    // Double Click the element and verify color changed
    await dblClickBttn.click({ clickCount: 2 });
    await expect(dblClickBttn).toHaveClass("div-double-click double");

    // Double Click the element again and verify color changed
    await dblClickBttn.dblclick();
    await expect(dblClickBttn).toHaveClass("div-double-click");
  });

  test("Hover Over section should work correctly", async ({ actionsPage }) => {
    const hoverFirst = actionsPage.hoverButtons.nth(0);
    const hoverSecond = actionsPage.hoverButtons.nth(1);
    const hoverThird = actionsPage.hoverButtons.nth(2);

    const firstAlert = actionsPage.hoverAlerts.nth(0);
    const secondAlert = actionsPage.hoverAlerts.nth(1);
    const thirdAlert = actionsPage.hoverAlerts.nth(2);
    const fourthAlert = actionsPage.hoverAlerts.nth(3);

    // Verify Initial State
    await expect(hoverFirst).toContainText("Hover Over Me First!");
    await expect(hoverSecond).toContainText("Hover Over Me Second!");
    await expect(hoverThird).toContainText("Hover Over Me Third!");

    await expect(actionsPage.hoverAlerts).toHaveCount(4);

    await expect(firstAlert).toBeHidden();
    await expect(secondAlert).toBeHidden();
    await expect(thirdAlert).toBeHidden();
    await expect(fourthAlert).toBeHidden();

    await expect(firstAlert).toHaveText("Link 1");
    await expect(secondAlert).toHaveText("Link 1");
    await expect(thirdAlert).toHaveText("Link 1");
    await expect(fourthAlert).toHaveText("Link 1");

    //Define dialog event (alert) before clicking on the buttons
    let successMessage: string = "";
    actionsPage.page.on("dialog", async (dialog) => {
      successMessage = dialog.message();
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

  test("Click and Hold section should work correclty", async ({ actionsPage }) => {
    const clickAndHoldBttn = actionsPage.clickAndHoldBox;

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
  test("Drag and Drop section - Releasing drag outside the drop secion should not change the color", async ({
    actionsPage
  }) => {
    const dragDropSection = actionsPage.dragDropSectionFirst;
    const draggable = actionsPage.draggable(dragDropSection);
    const droppable = actionsPage.droppable(dragDropSection);

    // Drag the draggable outside the droppable section
    await draggable.dragTo(dragDropSection, {
      targetPosition: { x: 350, y: 10 }
    });
    await expect(droppable).toContainText("DROP HERE!");

    await draggable.dragTo(dragDropSection, {
      targetPosition: { x: 0, y: 0 }
    });
    await expect(droppable).toContainText("DROP HERE!");
  });

  test("Double Click section - Clicking once should not change click color", async ({
    actionsPage
  }) => {
    const dblClickBttn = actionsPage.doubleClickButton;

    // Perform just one click and verify the color does not change
    await dblClickBttn.click();
    await expect(dblClickBttn).toContainText("Double Click Me!");
    await expect(dblClickBttn).toHaveClass("div-double-click");
    await expect(dblClickBttn).not.toHaveClass("div-double-click double");
  });
});
