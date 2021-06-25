/// <reference path="../../support/index.d.ts" />

import { testIds } from "../../../src/testIds";

import enUS from "../../fixtures/translations/en-US.json";
import profile_admin from "../../fixtures/profile/profile-admin.json";
import profile_baseUser from "../../fixtures/profile/profile-baseUser.json";
import profile_developer from "../../fixtures/profile/profile-developer.json";
import profile_organizationOwner from "../../fixtures/profile/profile-orgOwner.json";

type roles = "admin" | "baseUser" | "developer" | "organizationOwner";
const users: { type: roles; filename: string; name: string }[] = [
  {
    type: "developer",
    filename: "profile-developer",
    name: profile_developer.user.name,
  },
  {
    type: "organizationOwner",
    filename: "profile-orgOwner",
    name: profile_organizationOwner.user.name,
  },
  {
    type: "admin",
    filename: "profile-admin",
    name: profile_admin.user.name,
  },
  {
    type: "baseUser",
    filename: "profile-baseUser",
    name: profile_baseUser.user.name,
  },
];

users.forEach((user) => {
  describe(`Profile - Overview - ${user.type}`, () => {
    context("Left side section", () => {
      before(() => {
        cy.intercept("GET", `${Cypress.env("api_url")}/translations/en-US`, { fixture: "translations/en-US.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/settings`, { fixture: "settings/settings.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/owner`, { fixture: "owner/owner.json" });
        cy.intercept("GET", `${Cypress.env("api_url")}/users/profile`, { fixture: `profile/${user.filename}.json` });

        cy.setSession();

        cy.visit("/profile");
      });

      it("should show the user's name as section title", () => {
        cy.testID(testIds.profileOverviewTitle)
          .should("be.visible")
          .and("have.text", user.name);
      });

      it("should show the user role", () => {
        let roleDisplayName = "";

        switch (user.type) {
          case "admin":
            roleDisplayName = enUS.profileTab.overviewSubTab.roleRelatedLabels.admin;
            break;
          case "organizationOwner":
            roleDisplayName = enUS.profileTab.overviewSubTab.roleRelatedLabels.orgOwner;
            break;
          case "developer":
            roleDisplayName = enUS.profileTab.overviewSubTab.roleRelatedLabels.developer;
            break;
          default:
            roleDisplayName = enUS.profileTab.overviewSubTab.roleRelatedLabels.baseUser;
        }

        cy.testID(testIds.profileOverviewRole)
          .should("be.visible")
          .and("have.text", roleDisplayName);
      });

      it("should show the subtitle", () => {
        cy.testID(testIds.profileOverviewSubtitle)
          .should("be.visible")
          .and("have.text", enUS.profileTab.overviewSubTab.subtitle);
      });
    });
  });
});
