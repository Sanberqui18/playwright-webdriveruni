/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { test, expect } from "@playwright/test";

test.describe("Page Object Model - Only path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Home", () => {
    test("Verify Page Object Model Page Header", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      await expect(pageObjectModelPage).toHaveURL(/Page-Object-Model/);

      // Verify Header Title exists
      const headerTitle = pageObjectModelPage.locator("#nav-title");
      await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
    });

    test("Verify Section Navigation", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      // Define all menu tab sections
      const homeTab = pageObjectModelPage.getByRole("link", { name: "Home" });
      const productsTab = pageObjectModelPage.getByRole("link", {
        name: "Our Products"
      });
      const contactTab = pageObjectModelPage.getByRole("link", {
        name: "Contact Us"
      });

      // Validate Product Navigation
      await productsTab.click();
      await expect(pageObjectModelPage).toHaveURL(/products/);

      await pageObjectModelPage.goBack();

      // Validate Contact Us Navigatio
      await contactTab.click();
      await expect(pageObjectModelPage).toHaveURL(/contactus/);

      await pageObjectModelPage.goBack();

      // Validate Home Navigatio
      await homeTab.click();
      await expect(pageObjectModelPage).toHaveURL(/index/);
    });

    test("Image Container list should work correctly", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      // Define image elements
      const imageSlides = pageObjectModelPage.locator(".item");
      const imageSelection = pageObjectModelPage
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

        console.log(imageIndex);
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

    test("Image Container buttons should work correctly", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      const imageSlides = pageObjectModelPage.locator(".item");
      const leftBttn = pageObjectModelPage.getByRole("link", { name: "" });
      const rightBttn = pageObjectModelPage.getByRole("link", { name: "" });

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
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

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
      const menu = pageObjectModelPage
        .getByRole("list")
        .nth(1)
        .getByRole("listitem");
      const sections = pageObjectModelPage.locator(".row .thumbnail");

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
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      const modal = pageObjectModelPage.locator("#myModal");
      const modalBttn = pageObjectModelPage.getByRole("button", {
        name: "Find Out More!"
      });
      const modalAcceptBttn = pageObjectModelPage
        .getByRole("button", { name: "Find Out More" })
        .nth(1);
      const modalCloseBttn = pageObjectModelPage.getByRole("button", {
        name: "Close"
      });
      const modalCloseIcon = pageObjectModelPage
        .getByRole("button")
        .filter({ has: pageObjectModelPage.locator(":scope.close") });
      const modalTitle = pageObjectModelPage.getByRole("heading", {
        name: "Welcome to webdriveruniversity.com"
      });
      const modalContent = pageObjectModelPage
        .getByRole("paragraph")
        .filter({ hasText: "Welcome to webdriveruniversity" });

      await modalBttn.click();

      await expect(modal).toBeVisible();
      await expect(modalTitle).toBeVisible();
      await expect(modalContent).toBeVisible();

      await modalAcceptBttn.click();
      await expect(modal).toBeHidden();

      await modalBttn.click();

      await modalCloseBttn.click();
      await expect(modal).toBeHidden();

      await modalBttn.click();

      await modalCloseIcon.click();
      await expect(modal).toBeHidden();
    });
  });

  test.describe("Our Products", () => {
    test("Verify Header", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      // Define Product Tab element and open tab
      const productsTab = pageObjectModelPage.getByRole("link", {
        name: "Our Products"
      });

      await productsTab.click();

      // Verify page header
      const headerTitle = pageObjectModelPage.locator("#nav-title");
      await expect(headerTitle).toContainText(/WebDriver/);
    });

    test("Verify Section Navigations", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      // Define all menu tab sections
      const homeTab = pageObjectModelPage.getByRole("link", { name: "Home" });
      const productsTab = pageObjectModelPage.getByRole("link", {
        name: "Our Products"
      });
      const contactTab = pageObjectModelPage.getByRole("link", {
        name: "Contact Us"
      });

      await productsTab.click();

      // Validate Home Navigatio
      await homeTab.click();
      await expect(pageObjectModelPage).toHaveURL(/index/);

      await pageObjectModelPage.goBack();

      // Validate Contact Us Navigatio
      await contactTab.click();
      await expect(pageObjectModelPage).toHaveURL(/contactus/);

      await pageObjectModelPage.goBack();

      // Validate Product Navigatio
      await productsTab.click();
      await expect(pageObjectModelPage).toHaveURL(/products/);
    });

    test("Verify Product Sections and modals", async ({ page }) => {
      // Navigate to the Page Objeect Model page in a separate Tab
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      // Define Product Tab element and open tab
      const productsTab = pageObjectModelPage.getByRole("link", {
        name: "Our Products"
      });

      await productsTab.click();

      // Verify Product Section QTY = 8
      const sections = pageObjectModelPage.locator(".thumbnail");
      await expect(sections).toHaveCount(8);

      // Define Sections
      const specialOffers = pageObjectModelPage.getByRole("link", {
        name: "Special Offers"
      });
      const cameras = pageObjectModelPage.getByRole("link", {
        name: "Cameras"
      });
      const newLaptops = pageObjectModelPage.getByRole("link", {
        name: "New Laptops"
      });
      const usedLaptops = pageObjectModelPage.getByRole("link", {
        name: "Used Laptops"
      });

      const gameConsoles = pageObjectModelPage.getByRole("link", {
        name: "Game Consoles"
      });
      const components = pageObjectModelPage.getByRole("link", {
        name: "Components"
      });
      const desktopSystems = pageObjectModelPage.getByRole("link", {
        name: "Desktop Systems"
      });
      const audio = pageObjectModelPage.getByRole("link", {
        name: "Audio"
      });

      // Define Modal Elements
      const modal = pageObjectModelPage.locator("#myModal");
      const modalProceedBttn = pageObjectModelPage.getByRole("button", {
        name: "Proceed"
      });
      const modalCloseBttn = pageObjectModelPage.getByRole("button", {
        name: "Close"
      });
      const modalCloseIcon = pageObjectModelPage
        .getByRole("button")
        .filter({ has: pageObjectModelPage.locator(":scope.close") });
      const modalTitle = pageObjectModelPage.getByRole("heading", {
        name: "Special Offer! - Get 30% off"
      });
      const modalContent = pageObjectModelPage.getByRole("paragraph").filter({
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

  test.describe("Contact Us", () => {
    test("Verify Contact Us navigation and Header", async ({ page }) => {
      const [pageObjectModelPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link").filter({ hasText: "PAGE OBJECT MODEL" }).click()
      ]);

      await pageObjectModelPage.waitForLoadState();

      // Define Product Tab element and open tab
      const contactTab = pageObjectModelPage.getByRole("link", {
        name: "Contact Us"
      });

      await contactTab.click();

      await expect(pageObjectModelPage).toHaveURL(/contactus/);

      // Verify Header Title exists
      const headerTitle = pageObjectModelPage.locator("#nav-title");
      await expect(headerTitle).toContainText(/WebdriverUniversity.com/);
    });
  });
});
