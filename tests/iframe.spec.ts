/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";

test.describe("Iframe - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("IFrame Page", () => {
    test("Verify URL, frame existance and footer", async ({ page }) => {
      const homePage = new HomePage(page);
      const iframePage = await homePage.openIFrame();

      // Verify page URL
      await expect(iframePage.page).toHaveURL(/IFrame/i);

      // Verify element values
      await expect(iframePage.outerNavTitle).toContainText(/WebdriverUniversity.com/);
      await expect(iframePage.outerFooter).toContainText("Copyright");

      //Verify Iframe Exists
      await expect(iframePage.frameBody).toBeAttached();
      await expect(iframePage.frameBody).toBeVisible();
      await expect(iframePage.frameBody).toBeInViewport();
    });

    test.describe("IFrame - Home", () => {
      test.use({
        viewport: {
          width: 1600,
          height: 850
        }
      });

      test("Verify Section Navigation", async ({ page }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        // Verify initial state
        await expect(iframePage.homeSection).toBeVisible();
        await expect(iframePage.productSection).not.toBeAttached();
        await expect(iframePage.contactTitle).not.toBeAttached();

        // Validate Product Navigation
        await iframePage.productsTab.click();

        await expect(iframePage.homeSection).not.toBeAttached();
        await expect(iframePage.productSection).toBeVisible();
        await expect(iframePage.contactTitle).not.toBeAttached();

        // Validate Contact Us Navigation
        await iframePage.contactTab.click();

        await expect(iframePage.homeSection).not.toBeAttached();
        await expect(iframePage.productSection).not.toBeAttached();
        await expect(iframePage.contactTitle).toBeVisible();
      });

      test("Image Container list should work correctly", async ({ page }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        // Verify Image Slides and Selection count
        await expect(iframePage.imageSlides).toHaveCount(3);
        await expect(iframePage.imageDots).toHaveCount(3);

        const imageCount = (await iframePage.imageSlides.count()) - 1;

        // Verify image selection and slides when clicking on all options
        for (let imageIndex = 0; imageIndex <= imageCount; imageIndex++) {
          const imageSlide = iframePage.imageSlides.nth(imageIndex);
          const imageDot = iframePage.imageDots.nth(imageIndex);

          // Inital state verify the other selections are not active
          if (imageIndex == 0) {
            await expect(iframePage.imageSlides.nth(imageIndex + 1)).not.toHaveClass("active");
            await expect(iframePage.imageDots.nth(imageIndex + 1)).not.toHaveClass("active");
            await expect(iframePage.imageSlides.nth(imageIndex + 2)).not.toHaveClass("active");
            await expect(iframePage.imageDots.nth(imageIndex + 2)).not.toHaveClass("active");
          }
          // Chose selection
          await imageDot.click();

          // Verify image and selection has active class
          await expect(imageDot).toHaveClass("active");
          await expect(imageSlide).toHaveClass("item active");
        }
      });

      test("Image Container buttons should work correctly", async ({
        page
      }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await expect(iframePage.imageSlides).toHaveCount(3);

        await expect(iframePage.imageSlides.nth(0)).toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(1)).not.toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(2)).not.toHaveClass("item active");

        await iframePage.carouselRight.click();
        await expect(iframePage.imageSlides.nth(0)).not.toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(1)).toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(2)).not.toHaveClass("item active");

        await iframePage.carouselRight.click();
        await expect(iframePage.imageSlides.nth(0)).not.toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(1)).not.toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(2)).toHaveClass("item active");

        await iframePage.carouselLeft.click();
        await expect(iframePage.imageSlides.nth(0)).not.toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(1)).toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(2)).not.toHaveClass("item active");

        await iframePage.carouselLeft.click();
        await expect(iframePage.imageSlides.nth(0)).toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(1)).not.toHaveClass("item active");
        await expect(iframePage.imageSlides.nth(2)).not.toHaveClass("item active");
      });

      test("Verify Section Qty, titles, stars, buttons and texts", async ({
        page
      }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

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
        await expect(iframePage.navMenu).toHaveCount(3);
        await expect(iframePage.navMenu).toHaveText(menuValues);

        // Validate Section QTY = 4 and Values
        await expect(iframePage.thumbnails).toHaveCount(4);

        for (const [index, section] of sectionContents.entries()) {
          const sectionTitle = iframePage.thumbnails.locator(".sub-heading").nth(index);
          const sectionContent = iframePage.thumbnails.locator(".caption").nth(index);

          await expect(sectionTitle).toHaveText(section.title);
          await expect(sectionContent).toContainText(section.body);

          if (section.stars) {
            const sectionStars = iframePage.thumbnails.nth(index).locator(".glyphicon-star");
            expect(await sectionStars.count()).toBe(section.starCount);
          }
        }
      });

      test("Verify modal contents and buttons", async ({ page }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await iframePage.findOutMoreBtn.click();

        await expect(iframePage.homeModal).toBeVisible();
        await expect(iframePage.homeModalTitle).toBeVisible();
        await expect(iframePage.homeModalContent).toBeVisible();

        await iframePage.homeModal.scrollIntoViewIfNeeded();
        await iframePage.homeModalAcceptBtn.click();
        await expect(iframePage.homeModal).toBeHidden();

        await iframePage.findOutMoreBtn.click();

        await iframePage.homeModal.scrollIntoViewIfNeeded();
        await iframePage.homeModalCloseBtn.click();
        await expect(iframePage.homeModal).toBeHidden();

        await iframePage.findOutMoreBtn.click();

        await iframePage.homeModal.scrollIntoViewIfNeeded();
        await iframePage.homeModalCloseIcon.click();
        await expect(iframePage.homeModal).toBeHidden();
      });
    });
  });

  test.describe("IFrame - Our Products", () => {
    test("Verify Header", async ({ page }) => {
      const homePage = new HomePage(page);
      const iframePage = await homePage.openIFrame();

      await iframePage.productsTab.click();

      // Verify page header
      await expect(iframePage.productHeaderTitle).toContainText(/WebDriver/);
    });

    test("Verify Section Navigations", async ({ page }) => {
      const homePage = new HomePage(page);
      const iframePage = await homePage.openIFrame();

      // Open contact section
      await iframePage.productsTab.click();

      // Verify initial state
      await expect(iframePage.homeSection).toBeHidden();
      await expect(iframePage.productSection).toBeAttached();
      await expect(iframePage.contactTitle).not.toBeAttached();

      // Validate Home Navigation
      await iframePage.homeTab.click();

      await expect(iframePage.homeSection).toBeVisible();
      await expect(iframePage.productSection).not.toBeAttached();
      await expect(iframePage.contactTitle).not.toBeAttached();

      // Validate Contact Us Navigation
      await iframePage.contactTab.click();

      await expect(iframePage.homeSection).not.toBeAttached();
      await expect(iframePage.productSection).not.toBeAttached();
      await expect(iframePage.contactTitle).toBeVisible();
    });

    test("Verify Product Sections and modals", async ({ page }) => {
      const homePage = new HomePage(page);
      const iframePage = await homePage.openIFrame();

      await iframePage.productsTab.click();

      // Verify Product Section QTY = 8
      await expect(iframePage.productThumbnails).toHaveCount(8);

      // Add sections to an array of sections
      const sectionsBlocks = [
        iframePage.productLink("Special Offers"),
        iframePage.productLink("Cameras"),
        iframePage.productLink("New Laptops"),
        iframePage.productLink("Used Laptops"),
        iframePage.productLink("Game Consoles"),
        iframePage.productLink("Components"),
        iframePage.productLink("Desktop Systems"),
        iframePage.productLink("Audio")
      ];

      const modalContent = iframePage.frame.getByRole("paragraph").filter({
        hasText: `Please Note: All orders must be over the value of £50, adding additional coupon codes to the basket are excluded from this offer. To receive 30% off please add the following code to the basket: ${process.env.DISCOUNT}`
      });

      // Iterate on each block opening, closing and validating modals
      for (const block of sectionsBlocks) {
        await block.click();

        await expect(iframePage.productModal).toBeVisible();
        await expect(iframePage.productModalTitle).toBeVisible();
        await expect(modalContent).toBeVisible();

        await iframePage.productProceedBtn.click();
        await expect(iframePage.productModal).toBeHidden();

        await block.click();
        await iframePage.productCloseBtn.click();
        await expect(iframePage.productModal).toBeHidden();

        await block.click();
        await iframePage.productCloseIcon.click();
        await expect(iframePage.productModal).toBeHidden();
      }
    });
  });

  test.describe("IFrame - Contact Us", () => {
    test.describe("IFrame - Contact Us - Happy Path", () => {
      test("Verify Contact US Page Header", async ({ page }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        // Verify Header Title exists (displayed on home tab by default)
        const headerTitle = iframePage.frame.locator("#nav-title");
        await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
      });

      test("Submit Form with all fields should work", async ({ page }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await iframePage.contactTab.click();

        // Fill all Fields
        await iframePage.fillContactForm(
          faker.person.firstName(),
          faker.person.lastName(),
          faker.internet.email({ firstName: faker.person.firstName() }),
          faker.lorem.paragraph(3)
        );

        // Submit form
        await iframePage.contactSubmitBtn.click();

        // Verify Success message form
        await expect(iframePage.contactSuccess).toBeVisible();

        //Verify Animation Exist and is Correct
        await expect(iframePage.contactAnimation).toBeVisible();
        await expect(iframePage.contactAnimationDots).toHaveCount(8);
      });

      test("Reset form field should blank all of them", async ({ page }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await iframePage.contactTab.click();

        // Fill all Fields
        await iframePage.fillContactForm(
          faker.person.firstName(),
          faker.person.lastName(),
          faker.internet.email({ firstName: faker.person.firstName() }),
          faker.lorem.paragraph(3)
        );

        //Reset fields and verify they should be blank
        await iframePage.contactResetBtn.click();

        await expect(iframePage.contactFirstName).toHaveText("");
        await expect(iframePage.contactLastName).toHaveText("");
        await expect(iframePage.contactEmail).toHaveText("");
        await expect(iframePage.contactComments).toHaveText("");
      });
    });

    test.describe("IFrame - Contact Us - Unhappy Path", () => {
      test("Submit Form without Filling any data should show an error", async ({
        page
      }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await iframePage.contactTab.click();

        // Submit empty form
        await iframePage.contactSubmitBtn.click();

        //Validate error QTY and texts
        await expect(iframePage.contactErrorBreaks).toHaveCount(2);
        await expect(iframePage.contactBodyErrors).toContainText("all fields are required");
        await expect(iframePage.contactBodyErrors).toContainText("Invalid email address");
      });

      test("Submit form without any field should show an error", async ({
        page
      }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await iframePage.contactTab.click();

        // Fill First Name
        await iframePage.contactFirstName.fill(faker.person.firstName());

        // Submit Form
        await iframePage.contactSubmitBtn.click();

        //Validate error QTY and texts
        await expect(iframePage.contactErrorBreaks).toHaveCount(2);
        await expect(iframePage.contactBodyErrors).toContainText("all fields are required");
        await expect(iframePage.contactBodyErrors).toContainText("Invalid email address");

        // Reload and go back to Contact Us
        await iframePage.reloadAndOpenContact();

        // Fill Last Name
        await iframePage.contactLastName.fill(faker.person.lastName());

        // Submit Form
        await iframePage.contactSubmitBtn.click();

        // Validate error QTY and texts
        await expect(iframePage.contactErrorBreaks).toHaveCount(2);
        await expect(iframePage.contactBodyErrors).toContainText("all fields are required");
        await expect(iframePage.contactBodyErrors).toContainText("Invalid email address");

        // Reload and go back to Contact Us
        await iframePage.reloadAndOpenContact();

        // Fill Email Field with a valid Email
        await iframePage.contactEmail.fill(
          faker.internet.email({ firstName: faker.person.firstName() })
        );

        // Submit Form
        await iframePage.contactSubmitBtn.click();

        // Validate error QTY and texts
        await expect(iframePage.contactErrorBreaks).toHaveCount(1);
        await expect(iframePage.contactBodyErrors).toContainText("all fields are required");
        await expect(iframePage.contactBodyErrors).not.toContainText("Invalid email address");

        // Reload and go back to Contact Us
        await iframePage.reloadAndOpenContact();

        // Fill Comments Field
        await iframePage.contactComments.fill(faker.lorem.paragraph(3));

        // Submit Form
        await iframePage.contactSubmitBtn.click();

        // Validate error QTY and texts
        await expect(iframePage.contactErrorBreaks).toHaveCount(2);
        await expect(iframePage.contactBodyErrors).toContainText("all fields are required");
        await expect(iframePage.contactBodyErrors).toContainText("Invalid email address");
      });

      test("Submit all data without a valid email should show the email error", async ({
        page
      }) => {
        const homePage = new HomePage(page);
        const iframePage = await homePage.openIFrame();

        await iframePage.contactTab.click();

        // Fill all Fields (Invalid Email)
        await iframePage.fillContactForm(
          faker.person.firstName(),
          faker.person.lastName(),
          faker.person.middleName(),
          faker.lorem.paragraph(3)
        );

        // Submit form
        await iframePage.contactSubmitBtn.click();

        // Validate error QTY and texts
        await expect(iframePage.contactErrorBreaks).toHaveCount(1);
        await expect(iframePage.contactBodyErrors).not.toContainText("all fields are required");
        await expect(iframePage.contactBodyErrors).toContainText("Invalid email address");
      });
    });
  });
});
