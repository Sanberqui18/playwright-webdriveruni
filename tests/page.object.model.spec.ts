/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { test, expect } from "./fixtures";

test.describe("Page Object Model - Only path", () => {
  test.describe("Home", () => {
    test("Verify Page Object Model Page Header", async ({ pageObjectModelPage }) => {
      await expect(pageObjectModelPage.page).toHaveURL(/Page-Object-Model/);

      // Verify Header Title exists
      await expect(pageObjectModelPage.headerTitle).toContainText(/WebdriverUniversity.com/);
    });

    test("Verify Section Navigation", async ({ pageObjectModelPage }) => {
      // Validate Product Navigation
      await pageObjectModelPage.goToProducts();
      await expect(pageObjectModelPage.page).toHaveURL(/products/);

      await pageObjectModelPage.goBack();

      // Validate Contact Us Navigation
      await pageObjectModelPage.goToContact();
      await expect(pageObjectModelPage.page).toHaveURL(/contactus/);

      await pageObjectModelPage.goBack();

      // Validate Home Navigation
      await pageObjectModelPage.goToHome();
      await expect(pageObjectModelPage.page).toHaveURL(/index/);
    });

    test("Image Container list should work correctly", async ({ pageObjectModelPage }) => {
      // Verify Image Slides and Selection count
      await expect(pageObjectModelPage.imageSlides).toHaveCount(3);
      await expect(pageObjectModelPage.imageDots).toHaveCount(3);

      const imageCount = (await pageObjectModelPage.imageSlides.count()) - 1;

      // Verify image selection and slides when clicking on all options
      for (let imageIndex = 0; imageIndex <= imageCount; imageIndex++) {
        const imageSlide = pageObjectModelPage.imageSlides.nth(imageIndex);
        const imageDot = pageObjectModelPage.imageDots.nth(imageIndex);

        // Inital state verify the other selections are not active
        if (imageIndex == 0) {
          await expect(pageObjectModelPage.imageSlides.nth(imageIndex + 1)).not.toHaveClass(
            "active"
          );
          await expect(pageObjectModelPage.imageDots.nth(imageIndex + 1)).not.toHaveClass(
            "active"
          );
          await expect(pageObjectModelPage.imageSlides.nth(imageIndex + 2)).not.toHaveClass(
            "active"
          );
          await expect(pageObjectModelPage.imageDots.nth(imageIndex + 2)).not.toHaveClass(
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

    test("Image Container buttons should work correctly", async ({ pageObjectModelPage }) => {
      await expect(pageObjectModelPage.imageSlides).toHaveCount(3);

      await expect(pageObjectModelPage.imageSlides.nth(0)).toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(1)).not.toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(2)).not.toHaveClass("item active");

      await pageObjectModelPage.carouselRight.click();
      await expect(pageObjectModelPage.imageSlides.nth(0)).not.toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(1)).toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(2)).not.toHaveClass("item active");

      await pageObjectModelPage.carouselRight.click();
      await expect(pageObjectModelPage.imageSlides.nth(0)).not.toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(1)).not.toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(2)).toHaveClass("item active");

      await pageObjectModelPage.carouselLeft.click();
      await expect(pageObjectModelPage.imageSlides.nth(0)).not.toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(1)).toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(2)).not.toHaveClass("item active");

      await pageObjectModelPage.carouselLeft.click();
      await expect(pageObjectModelPage.imageSlides.nth(0)).toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(1)).not.toHaveClass("item active");
      await expect(pageObjectModelPage.imageSlides.nth(2)).not.toHaveClass("item active");
    });

    test("Verify Section Qty, titles, stars, buttons and texts", async ({
      pageObjectModelPage
    }) => {
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
      await expect(pageObjectModelPage.navMenu).toHaveCount(3);
      await expect(pageObjectModelPage.navMenu).toHaveText(menuValues);

      // Validate Section QTY = 4 and Values
      await expect(pageObjectModelPage.thumbnailSections).toHaveCount(4);

      for (const [index, section] of sectionContents.entries()) {
        // Define each section title and Content
        const sectionTitle = pageObjectModelPage.thumbnailSections.locator(".sub-heading").nth(index);
        const sectionContent = pageObjectModelPage.thumbnailSections.locator(".caption").nth(index);

        // Verify Title and Content matches the expected values
        await expect(sectionTitle).toHaveText(section.title);
        await expect(sectionContent).toContainText(section.body);

        // If section has stars, validate count
        if (section.stars) {
          const sectionStars = pageObjectModelPage.thumbnailSections.nth(index).locator(".glyphicon-star");
          expect(await sectionStars.count()).toBe(section.starCount);
        }
      }
    });

    test("Verify modal contents and buttons", async ({ pageObjectModelPage }) => {
      await pageObjectModelPage.findOutMoreBtn.click();

      await expect(pageObjectModelPage.modal).toBeVisible();
      await expect(pageObjectModelPage.modalTitle).toBeVisible();
      await expect(pageObjectModelPage.modalContent).toBeVisible();

      await pageObjectModelPage.modalAcceptBtn.click();
      await expect(pageObjectModelPage.modal).toBeHidden();

      await pageObjectModelPage.findOutMoreBtn.click();

      await pageObjectModelPage.modalCloseBtn.click();
      await expect(pageObjectModelPage.modal).toBeHidden();

      await pageObjectModelPage.findOutMoreBtn.click();

      await pageObjectModelPage.modalCloseIcon.click();
      await expect(pageObjectModelPage.modal).toBeHidden();
    });
  });

  test.describe("Our Products", () => {
    test("Verify Header", async ({ pageObjectModelPage }) => {
      await pageObjectModelPage.goToProducts();

      // Verify page header
      await expect(pageObjectModelPage.headerTitle).toContainText(/WebDriver/);
    });

    test("Verify Section Navigations", async ({ pageObjectModelPage }) => {
      await pageObjectModelPage.goToProducts();

      // Validate Home Navigation
      await pageObjectModelPage.goToHome();
      await expect(pageObjectModelPage.page).toHaveURL(/index/);

      await pageObjectModelPage.goBack();

      // Validate Contact Us Navigation
      await pageObjectModelPage.goToContact();
      await expect(pageObjectModelPage.page).toHaveURL(/contactus/);

      await pageObjectModelPage.goBack();

      // Validate Product Navigation
      await pageObjectModelPage.goToProducts();
      await expect(pageObjectModelPage.page).toHaveURL(/products/);
    });

    test("Verify Product Sections and modals", async ({ pageObjectModelPage }) => {
      await pageObjectModelPage.goToProducts();

      // Verify Product Section QTY = 8
      await expect(pageObjectModelPage.productSections).toHaveCount(8);

      // Add sections to an array of sections
      const sectionsBlocks = [
        pageObjectModelPage.productLink("Special Offers"),
        pageObjectModelPage.productLink("Cameras"),
        pageObjectModelPage.productLink("New Laptops"),
        pageObjectModelPage.productLink("Used Laptops"),
        pageObjectModelPage.productLink("Game Consoles"),
        pageObjectModelPage.productLink("Components"),
        pageObjectModelPage.productLink("Desktop Systems"),
        pageObjectModelPage.productLink("Audio")
      ];

      const modalContent = pageObjectModelPage.page.getByRole("paragraph").filter({
        hasText: `Please Note: All orders must be over the value of £50, adding additional coupon codes to the basket are excluded from this offer. To receive 30% off please add the following code to the basket: ${process.env.DISCOUNT}`
      });

      // Iterate on each block opening, closing and validating modals
      for (const block of sectionsBlocks) {
        await block.click();

        await expect(pageObjectModelPage.modal).toBeVisible();
        await expect(pageObjectModelPage.productsModalTitle).toBeVisible();
        await expect(modalContent).toBeVisible();

        await pageObjectModelPage.proceedButton.click();
        await expect(pageObjectModelPage.modal).toBeHidden();

        await block.click();
        await pageObjectModelPage.modalCloseBtn.click();
        await expect(pageObjectModelPage.modal).toBeHidden();

        await block.click();
        await pageObjectModelPage.modalCloseIcon.click();
        await expect(pageObjectModelPage.modal).toBeHidden();
      }
    });
  });

  test.describe("Contact Us", () => {
    test("Verify Contact Us navigation and Header", async ({ pageObjectModelPage }) => {
      await pageObjectModelPage.goToContact();

      await expect(pageObjectModelPage.page).toHaveURL(/contactus/);

      // Verify Header Title exists
      await expect(pageObjectModelPage.headerTitle).toContainText(/WebdriverUniversity.com/);
    });
  });
});
