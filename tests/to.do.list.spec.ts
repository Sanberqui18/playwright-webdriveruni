import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("To Do List - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Text and button existance", async ({ page }) => {
    const homePage = new HomePage(page);
    const toDoPage = await homePage.openToDoList();

    // Verify Page URL to contain to do list
    await expect(toDoPage.page).toHaveURL(/to-do-list/i);

    // Verify button, field and title exist and are correct
    await expect(toDoPage.title).toContainText("TO-DO LIST");
    await expect(toDoPage.plusButton).toBeVisible();
    await expect(toDoPage.newTodoInput).toBeVisible();
  });

  test("Verify initial load have 3 items and button functionality", async ({
    page
  }) => {
    const homePage = new HomePage(page);
    const toDoPage = await homePage.openToDoList();

    // Define initial load items, this does not change
    const initialItems = [
      " Go to potion class",
      " Buy new robes",
      " Practice magic"
    ];

    // Verify initial load list QTY = 3 and values
    await expect(toDoPage.listItems).toHaveCount(3);
    await expect(toDoPage.listItems).toHaveText(initialItems);

    // Click on the button and field should be hidden
    await expect(toDoPage.newTodoInput).toBeVisible();
    await toDoPage.plusButton.click();
    await expect(toDoPage.newTodoInput).toBeHidden();

    // Verify trash icons are enabled and items not completed
    for (const item of await toDoPage.listItems.all()) {
      const trashIcon = toDoPage.trashIcon(item);
      await expect(trashIcon).toBeEnabled();
      await expect(item).not.toHaveClass("completed");
    }
  });

  test("Add or Remove items is working correctly", async ({ page }) => {
    const homePage = new HomePage(page);
    const toDoPage = await homePage.openToDoList();

    // Add new To Do item to the To Do list
    await toDoPage.addItem("Example 1");

    // Verify new item is added correctly
    await expect(toDoPage.listItems.last()).toHaveText("Example 1");
    await expect(toDoPage.listItems).toHaveCount(4);

    //define delete items
    const deleteItem = toDoPage.listItems.nth(0);

    //Mark the delete item as complete
    await expect(deleteItem).not.toHaveClass("completed");
    await deleteItem.click();
    await expect(deleteItem).toHaveClass("completed");

    // Delete the complete item
    await toDoPage.trashIcon(deleteItem).hover();
    await toDoPage.trashIcon(deleteItem).click();

    // Verify List Count is 3
    await expect(toDoPage.listItems).toHaveCount(3);

    // Define new list items
    const updatedItems = [" Buy new robes", " Practice magic", " Example 1"];

    // Verify List items are correct
    await expect(toDoPage.listItems).toHaveText(updatedItems);
  });
});
