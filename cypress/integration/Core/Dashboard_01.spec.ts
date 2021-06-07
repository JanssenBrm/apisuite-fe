/// <reference path="../../support/index.d.ts" />

import { testIds } from "../../../src/testIds";

const users = [{
  type: "Base User",
  filename: "profile-baseUser",
},{
  type: "Developer",
  filename: "profile-developer",
},{
  type: "Organisation Owner",
  filename: "profile-orgOwner",
}];

users.forEach(user => {

  describe(`Dashboard - Overview Page - ${user.type}`, () => {

    context("Cookie Consent", () => {
      beforeEach(() => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.intercept(`${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept(`${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setCookie("hk", "234astgbhnm");
        cy.setCookie("apiSuiteSession", "SET_SESSION");

        cy.visit("/dashboard");
      });

      it("should show a privacy notice with an accept CTA", () => {
        cy.fixture("translations/en-US.json").then(enUS => {
          cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.intro).should("be.visible");
          cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphOne).should("be.visible");
          cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphTwo.partOne).should("be.visible");
          cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphTwo.partTwo).should("be.visible");
          cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphTwo.partThree).should("be.visible");
          cy.testID(testIds.cookieConsent).contains(enUS.cookiesConsentBanner.paragraphThree).should("be.visible");

          cy.testID(testIds.cookieConsent).find("a").contains(enUS.cookiesConsentBanner.paragraphTwo.partTwo)
            .should("be.visible")
            .and("have.attr", "href", "https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/761004061/Legal")
            .and("have.attr", "target", "_blank"); //open in a new tab
        });
      });

      it("should dismiss privacy notice on accept CTA click", () => {
        cy.fixture("translations/en-US.json").then(enUS => {
          cy.testID(testIds.cookieConsent).find("button").should("have.length", 1).and("contain", enUS.cookiesConsentBanner.buttonLabel);
          cy.dismissCookiesBanner();
          cy.testID(testIds.cookieConsent).find("button").should("have.length", 0);
        });
      });
    });


    //TODO: add tests for navigation
    // context("Navigation", () => {});


    context("Actions Section", () => {
      beforeEach(() => {

        cy.intercept(`${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept(`${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setCookie("hk", "234astgbhnm");
        cy.setCookie("apiSuiteSession", "SET_SESSION");
      });

      it("should show a grid with 6 different actions linked to the corresponding pages", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("settings/settings2.json").then(settings=> {
          cy.fixture("translations/en-US.json").then(enUS=> {
            cy.testID(testIds.actionsSection).should("be.visible");

            cy.testID(testIds.actionsEntry).should("have.length", 6);

            cy.testID(testIds.actionsEntry).eq(0).parent().should("have.attr", "href", "/profile/team");
            cy.testID(testIds.actionsEntry).eq(0).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.team);

            cy.testID(testIds.actionsEntry).eq(1).parent().should("have.attr", "href", "/dashboard/apps");
            cy.testID(testIds.actionsEntry).eq(1).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.sandbox);

            cy.testID(testIds.actionsEntry).eq(2).parent().should("have.attr", "href", "/dashboard/subscriptions");
            cy.testID(testIds.actionsEntry).eq(2).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.shield);

            cy.testID(testIds.actionsEntry).eq(3).parent().should("have.attr", "href", "/profile/security");
            cy.testID(testIds.actionsEntry).eq(3).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.fingerprint);

            cy.testID(testIds.actionsEntry).eq(4).parent().should("have.attr", "href", "/dashboard/subscriptions");
            cy.testID(testIds.actionsEntry).eq(4).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.api);

            cy.testID(testIds.actionsEntry).eq(5).parent().should("have.attr", "href", settings.supportURL);
            cy.testID(testIds.actionsEntry).eq(5).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.support);
          });
        });
      });

      it("should show a grid with 6 different actions linked to the corresponding pages - no support URL in settings", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings-emptyURL.json" });

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("translations/en-US.json").then(enUS=> {
          cy.testID(testIds.actionsSection).should("be.visible");

          cy.testID(testIds.actionsEntry).should("have.length", 6);

          cy.testID(testIds.actionsEntry).eq(0).parent().should("have.attr", "href", "/profile/team");
          cy.testID(testIds.actionsEntry).eq(0).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.team);

          cy.testID(testIds.actionsEntry).eq(1).parent().should("have.attr", "href", "/dashboard/apps");
          cy.testID(testIds.actionsEntry).eq(1).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.sandbox);

          cy.testID(testIds.actionsEntry).eq(2).parent().should("have.attr", "href", "/dashboard/subscriptions");
          cy.testID(testIds.actionsEntry).eq(2).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.shield);

          cy.testID(testIds.actionsEntry).eq(3).parent().should("have.attr", "href", "/profile/security");
          cy.testID(testIds.actionsEntry).eq(3).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.fingerprint);

          cy.testID(testIds.actionsEntry).eq(4).parent().should("have.attr", "href", "/dashboard/subscriptions");
          cy.testID(testIds.actionsEntry).eq(4).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.api);

          cy.testID(testIds.actionsEntry).eq(5).parent().should("have.attr", "href", "https://intercom.help/api-suite/en/articles/4586659-api-portal-users");
          cy.testID(testIds.actionsEntry).eq(5).should("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.actionsCatalog.support);
        });
      });
    });


    context("Greetings Section", () => {
      before(() => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.intercept(`${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept(`${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setCookie("hk", "234astgbhnm");
        cy.setCookie("apiSuiteSession", "SET_SESSION");

        cy.visit("/dashboard");
        cy.dismissCookiesBanner();
      });

      it("should show a greetings card with 2 paragraph and a contact button", () => {
        cy.fixture(`profile/${user.filename}`).then(profile=> {
          cy.fixture("settings/settings2.json").then(settings=> {
            cy.fixture("translations/en-US.json").then(enUS=> {
              cy.testID(testIds.greetingSection).should("be.visible");

              cy.testID(testIds.greetingCardParagraphOne)
                .should("be.visible")
                .and("have.text", `${enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextPartOne} ${profile.user.name}! ${enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextPartTwo}`);
              cy.testID(testIds.greetingCardParagraphTwo)
                .should("be.visible")
                .and("have.text", enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardTextPartThree);
              cy.testID(testIds.greetingCardButton)
                .should("be.visible")
                .and("have.text", `${enUS.dashboardTab.landingPageSubTab.regularUser.greetingCard.greetingCardButtonLabel} ${settings.clientName}`)
                .and("have.attr", "href", settings.supportURL);
            });
          });
        });
      });
    });


    context("API Catalog recent additions", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setCookie("hk", "234astgbhnm");
        cy.setCookie("apiSuiteSession", "SET_SESSION");
      });

      it("should show the section title and a message mentioning the absence of APIs", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_empty.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("translations/en-US.json").then(enUS=> {
          cy.testID(testIds.recentAdditionsTitle)
            .should("be.visible")
            .and("contain", enUS.sandboxPage.apiCatalog.intro);
          cy.testID(testIds.recentAdditionsCatalog).find("a").should("not.exist");
          cy.testID(testIds.recentAdditionsEmpty)
            .should("be.visible")
            .and("contain", enUS.sandboxPage.apiCatalog.paragraph);
        });
      });

      it("should show the section title and a card for each recent API added", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("translations/en-US.json").then(enUS => {
          cy.fixture("apis/apis.json").then(apis => {
            cy.testID(testIds.recentAdditionsTitle)
              .should("be.visible")
              .and("contain", enUS.sandboxPage.apiCatalog.intro);
            cy.testID(testIds.recentAdditionsEmpty).should("not.exist");
            cy.testID(testIds.recentAdditionsCatalog).find("a").should("have.length", 2);
            cy.testID(testIds.recentAdditionsCatalog).find("a").eq(0)
              .should("have.attr", "href", `/api-products/details/${
                apis.rows[0].apiVersions[0].apiId
              }/spec/${
                apis.rows[0].apiVersions[0].id
              }`);
            cy.testID(testIds.recentAdditionsCatalog).find("a").eq(1)
              .should("have.attr", "href", `/api-products/details/${
                apis.rows[1].apiVersions[0].apiId
              }/spec/${
                apis.rows[1].apiVersions[0].id
              }`);

            cy.testID(testIds.apiCatalogCard).should("have.length", 2);

            for (let index = 0; index < 2; index++) {
              cy.testID(testIds.apiCatalogCard).eq(index)
                .should("be.visible")
                .and("contain", apis.rows[index].apiVersions[0].title)
                .and("contain", apis.rows[index].apiVersions[0].version)
                .and("contain", apis.rows[index].apiVersions[0].live ? "Production access":"API Documentation")
                .and("contain", apis.rows[index].docs[0].info); //This is failing
              //TODO: this needs to be reviewed later
            }
          });
        });
      });

      it("should show the section title and a card for each recent API added without version", () => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis_noversion.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("translations/en-US.json").then(enUS => {
          cy.fixture("apis/apis_noversion.json").then(apis => {
            cy.testID(testIds.recentAdditionsTitle)
              .should("be.visible")
              .and("contain", enUS.sandboxPage.apiCatalog.intro);
            cy.testID(testIds.recentAdditionsEmpty).should("not.exist");
            cy.testID(testIds.recentAdditionsCatalog).find("a").should("have.length", 0);

            cy.testID(testIds.apiCatalogCard)
              .should("have.length", 1)
              .and("be.visible");

            cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardName)
              .should("have.text", apis.rows[0].name);
            cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardVersion)
              .should("have.text", "No version available");
            cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardAccessType)
              .should("have.text", "API Documentation");
            cy.findChildrenByID(testIds.apiCatalogCard, testIds.apiCardDescription)
              .should("have.text", "No description presently available.");
          });
        });
      });
    });


    context("Portal Owner Info Panel", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setCookie("hk", "234astgbhnm");
        cy.setCookie("apiSuiteSession", "SET_SESSION");
      });

      it("should not show the info panel if there is no website", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.notice).should("not.exist");
      });

      it("should show the info panel mentioning portal owner's name and link", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("settings/settings_socialURLs2.json").then(settings => {
          cy.fixture("translations/en-US.json").then(enUS => {
            cy.testID(testIds.notice)
              .should("be.visible")
              .and("have.text",
                enUS.sandboxPage.notice
                  .replace("{{portalName}}", settings.portalName)
                  .replace("{{clientName}}", settings.clientName)
                  .replace("<0>{{url}}</0>", settings.socialURLs[0].url)
              );
          });
        });
      });
    });


    context("Footer", () => {
      beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/apis`, { fixture: "apis/apis.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });

        cy.setCookie("hk", "234astgbhnm");
        cy.setCookie("apiSuiteSession", "SET_SESSION");
      });

      it("should show the page footer", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footer).should("be.visible");
      });

      it("should show the portal name and logo", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("settings/settings2.json").then(settings => {
          cy.fixture("owner/owner.json").then(owner => {
            cy.testID(testIds.footerLogoAndPortalName).should("be.visible");

            cy.testID(testIds.footerLogoAndPortalName).find("img")
              .should("have.attr", "src", owner.logo);
            cy.testID(testIds.footerLogoAndPortalName).find("h3")
              .should("contain", settings.portalName);
          });
        });
      });

      it("should show the social icons", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings_socialURLs2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("settings/settings_socialURLs2.json").then(settings => {
          cy.testID(testIds.footerSocialIcons).should("be.visible");

          for (let index = 0; index < settings.socialURLs.length; index++) {
            cy.testID(testIds.footerSocialIcons).find("a").eq(index)
              .should("be.visible")
              .and("have.attr", "href", settings.socialURLs[index].url)
              .and("have.attr", "target", "_blank");
          }
        });
      });

      it("should not show the social icons", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerSocialIcons).should("not.exist");
      });

      // it("should show the portal structure with links", () => {
      // TODO: test the portal structure links ...
      // });

      it("should show the copyrights", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.fixture("translations/en-US.json").then(enUS => {
          cy.testID(testIds.footerCredits).should("be.visible");
          cy.testID(testIds.footerCredits).find("a")
            .should("be.visible")
            .and("have.attr", "href", "https://apisuite.io/")
            .and("have.attr", "target", "_blank")
            .and("have.text", `\u00A9 ${new Date().getFullYear()} ${enUS.footer.copyrights.website}`);
          cy.testID(testIds.footerCredits).find("p")
            .should("be.visible")
            .and("have.text", enUS.footer.copyrights.allRightsReserved);
        });
      });

      it("should scroll to the top of the current page", () => {
        cy.intercept(`${Cypress.env("api_url")}/settings`, { fixture: "settings/settings2.json" });
        cy.visit("/dashboard");
        cy.dismissCookiesBanner();

        cy.testID(testIds.footerToTopButton).click();
        cy.url().should("eq", `${Cypress.config().baseUrl}/dashboard`);
        cy.window().its("scrollY").should("equal", 0);
      });

      // it("should switch between languages", () => {
      // TODO: test language switch...
      // });
    });
  });

});
