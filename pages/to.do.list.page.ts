import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ToDoListPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title() {
    return this.page.locator("#container > h1");
  }

  get plusButton() {
    return this.page.locator("#plus-icon");
  }

  get newTodoInput() {
    return this.page.getByPlaceholder("Add new todo");
  }

  get listItems() {
    return this.page.getByRole("listitem");
  }

  trashIcon(item: Locator) {
    return item.locator(".fa-trash");
  }

  async addItem(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press("Enter");
  }
}
