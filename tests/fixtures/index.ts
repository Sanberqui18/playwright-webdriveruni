import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { ActionsPage } from "../../pages/actions.page";
import { AjaxLoaderPage } from "../../pages/ajax.loader.page";
import { AutocompleteTextPage } from "../../pages/autocomplete.text.page";
import { ClickButtonsPage } from "../../pages/click.buttons.page";
import { ContactUsPage } from "../../pages/contact.us.page";
import { DataTablesButtonsPage } from "../../pages/data.tables.buttons.page";
import { DropdownButtonsPage } from "../../pages/dropdown.buttons.page";
import { FileUploadPage } from "../../pages/file.upload.page";
import { HiddenElementsPage } from "../../pages/hidden.elements.page";
import { IFramePage } from "../../pages/iframe.page";
import { LoginPortalPage } from "../../pages/login.portal.page";
import { PageObjectModelPage } from "../../pages/page.object.model.page";
import { PopupAlertsPage } from "../../pages/popup.alerts.page";
import { ScrollingAroundPage } from "../../pages/scrolling.around.page";
import { TextAffectsPage } from "../../pages/text.affects.page";
import { ToDoListPage } from "../../pages/to.do.list.page";

type AppFixtures = {
  homePage: HomePage;
  actionsPage: ActionsPage;
  ajaxLoaderPage: AjaxLoaderPage;
  autocompleteTextPage: AutocompleteTextPage;
  clickButtonsPage: ClickButtonsPage;
  contactUsPage: ContactUsPage;
  dataTablesButtonsPage: DataTablesButtonsPage;
  dropdownButtonsPage: DropdownButtonsPage;
  fileUploadPage: FileUploadPage;
  hiddenElementsPage: HiddenElementsPage;
  iframePage: IFramePage;
  loginPortalPage: LoginPortalPage;
  pageObjectModelPage: PageObjectModelPage;
  popupAlertsPage: PopupAlertsPage;
  scrollingAroundPage: ScrollingAroundPage;
  textAffectsPage: TextAffectsPage;
  toDoListPage: ToDoListPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto("/");
    await use(new HomePage(page));
  },

  actionsPage: async ({ homePage }, use) => {
    await use(await homePage.openActions());
  },

  ajaxLoaderPage: async ({ homePage }, use) => {
    await use(await homePage.openAjaxLoader());
  },

  autocompleteTextPage: async ({ homePage }, use) => {
    await use(await homePage.openAutocompleteText());
  },

  clickButtonsPage: async ({ homePage }, use) => {
    await use(await homePage.openButtonClicks());
  },

  contactUsPage: async ({ homePage }, use) => {
    await use(await homePage.openContactUs());
  },

  dataTablesButtonsPage: async ({ homePage }, use) => {
    await use(await homePage.openDataTables());
  },

  dropdownButtonsPage: async ({ homePage }, use) => {
    await use(await homePage.openDropdownButtons());
  },

  fileUploadPage: async ({ homePage }, use) => {
    await use(await homePage.openFileUpload());
  },

  hiddenElementsPage: async ({ homePage }, use) => {
    await use(await homePage.openHiddenElements());
  },

  iframePage: async ({ homePage }, use) => {
    await use(await homePage.openIFrame());
  },

  loginPortalPage: async ({ homePage }, use) => {
    await use(await homePage.openLoginPortal());
  },

  pageObjectModelPage: async ({ homePage }, use) => {
    await use(await homePage.openPageObjectModel());
  },

  popupAlertsPage: async ({ homePage }, use) => {
    await use(await homePage.openPopupAlerts());
  },

  scrollingAroundPage: async ({ homePage }, use) => {
    await use(await homePage.openScrollingAround());
  },

  textAffectsPage: async ({ homePage }, use) => {
    await use(await homePage.openTextAffects());
  },

  toDoListPage: async ({ homePage }, use) => {
    await use(await homePage.openToDoList());
  },
});

export { expect } from "@playwright/test";
