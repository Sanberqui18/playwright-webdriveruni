import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Iframe - Only Path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("IFrame Page", () => {
    test("Verify URL, frame existance and footer", async ({ page }) => {
      // Navigate to the IFrame Page page in a separate Tab
      const [iframePage] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .getByRole("link")
          .filter({ hasText: /IFRAME/ })
          .click()
      ]);

      await iframePage.waitForLoadState();

      // Verify page URL
      await expect(iframePage).toHaveURL(/IFrame/i);

      // Define elements
      const headerTitle = iframePage.getByRole("navigation");
      const footer = iframePage.getByRole("paragraph").last();

      // Define iFrame elements
      const iFrame = iframePage.frameLocator("#frame");
      const iFrameBody = iFrame.locator("body");

      // Verify element values
      await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
      await expect(footer).toContainText("Copyright");

      //Verify Iframe Exists
      await expect(iFrameBody).toBeAttached();
      await expect(iFrameBody).toBeVisible();
      await expect(iFrameBody).toBeInViewport();
    });

    test.describe("IFrame -Home", () => {
      test.use({
        viewport: {
          width: 1600,
          height: 850
        }
      });
      test("Verify Section Navigation", async ({ page }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define all menu tab sections
        const homeTab = iFrame.getByRole("link", {
          name: "Home"
        });
        const productsTab = iFrame.getByRole("link", {
          name: "Our Products"
        });
        const contactTab = iFrame.getByRole("link", {
          name: "Contact Us"
        });

        // Define each tab elements
        const homeSection = iFrame
          .getByRole("paragraph")
          .filter({ hasText: "Who Are We?" });
        const productSection = iFrame.getByRole("link", {
          name: "Special Offers"
        });
        const contactTitle = iFrame.getByRole("heading", {
          name: "CONTACT US"
        });

        // Verify initial state
        await expect(homeSection).toBeVisible();
        await expect(productSection).not.toBeAttached();
        await expect(contactTitle).not.toBeAttached();

        // Validate Product Navigation
        await productsTab.click();

        await expect(homeSection).not.toBeAttached();
        await expect(productSection).toBeVisible();
        await expect(contactTitle).not.toBeAttached();

        // Validate Contact Us Navigation
        await contactTab.click();

        await expect(homeSection).not.toBeAttached();
        await expect(productSection).not.toBeAttached();
        await expect(contactTitle).toBeVisible();
      });

      test("Image Container list should work correctly", async ({ page }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define image elements
        const imageSlides = iFrame.locator(".item");
        const imageSelection = iFrame
          .getByRole("list")
          .nth(0)
          .getByRole("listitem");

        // Verify Image Slides and Selection count
        await expect(imageSlides).toHaveCount(3);
        await expect(imageSelection).toHaveCount(3);

        const imageCount = (await imageSlides.count()) - 1;

        // Verify image selection and slides when clicking on all options
        for (let imageIndex = 0; imageIndex <= imageCount; imageIndex++) {
          const imageSlide = imageSlides.nth(imageIndex);
          const imageDot = imageSelection.nth(imageIndex);

          // Inital state verify the other selections are not active
          if (imageIndex == 0) {
            await expect(imageSlides.nth(imageIndex + 1)).not.toHaveClass(
              "active"
            );
            await expect(imageSelection.nth(imageIndex + 1)).not.toHaveClass(
              "active"
            );
            await expect(imageSlides.nth(imageIndex + 2)).not.toHaveClass(
              "active"
            );
            await expect(imageSelection.nth(imageIndex + 2)).not.toHaveClass(
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

      test("Image Container buttons should work correctly", async ({
        page
      }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        const imageSlides = iFrame.locator(".item");
        const leftBttn = iFrame.getByRole("link", { name: "" });
        const rightBttn = iFrame.getByRole("link", {
          name: ""
        });

        await expect(imageSlides).toHaveCount(3);

        await expect(imageSlides.nth(0)).toHaveClass("item active");
        await expect(imageSlides.nth(1)).not.toHaveClass("item active");
        await expect(imageSlides.nth(2)).not.toHaveClass("item active");

        await rightBttn.click();
        await expect(imageSlides.nth(0)).not.toHaveClass("item active");
        await expect(imageSlides.nth(1)).toHaveClass("item active");
        await expect(imageSlides.nth(2)).not.toHaveClass("item active");

        await rightBttn.click();
        await expect(imageSlides.nth(0)).not.toHaveClass("item active");
        await expect(imageSlides.nth(1)).not.toHaveClass("item active");
        await expect(imageSlides.nth(2)).toHaveClass("item active");

        await leftBttn.click();
        await expect(imageSlides.nth(0)).not.toHaveClass("item active");
        await expect(imageSlides.nth(1)).toHaveClass("item active");
        await expect(imageSlides.nth(2)).not.toHaveClass("item active");

        await leftBttn.click();
        await expect(imageSlides.nth(0)).toHaveClass("item active");
        await expect(imageSlides.nth(1)).not.toHaveClass("item active");
        await expect(imageSlides.nth(2)).not.toHaveClass("item active");
      });

      test("Verify Section Qty, titles, stars, buttons and texts", async ({
        page
      }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

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

        // Define web element sections
        const menu = iFrame.getByRole("list").nth(1).getByRole("listitem");
        const sections = iFrame.locator(".row .thumbnail");

        // Validate Menu QTY = 3 and Values
        await expect(menu).toHaveCount(3);
        await expect(menu).toHaveText(menuValues);

        // Validate Section QTY = 4 and Values
        await expect(sections).toHaveCount(4);

        for (const [index, section] of sectionContents.entries()) {
          // Define each section title and Content
          const sectionTitle = sections.locator(".sub-heading").nth(index);
          const sectionContent = sections.locator(".caption").nth(index);

          // Verify Title and Content matches the expected values
          await expect(sectionTitle).toHaveText(section.title);
          await expect(sectionContent).toContainText(section.body);

          // If section has starts, valudate count
          if (section.stars) {
            const sectionStars = sections.nth(index).locator(".glyphicon-star");
            expect(await sectionStars.count()).toBe(section.starCount);
          }
        }
      });

      test("Verify modal contents and buttons", async ({ page }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        const modal = iFrame.locator("#myModal");
        const modalBttn = iFrame.getByRole("button", {
          name: "Find Out More!"
        });
        const modalAcceptBttn = iFrame
          .getByRole("button", { name: "Find Out More" })
          .nth(1);
        const modalCloseBttn = iFrame.getByRole("button", {
          name: "Close"
        });
        const modalCloseIcon = iFrame
          .getByRole("button")
          .filter({ has: iFrame.locator(":scope.close") });
        const modalTitle = iFrame.getByRole("heading", {
          name: "Welcome to webdriveruniversity.com"
        });
        const modalContent = iFrame
          .getByRole("paragraph")
          .filter({ hasText: "Welcome to webdriveruniversity" });

        await modalBttn.click();

        await expect(modal).toBeVisible();
        await expect(modalTitle).toBeVisible();
        await expect(modalContent).toBeVisible();

        await modal.scrollIntoViewIfNeeded();
        await modalAcceptBttn.click();
        await expect(modal).toBeHidden();

        await modalBttn.click();

        await modal.scrollIntoViewIfNeeded();
        await modalCloseBttn.click();
        await expect(modal).toBeHidden();

        await modalBttn.click();

        await modal.scrollIntoViewIfNeeded();
        await modalCloseIcon.click();
        await expect(modal).toBeHidden();
      });
    });
  });

  test.describe("IFrame - Our Products", () => {
    test("Verify Header", async ({ page }) => {
      // Navigate to the IFrame Page page in a separate Tab
      const [iframePage] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .getByRole("link")
          .filter({ hasText: /IFRAME/ })
          .click()
      ]);

      await iframePage.waitForLoadState();

      // Define iFrame elements
      const iFrame = iframePage.frameLocator("#frame");

      // Define Product Tab element and open tab
      const productsTab = iFrame.getByRole("link", {
        name: "Our Products"
      });

      await productsTab.click();

      // Verify page header
      const headerTitle = iFrame.locator("#nav-title");
      await expect(headerTitle).toContainText(/WebDriver/);
    });

    test("Verify Section Navigations", async ({ page }) => {
      // Navigate to the IFrame Page page in a separate Tab
      const [iframePage] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .getByRole("link")
          .filter({ hasText: /IFRAME/ })
          .click()
      ]);

      await iframePage.waitForLoadState();

      // Define iFrame elements
      const iFrame = iframePage.frameLocator("#frame");

      // Define all menu tab sections
      const homeTab = iFrame.getByRole("link", {
        name: "Home"
      });
      const productsTab = iFrame.getByRole("link", {
        name: "Our Products"
      });
      const contactTab = iFrame.getByRole("link", {
        name: "Contact Us"
      });

      // Define each tab elements
      const homeSection = iFrame
        .getByRole("paragraph")
        .filter({ hasText: "Who Are We?" });
      const productSection = iFrame.getByRole("link", {
        name: "Special Offers"
      });
      const contactTitle = iFrame.getByRole("heading", { name: "CONTACT US" });

      // Open contact section
      await productsTab.click();

      // Verify initial state
      await expect(homeSection).not.toBeVisible();
      await expect(productSection).toBeAttached();
      await expect(contactTitle).not.toBeAttached();

      // Validate Product Navigation
      await homeTab.click();

      await expect(homeSection).toBeVisible();
      await expect(productSection).not.toBeAttached();
      await expect(contactTitle).not.toBeAttached();

      // Validate Contact Us Navigation
      await contactTab.click();

      await expect(homeSection).not.toBeAttached();
      await expect(productSection).not.toBeAttached();
      await expect(contactTitle).toBeVisible();
    });

    test("Verify Product Sections and modals", async ({ page }) => {
      // Navigate to the IFrame Page page in a separate Tab
      const [iframePage] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .getByRole("link")
          .filter({ hasText: /IFRAME/ })
          .click()
      ]);

      await iframePage.waitForLoadState();

      // Define iFrame elements
      const iFrame = iframePage.frameLocator("#frame");

      // Define Product Tab element and open tab
      const productsTab = iFrame.getByRole("link", {
        name: "Our Products"
      });

      await productsTab.click();

      // Verify Product Section QTY = 8
      const sections = iFrame.locator(".thumbnail");
      await expect(sections).toHaveCount(8);

      // Define Sections
      const specialOffers = iFrame.getByRole("link", {
        name: "Special Offers"
      });
      const cameras = iFrame.getByRole("link", {
        name: "Cameras"
      });
      const newLaptops = iFrame.getByRole("link", {
        name: "New Laptops"
      });
      const usedLaptops = iFrame.getByRole("link", {
        name: "Used Laptops"
      });

      const gameConsoles = iFrame.getByRole("link", {
        name: "Game Consoles"
      });
      const components = iFrame.getByRole("link", {
        name: "Components"
      });
      const desktopSystems = iFrame.getByRole("link", {
        name: "Desktop Systems"
      });
      const audio = iFrame.getByRole("link", {
        name: "Audio"
      });

      // Define Modal Elements
      const modal = iFrame.locator("#myModal");
      const modalProceedBttn = iFrame.getByRole("button", {
        name: "Proceed"
      });
      const modalCloseBttn = iFrame.getByRole("button", {
        name: "Close"
      });
      const modalCloseIcon = iFrame
        .getByRole("button")
        .filter({ has: iFrame.locator(":scope.close") });
      const modalTitle = iFrame.getByRole("heading", {
        name: "Special Offer! - Get 30% off"
      });
      const modalContent = iFrame.getByRole("paragraph").filter({
        hasText: `Please Note: All orders must be over the value of £50, adding additional coupon codes to the basket are excluded from this offer. To receive 30% off please add the following code to the basket: ${process.env.DISCOUNT}`
      });

      // Add sections to an array of sections
      const sectionsBlocks = [
        specialOffers,
        cameras,
        newLaptops,
        usedLaptops,
        gameConsoles,
        components,
        desktopSystems,
        audio
      ];

      // Iterate on each block opening, closing and validating modals
      for (const block of sectionsBlocks) {
        await block.click();

        await expect(modal).toBeVisible();
        await expect(modalTitle).toBeVisible();
        await expect(modalContent).toBeVisible();

        await modalProceedBttn.click();
        await expect(modal).toBeHidden();

        await block.click();
        await modalCloseBttn.click();
        await expect(modal).toBeHidden();

        await block.click();
        await modalCloseIcon.click();
        await expect(modal).toBeHidden();
      }
    });
  });

  test.describe("IFrame - Contact Us", () => {
    test.describe("IFrame - Contact Us - Happy Path", () => {
      test("Verify Contact US Page Header", async ({ page }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Verify Header Title exists
        const headerTitle = iFrame.locator("#nav-title");
        await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
      });

      test("Submit Form with all fields should work", async ({ page }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define Product Tab element and open tab
        const contactTab = iFrame.getByRole("link", {
          name: "Contact US"
        });

        await contactTab.click();

        //Set Values for Input fields
        const firstNameField = iFrame.getByPlaceholder("First Name");
        const lastNameField = iFrame.getByPlaceholder("Last Name");
        const emailField = iFrame.getByPlaceholder("Email Address");
        const commentsField = iFrame.getByPlaceholder("Comments");

        // Fill all Fields
        await firstNameField.fill(faker.person.firstName());
        await lastNameField.fill(faker.person.lastName());
        await emailField.fill(
          faker.internet.email({ firstName: faker.person.firstName() })
        );
        await commentsField.fill(faker.lorem.paragraph(3));

        // Submit form
        const submitBttn = iFrame.getByRole("button", {
          name: /submit/i
        });
        await submitBttn.click();

        // Verify Success message form
        const successMessage = iFrame.getByRole("heading", {
          name: "Thank You for your Message!"
        });

        await expect(successMessage).toBeVisible();

        //Verify Animation Exist and is Correct
        const animation = iFrame.locator("#fountainG");
        const animationDots = iFrame.locator("#fountainG > .fountainG");

        await expect(animation).toBeVisible();
        await expect(animationDots).toHaveCount(8);
      });

      test("Reset form field should blank all of them", async ({ page }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define Product Tab element and open tab
        const contactTab = iFrame.getByRole("link", {
          name: "Contact US"
        });

        await contactTab.click();

        //Set Values for Input fields
        const firstNameField = iFrame.getByPlaceholder("First Name");
        const lastNameField = iFrame.getByPlaceholder("Last Name");
        const emailField = iFrame.getByPlaceholder("Email Address");
        const commentsField = iFrame.getByPlaceholder("Comments");

        // Fill all Fields
        await firstNameField.fill(faker.person.firstName());
        await lastNameField.fill(faker.person.lastName());
        await emailField.fill(
          faker.internet.email({ firstName: faker.person.firstName() })
        );
        await commentsField.fill(faker.lorem.paragraph(3));

        //Reset fields and verify they should be blank
        const resetBttn = iFrame.getByRole("button", { name: /reset/i });
        await resetBttn.click();

        await expect(firstNameField).toHaveText("");
        await expect(lastNameField).toHaveText("");
        await expect(emailField).toHaveText("");
        await expect(commentsField).toHaveText("");
      });
    });

    test.describe("IFrame - Contact Us - Unhappy Path", () => {
      test("Submit Form without Filling any data should show an error", async ({
        page
      }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define Product Tab element and open tab
        const contactTab = iFrame.getByRole("link", {
          name: "Contact US"
        });

        await contactTab.click();

        // Submit empty form
        const submitBttn = iFrame.getByRole("button", {
          name: /submit/i
        });
        await submitBttn.click();

        //Define page errors to validate
        const errors = iFrame.locator("body");
        const errorLength = iFrame.locator("body > br");

        //Validate error QTY and texts
        await expect(errorLength).toHaveCount(2);
        await expect(errors).toContainText("all fields are required");
        await expect(errors).toContainText("Invalid email address");
      });

      test("Submit form without any field should show an error", async ({
        page
      }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define Product Tab element and open tab
        const contactTab = iFrame.getByRole("link", {
          name: "Contact US"
        });

        await contactTab.click();

        //Set Values for Input fields
        const firstNameField = iFrame.getByPlaceholder("First Name");
        const lastNameField = iFrame.getByPlaceholder("Last Name");
        const emailField = iFrame.getByPlaceholder("Email Address");
        const commentsField = iFrame.getByPlaceholder("Comments");

        // Fill First Name
        await firstNameField.fill(faker.person.firstName());

        // Submit Form
        const submitBttn = iFrame.getByRole("button", {
          name: /submit/i
        });
        await submitBttn.click();

        //Define page errors to validate
        const errors = iFrame.locator("body");
        const errorLength = iFrame.locator("body > br");

        //Validate error QTY and texts
        await expect(errorLength).toHaveCount(2);
        await expect(errors).toContainText("all fields are required");
        await expect(errors).toContainText("Invalid email address");

        // Go back to the Contact Us Page
        await iframePage.reload();
        await contactTab.click();

        // Fill Last Name
        await lastNameField.fill(faker.person.lastName());

        // Submit Form
        await submitBttn.click();

        // Validate error QTY and texts
        await expect(errorLength).toHaveCount(2);
        await expect(errors).toContainText("all fields are required");
        await expect(errors).toContainText("Invalid email address");

        // Go back to the Contact Us Page
        await iframePage.reload();
        await contactTab.click();

        // Fill Email Field with a valid Email
        await emailField.fill(
          faker.internet.email({ firstName: faker.person.firstName() })
        );

        // Submit Form
        await submitBttn.click();

        // Validate error QTY and texts
        await expect(errorLength).toHaveCount(1);
        await expect(errors).toContainText("all fields are required");
        await expect(errors).not.toContainText("Invalid email address");

        // Go back to the Contact Us Page
        await iframePage.reload();
        await contactTab.click();

        // Fill Comments Field with a valid Email
        await commentsField.fill(faker.lorem.paragraph(3));

        // Submit Form
        await submitBttn.click();

        // Validate error QTY and texts
        await expect(errorLength).toHaveCount(2);
        await expect(errors).toContainText("all fields are required");
        await expect(errors).toContainText("Invalid email address");
      });

      test("Submit all data without a valid email should show the email error", async ({
        page
      }) => {
        // Navigate to the IFrame Page page in a separate Tab
        const [iframePage] = await Promise.all([
          page.waitForEvent("popup"),
          page
            .getByRole("link")
            .filter({ hasText: /IFRAME/ })
            .click()
        ]);

        await iframePage.waitForLoadState();

        // Define iFrame elements
        const iFrame = iframePage.frameLocator("#frame");

        // Define Product Tab element and open tab
        const contactTab = iFrame.getByRole("link", {
          name: "Contact US"
        });

        await contactTab.click();

        // Set Values for Input fields
        const firstNameField = iFrame.getByPlaceholder("First Name");
        const lastNameField = iFrame.getByPlaceholder("Last Name");
        const emailField = iFrame.getByPlaceholder("Email Address");
        const commentsField = iFrame.getByPlaceholder("Comments");

        // Fill all Fields (Invalid Email)
        await firstNameField.fill(faker.person.firstName());
        await lastNameField.fill(faker.person.lastName());
        await emailField.fill(faker.person.middleName());
        await commentsField.fill(faker.lorem.paragraph(3));

        // Submit form
        const submitBttn = iFrame.getByRole("button", {
          name: /submit/i
        });
        await submitBttn.click();

        // Define page errors to validate
        const errors = iFrame.locator("body");
        const errorLength = iFrame.locator("body > br");

        // Validate error QTY and texts
        await expect(errorLength).toHaveCount(1);
        await expect(errors).not.toContainText("all fields are required");
        await expect(errors).toContainText("Invalid email address");
      });
    });
  });
});
