import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class DataTablesButtonsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get headerTitle() {
    return this.page.locator("#nav-title");
  }

  get pageTitle() {
    return this.page.getByRole("heading", {
      name: "Data, Tables & Button States"
    });
  }

  get sections() {
    return this.page.locator(".thumbnail");
  }

  // --- Data section (index 0) ---
  get dataSection() {
    return this.sections.first();
  }

  get firstNameField() {
    return this.dataSection.getByRole("textbox").nth(0);
  }

  get lastNameField() {
    return this.dataSection.getByRole("textbox").nth(1);
  }

  get textAreaField() {
    return this.dataSection.getByRole("textbox").nth(2);
  }

  get table1() {
    return this.dataSection.getByRole("table").first();
  }

  get table2() {
    return this.dataSection.getByRole("table").last();
  }

  // --- BreadCrumb section (index 1) ---
  get breadcrumbSection() {
    return this.sections.nth(1);
  }

  get breadcrumbItems() {
    return this.breadcrumbSection.getByRole("listitem");
  }

  // --- Badges section (index 2) ---
  get badgeSection() {
    return this.sections.nth(2);
  }

  get badgeMenuItems() {
    return this.badgeSection.getByRole("listitem");
  }

  // --- Pagination section (index 3) ---
  get paginationSection() {
    return this.sections.nth(3);
  }

  get paginationListItems() {
    return this.paginationSection.getByRole("listitem").locator("a");
  }

  async clickPaginationPage(label: string | RegExp) {
    await this.paginationListItems.filter({ hasText: label }).click();
  }

  // --- Table section (index 4) ---
  get tableSection() {
    return this.sections.nth(4);
  }

  // --- Button States section (index 5) ---
  get buttonStatesSection() {
    return this.sections.nth(5);
  }

  // --- Random Text section (index 6) ---
  get randomTextSection() {
    return this.sections.nth(6);
  }

  // --- Lists section (index 7) ---
  get listSection() {
    return this.sections.nth(7);
  }
}
