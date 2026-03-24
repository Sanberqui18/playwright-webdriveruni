import { Page } from "@playwright/test";
import { ContactUsPage } from "./contact.us.page";
import { LoginPortalPage } from "./login.portal.page";
import { ClickButtonsPage } from "./click.buttons.page";
import { ToDoListPage } from "./to.do.list.page";
import { PageObjectModelPage } from "./page.object.model.page";
import { TextAffectsPage } from "./text.affects.page";
import { DropdownButtonsPage } from "./dropdown.buttons.page";
import { AjaxLoaderPage } from "./ajax.loader.page";
import { ActionsPage } from "./actions.page";
import { ScrollingAroundPage } from "./scrolling.around.page";
import { PopupAlertsPage } from "./popup.alerts.page";
import { IFramePage } from "./iframe.page";
import { HiddenElementsPage } from "./hidden.elements.page";
import { DataTablesButtonsPage } from "./data.tables.buttons.page";
import { AutocompleteTextPage } from "./autocomplete.text.page";
import { FileUploadPage } from "./file.upload.page";

export class HomePage {
  constructor(readonly page: Page) {}

  // --- Locators ---
  get navTitle() {
    return this.page.locator("#nav-title");
  }

  get pageSections() {
    return this.page.locator(".thumbnail > .section-title");
  }

  get courseLinks() {
    return this.page.locator('#udemy-promo-thumbnail').getByRole('link');
  }

  get discountHeading() {
    return this.page.getByRole('heading', { name: '🚀 Unlock Your Potential:' });
  }

  // --- Navigation ---
  async goto() {
    await this.page.goto("/");
  }

  private async openPopup(linkText: string | RegExp): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page.getByRole("link").filter({ hasText: linkText }).click()
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async openContactUs(): Promise<ContactUsPage> {
    const popup = await this.openPopup("CONTACT US");
    return new ContactUsPage(popup);
  }

  async openLoginPortal(): Promise<LoginPortalPage> {
    const popup = await this.openPopup("LOGIN PORTAL");
    return new LoginPortalPage(popup);
  }

  async openButtonClicks(): Promise<ClickButtonsPage> {
    const popup = await this.openPopup("BUTTON CLICKS");
    return new ClickButtonsPage(popup);
  }

  async openToDoList(): Promise<ToDoListPage> {
    const popup = await this.openPopup("TO DO LIST");
    return new ToDoListPage(popup);
  }

  async openPageObjectModel(): Promise<PageObjectModelPage> {
    const popup = await this.openPopup("PAGE OBJECT MODEL");
    return new PageObjectModelPage(popup);
  }

  async openTextAffects(): Promise<TextAffectsPage> {
    const popup = await this.openPopup("ACCORDION & TEXT AFFECTS");
    return new TextAffectsPage(popup);
  }

  async openDropdownButtons(): Promise<DropdownButtonsPage> {
    const popup = await this.openPopup(
      "DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S)"
    );
    return new DropdownButtonsPage(popup);
  }

  async openAjaxLoader(): Promise<AjaxLoaderPage> {
    const popup = await this.openPopup("AJAX LOADER");
    return new AjaxLoaderPage(popup);
  }

  async openActions(): Promise<ActionsPage> {
    const popup = await this.openPopup(/ACTIONS/);
    return new ActionsPage(popup);
  }

  async openScrollingAround(): Promise<ScrollingAroundPage> {
    const popup = await this.openPopup("SCROLLING AROUND");
    return new ScrollingAroundPage(popup);
  }

  async openPopupAlerts(): Promise<PopupAlertsPage> {
    const popup = await this.openPopup(/POPUP & ALERTS/);
    return new PopupAlertsPage(popup);
  }

  async openIFrame(): Promise<IFramePage> {
    const popup = await this.openPopup(/IFRAME/);
    return new IFramePage(popup);
  }

  async openHiddenElements(): Promise<HiddenElementsPage> {
    const popup = await this.openPopup("HIDDEN ELEMENTS");
    return new HiddenElementsPage(popup);
  }

  async openDataTables(): Promise<DataTablesButtonsPage> {
    const popup = await this.openPopup("DATA, TABLES & BUTTON STATES");
    return new DataTablesButtonsPage(popup);
  }

  async openAutocompleteText(): Promise<AutocompleteTextPage> {
    const popup = await this.openPopup(/AUTOCOMPLETE TEXTFIELD/);
    return new AutocompleteTextPage(popup);
  }

  async openFileUpload(): Promise<FileUploadPage> {
    const popup = await this.openPopup(/FILE UPLOAD/);
    return new FileUploadPage(popup);
  }
}
