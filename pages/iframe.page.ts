import { Page, FrameLocator } from "@playwright/test";
import { BasePage } from "./base.page";

export class IFramePage extends BasePage {
  readonly frame: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.frame = page.frameLocator("#frame");
  }

  // --- Outer page ---
  get outerNavTitle() {
    return this.page.getByRole("navigation");
  }

  get outerFooter() {
    return this.page.getByRole("paragraph").last();
  }

  get frameBody() {
    return this.frame.locator("body");
  }

  // --- Frame navigation tabs ---
  get homeTab() {
    return this.frame.getByRole("link", { name: "Home" });
  }

  get productsTab() {
    return this.frame.getByRole("link", { name: "Our Products" });
  }

  get contactTab() {
    return this.frame.getByRole("link", { name: "Contact Us" });
  }

  // --- Frame Home section ---
  get imageSlides() {
    return this.frame.locator(".item");
  }

  get imageDots() {
    return this.frame.getByRole("list").nth(0).getByRole("listitem");
  }

  get carouselLeft() {
    return this.frame.getByRole("link", { name: "" });
  }

  get carouselRight() {
    return this.frame.getByRole("link", { name: "" });
  }

  get navMenu() {
    return this.frame.getByRole("list").nth(1).getByRole("listitem");
  }

  get thumbnails() {
    return this.frame.locator(".row .thumbnail");
  }

  get homeSection() {
    return this.frame.getByRole("paragraph").filter({ hasText: "Who Are We?" });
  }

  // --- Frame Home modal ---
  get homeModal() {
    return this.frame.locator("#myModal");
  }

  get findOutMoreBtn() {
    return this.frame.getByRole("button", { name: "Find Out More!" });
  }

  get homeModalAcceptBtn() {
    return this.frame.getByRole("button", { name: "Find Out More" }).nth(1);
  }

  get homeModalCloseBtn() {
    return this.frame.getByRole("button", { name: "Close" });
  }

  get homeModalCloseIcon() {
    return this.frame
      .getByRole("button")
      .filter({ has: this.frame.locator(":scope.close") });
  }

  get homeModalTitle() {
    return this.frame.getByRole("heading", {
      name: "Welcome to webdriveruniversity.com"
    });
  }

  get homeModalContent() {
    return this.frame
      .getByRole("paragraph")
      .filter({ hasText: "Welcome to webdriveruniversity" });
  }

  // --- Frame Products section ---
  get productThumbnails() {
    return this.frame.locator(".thumbnail");
  }

  get productHeaderTitle() {
    return this.frame.locator("#nav-title");
  }

  get productSection() {
    return this.frame.getByRole("link", { name: "Special Offers" });
  }

  productLink(name: string) {
    return this.frame.getByRole("link", { name });
  }

  get productModal() {
    return this.frame.locator("#myModal");
  }

  get productProceedBtn() {
    return this.frame.getByRole("button", { name: "Proceed" });
  }

  get productCloseBtn() {
    return this.frame.getByRole("button", { name: "Close" });
  }

  get productCloseIcon() {
    return this.frame
      .getByRole("button")
      .filter({ has: this.frame.locator(":scope.close") });
  }

  get productModalTitle() {
    return this.frame.getByRole("heading", {
      name: "Special Offer! - Get 30% off"
    });
  }

  // --- Frame Contact Us section ---
  get contactTitle() {
    return this.frame.getByRole("heading", { name: "CONTACT US" });
  }

  get contactFirstName() {
    return this.frame.getByPlaceholder("First Name");
  }

  get contactLastName() {
    return this.frame.getByPlaceholder("Last Name");
  }

  get contactEmail() {
    return this.frame.getByPlaceholder("Email Address");
  }

  get contactComments() {
    return this.frame.getByPlaceholder("Comments");
  }

  get contactSubmitBtn() {
    return this.frame.getByRole("button", { name: /submit/i });
  }

  get contactResetBtn() {
    return this.frame.getByRole("button", { name: /reset/i });
  }

  get contactSuccess() {
    return this.frame.getByRole("heading", {
      name: "Thank You for your Message!"
    });
  }

  get contactAnimation() {
    return this.frame.locator("#fountainG");
  }

  get contactAnimationDots() {
    return this.frame.locator("#fountainG > .fountainG");
  }

  get contactBodyErrors() {
    return this.frame.locator("body");
  }

  get contactErrorBreaks() {
    return this.frame.locator("body > br");
  }

  async fillContactForm(
    firstName: string,
    lastName: string,
    email: string,
    comments: string
  ) {
    await this.contactFirstName.fill(firstName);
    await this.contactLastName.fill(lastName);
    await this.contactEmail.fill(email);
    await this.contactComments.fill(comments);
  }

  async reloadAndOpenContact() {
    await this.page.reload();
    await this.contactTab.click();
  }
}
