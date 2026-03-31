import { test, expect } from "./fixtures";

test.describe("To Do List - Only Path", () => {
  test("Verify Text and button existance", async ({ toDoListPage }) => {
    // Verify Page URL to contain to do list
    await expect(toDoListPage.page).toHaveURL(/to-do-list/i);

    // Verify button, field and title exist and are correct
    await expect(toDoListPage.title).toContainText("TO-DO LIST");
    await expect(toDoListPage.plusButton).toBeVisible();
    await expect(toDoListPage.newTodoInput).toBeVisible();
  });

  test("Verify initial load have 3 items and button functionality", async ({
    toDoListPage
  }) => {
    // Define initial load items, this does not change
    const initialItems = [
      " Go to potion class",
      " Buy new robes",
      " Practice magic"
    ];

    // Verify initial load list QTY = 3 and values
    await expect(toDoListPage.listItems).toHaveCount(3);
    await expect(toDoListPage.listItems).toHaveText(initialItems);

    // Click on the button and field should be hidden
    await expect(toDoListPage.newTodoInput).toBeVisible();
    await toDoListPage.plusButton.click();
    await expect(toDoListPage.newTodoInput).toBeHidden();

    // Verify trash icons are enabled and items not completed
    for (const item of await toDoListPage.listItems.all()) {
      const trashIcon = toDoListPage.trashIcon(item);
      await expect(trashIcon).toBeEnabled();
      await expect(item).not.toHaveClass("completed");
    }
  });

  test("Add or Remove items is working correctly", async ({ toDoListPage }) => {
    // Add new To Do item to the To Do list
    await toDoListPage.addItem("Example 1");

    // Verify new item is added correctly
    await expect(toDoListPage.listItems.last()).toHaveText("Example 1");
    await expect(toDoListPage.listItems).toHaveCount(4);

    //define delete items
    const deleteItem = toDoListPage.listItems.nth(0);

    //Mark the delete item as complete
    await expect(deleteItem).not.toHaveClass("completed");
    await deleteItem.click();
    await expect(deleteItem).toHaveClass("completed");

    // Delete the complete item
    await toDoListPage.trashIcon(deleteItem).hover();
    await toDoListPage.trashIcon(deleteItem).click();

    // Verify List Count is 3
    await expect(toDoListPage.listItems).toHaveCount(3);

    // Define new list items
    const updatedItems = [" Buy new robes", " Practice magic", " Example 1"];

    // Verify List items are correct
    await expect(toDoListPage.listItems).toHaveText(updatedItems);
  });
});
