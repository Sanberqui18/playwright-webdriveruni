/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Page Object Model - Only path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Home", () => {
    test("Verify Page Object Model Page Header", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await expect(pomPage.page).toHaveURL(/Page-Object-Model/);

      // Verify Header Title exists
      await expect(pomPage.headerTitle).toContainText(/WebdriverUniversity.com/);
    });

    test("Verify Section Navigation", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      // Validate Product Navigation
      await pomPage.goToProducts();
      await expect(pomPage.page).toHaveURL(/products/);

      await pomPage.goBack();

      // Validate Contact Us Navigation
      await pomPage.goToContact();
      await expect(pomPage.page).toHaveURL(/contactus/);

      await pomPage.goBack();

      // Validate Home Navigation
      await pomPage.goToHome();
      await expect(pomPage.page).toHaveURL(/index/);
    });

    test("Image Container list should work correctly", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      // Verify Image Slides and Selection count
      await expect(pomPage.imageSlides).toHaveCount(3);
      await expect(pomPage.imageDots).toHaveCount(3);

      const imageCount = (await pomPage.imageSlides.count()) - 1;

      // Verify image selection and slides when clicking on all options
      for (let imageIndex = 0; imageIndex <= imageCount; imageIndex++) {
        const imageSlide = pomPage.imageSlides.nth(imageIndex);
        const imageDot = pomPage.imageDots.nth(imageIndex);

        // Inital state verify the other selections are not active
        if (imageIndex == 0) {
          await expect(pomPage.imageSlides.nth(imageIndex + 1)).not.toHaveClass(
            "active"
          );
          await expect(pomPage.imageDots.nth(imageIndex + 1)).not.toHaveClass(
            "active"
          );
          await expect(pomPage.imageSlides.nth(imageIndex + 2)).not.toHaveClass(
            "active"
          );
          await expect(pomPage.imageDots.nth(imageIndex + 2)).not.toHaveClass(
            "active"
          );
        }
        // Chose selection
        await imageDot.click();

        // Verify image and selection has active class
        await expect(imageDot).toHaveClass("active");
        await expect(imageSlide).toHaveClass("item active");
      }
    });

    test("Image Container buttons should work correctly", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await expect(pomPage.imageSlides).toHaveCount(3);

      await expect(pomPage.imageSlides.nth(0)).toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(1)).not.toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(2)).not.toHaveClass("item active");

      await pomPage.carouselRight.click();
      await expect(pomPage.imageSlides.nth(0)).not.toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(1)).toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(2)).not.toHaveClass("item active");

      await pomPage.carouselRight.click();
      await expect(pomPage.imageSlides.nth(0)).not.toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(1)).not.toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(2)).toHaveClass("item active");

      await pomPage.carouselLeft.click();
      await expect(pomPage.imageSlides.nth(0)).not.toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(1)).toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(2)).not.toHaveClass("item active");

      await pomPage.carouselLeft.click();
      await expect(pomPage.imageSlides.nth(0)).toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(1)).not.toHaveClass("item active");
      await expect(pomPage.imageSlides.nth(2)).not.toHaveClass("item active");
    });

    test("Verify Section Qty, titles, stars, buttons and texts", async ({
      page
    }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      // Define menu values
      const menuValues = ["Home", "Our Products", "Contact Us"];

      // Define sections contents
      const sectionContents = [
        {
          title: "Who Are We?",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          stars: false
        },
        {
          title: "GREAT SERVICE!",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          stars: true,
          starCount: 5
        },
        {
          title: "Why Choose Us?",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          stars: false
        },
        {
          title: "Excellent Customer Service!",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          stars: true,
          starCount: 5
        }
      ];

      // Validate Menu QTY = 3 and Values
      await expect(pomPage.navMenu).toHaveCount(3);
      await expect(pomPage.navMenu).toHaveText(menuValues);

      // Validate Section QTY = 4 and Values
      await expect(pomPage.thumbnailSections).toHaveCount(4);

      for (const [index, section] of sectionContents.entries()) {
        // Define each section title and Content
        const sectionTitle = pomPage.thumbnailSections.locator(".sub-heading").nth(index);
        const sectionContent = pomPage.thumbnailSections.locator(".caption").nth(index);

        // Verify Title and Content matches the expected values
        await expect(sectionTitle).toHaveText(section.title);
        await expect(sectionContent).toContainText(section.body);

        // If section has stars, validate count
        if (section.stars) {
          const sectionStars = pomPage.thumbnailSections.nth(index).locator(".glyphicon-star");
          expect(await sectionStars.count()).toBe(section.starCount);
        }
      }
    });

    test("Verify modal contents and buttons", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await pomPage.findOutMoreBtn.click();

      await expect(pomPage.modal).toBeVisible();
      await expect(pomPage.modalTitle).toBeVisible();
      await expect(pomPage.modalContent).toBeVisible();

      await pomPage.modalAcceptBtn.click();
      await expect(pomPage.modal).toBeHidden();

      await pomPage.findOutMoreBtn.click();

      await pomPage.modalCloseBtn.click();
      await expect(pomPage.modal).toBeHidden();

      await pomPage.findOutMoreBtn.click();

      await pomPage.modalCloseIcon.click();
      await expect(pomPage.modal).toBeHidden();
    });
  });

  test.describe("Our Products", () => {
    test("Verify Header", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await pomPage.goToProducts();

      // Verify page header
      await expect(pomPage.headerTitle).toContainText(/WebDriver/);
    });

    test("Verify Section Navigations", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await pomPage.goToProducts();

      // Validate Home Navigation
      await pomPage.goToHome();
      await expect(pomPage.page).toHaveURL(/index/);

      await pomPage.goBack();

      // Validate Contact Us Navigation
      await pomPage.goToContact();
      await expect(pomPage.page).toHaveURL(/contactus/);

      await pomPage.goBack();

      // Validate Product Navigation
      await pomPage.goToProducts();
      await expect(pomPage.page).toHaveURL(/products/);
    });

    test("Verify Product Sections and modals", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await pomPage.goToProducts();

      // Verify Product Section QTY = 8
      await expect(pomPage.productSections).toHaveCount(8);

      // Add sections to an array of sections
      const sectionsBlocks = [
        pomPage.productLink("Special Offers"),
        pomPage.productLink("Cameras"),
        pomPage.productLink("New Laptops"),
        pomPage.productLink("Used Laptops"),
        pomPage.productLink("Game Consoles"),
        pomPage.productLink("Components"),
        pomPage.productLink("Desktop Systems"),
        pomPage.productLink("Audio")
      ];

      const modalContent = pomPage.page.getByRole("paragraph").filter({
        hasText: `Please Note: All orders must be over the value of £50, adding additional coupon codes to the basket are excluded from this offer. To receive 30% off please add the following code to the basket: ${process.env.DISCOUNT}`
      });

      // Iterate on each block opening, closing and validating modals
      for (const block of sectionsBlocks) {
        await block.click();

        await expect(pomPage.modal).toBeVisible();
        await expect(pomPage.productsModalTitle).toBeVisible();
        await expect(modalContent).toBeVisible();

        await pomPage.proceedButton.click();
        await expect(pomPage.modal).toBeHidden();

        await block.click();
        await pomPage.modalCloseBtn.click();
        await expect(pomPage.modal).toBeHidden();

        await block.click();
        await pomPage.modalCloseIcon.click();
        await expect(pomPage.modal).toBeHidden();
      }
    });
  });

  test.describe("Contact Us", () => {
    test("Verify Contact Us navigation and Header", async ({ page }) => {
      const homePage = new HomePage(page);
      const pomPage = await homePage.openPageObjectModel();

      await pomPage.goToContact();

      await expect(pomPage.page).toHaveURL(/contactus/);

      // Verify Header Title exists
      await expect(pomPage.headerTitle).toContainText(/WebdriverUniversity.com/);
    });
  });
});
