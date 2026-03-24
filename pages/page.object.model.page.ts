import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PageObjectModelPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // --- Navigation tabs ---
  get homeTab() {
    return this.page.getByRole("link", { name: "Home" });
  }

  get productsTab() {
    return this.page.getByRole("link", { name: "Our Products" });
  }

  get contactTab() {
    return this.page.getByRole("link", { name: "Contact Us" });
  }

  // --- Home section ---
  get imageSlides() {
    return this.page.locator(".item");
  }

  get imageDots() {
    return this.page.getByRole("list").nth(0).getByRole("listitem");
  }

  get carouselLeft() {
    return this.page.getByRole("link", { name: "" });
  }

  get carouselRight() {
    return this.page.getByRole("link", { name: "" });
  }

  get navMenu() {
    return this.page.getByRole("list").nth(1).getByRole("listitem");
  }

  get thumbnailSections() {
    return this.page.locator(".row .thumbnail");
  }

  // --- Home modal ---
  get modal() {
    return this.page.locator("#myModal");
  }

  get findOutMoreBtn() {
    return this.page.getByRole("button", { name: "Find Out More!" });
  }

  get modalAcceptBtn() {
    return this.page.getByRole("button", { name: "Find Out More" }).nth(1);
  }

  get modalCloseBtn() {
    return this.page.getByRole("button", { name: "Close" });
  }

  get modalCloseIcon() {
    return this.page
      .getByRole("button")
      .filter({ has: this.page.locator(":scope.close") });
  }

  get modalTitle() {
    return this.page.getByRole("heading", {
      name: "Welcome to webdriveruniversity.com"
    });
  }

  get modalContent() {
    return this.page
      .getByRole("paragraph")
      .filter({ hasText: "Welcome to webdriveruniversity" });
  }

  // --- Products section ---
  get productSections() {
    return this.page.locator(".thumbnail");
  }

  get headerTitle() {
    return this.page.locator("#nav-title");
  }

  get proceedButton() {
    return this.page.getByRole("button", { name: "Proceed" });
  }

  get productsModalTitle() {
    return this.page.getByRole("heading", {
      name: "Special Offer! - Get 30% off"
    });
  }

  productLink(name: string) {
    return this.page.getByRole("link", { name });
  }

  // --- Actions ---
  async goToProducts() {
    await this.productsTab.click();
  }

  async goToContact() {
    await this.contactTab.click();
  }

  async goToHome() {
    await this.homeTab.click();
  }

  async goBack() {
    await this.page.goBack();
  }
}
