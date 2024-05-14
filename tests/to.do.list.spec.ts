import { test, expect } from "@playwright/test";

test.describe("To Do List - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Verify Text and button existance", async ({ page }) => {
    // Navigate to the To Do List page in a separate Tab
    const [toDoPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "TO DO LIST" }).click()
    ]);

    await toDoPage.waitForLoadState();

    // Verify Page URL to contain to do list
    await expect(toDoPage).toHaveURL(/to-do-list/i);

    // Define variables we want to verify exist or have expected text
    const ToDoTitle = toDoPage.locator("#container > h1");
    const newToDoBttn = toDoPage.locator("#plus-icon");
    const newToDo = toDoPage.locator("input");

    // Verify button, field and title exist and are correct
    await expect(ToDoTitle).toContainText("TO-DO LIST");
    await expect(newToDoBttn).toBeVisible();
    await expect(newToDo).toBeVisible();
  });

  test("Verify initial load have 3 items and button functionality", async ({
    page
  }) => {
    // Navigate to the To Do List page in a separate Tab
    const [toDoPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "TO DO LIST" }).click()
    ]);

    await toDoPage.waitForLoadState();

    // Define web elements
    const newToDoBttn = toDoPage.locator("#plus-icon");
    const newToDo = toDoPage.getByPlaceholder("Add new todo");
    const toDoList = toDoPage.getByRole("listitem");

    // Define initial load items, this does not change
    const initialItems = [
      " Go to potion class",
      " Buy new robes",
      " Practice magic"
    ];

    // Verify initial load list QTY = 3 and values
    await expect(toDoList).toHaveCount(3);
    await expect(toDoList).toHaveText(initialItems);

    // Click on the button and field should be hidden
    await expect(newToDo).toBeVisible();
    await newToDoBttn.click();
    await expect(newToDo).toBeHidden();

    // Verify trash icons are enabled and items not completed
    for (const item of await toDoList.all()) {
      const trashIcon = item.locator(".fa-trash");
      await expect(trashIcon).toBeEnabled();
      await expect(item).not.toHaveClass("completed");
    }
  });

  test("Add or Remove items is working correctly", async ({ page }) => {
    // Navigate to the To Do List page in a separate Tab
    const [toDoPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link").filter({ hasText: "TO DO LIST" }).click()
    ]);

    await toDoPage.waitForLoadState();

    // Define list elements
    const newToDo = toDoPage.getByPlaceholder("Add new todo");
    const toDoList = toDoPage.getByRole("listitem");

    // Add new To Do item to the To Do list
    await newToDo.fill("Example 1");
    await newToDo.press("Enter");

    // Verify new item is added correctly
    await expect(toDoList.last()).toHaveText("Example 1");
    await expect(toDoList).toHaveCount(4);

    //define delete items
    const deleteItem = toDoList.nth(0);
    const trashIcon = ".fa-trash";

    //Mark the delete item as complete
    await expect(deleteItem).not.toHaveClass("completed");
    await deleteItem.click();
    await expect(deleteItem).toHaveClass("completed");

    // Delete the complete item
    await deleteItem.locator(trashIcon).hover();
    await deleteItem.locator(trashIcon).click();

    // Verify List Count is 3
    await expect(toDoList).toHaveCount(3);

    // Define new list items
    const updatedItems = [" Buy new robes", " Practice magic", " Example 1"];

    // Verify List items are correct
    await expect(toDoList).toHaveText(updatedItems);
  });
});
