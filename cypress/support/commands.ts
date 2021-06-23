import { testIds } from "../../src/testIds";

Cypress.Commands.add("testID", (value) => {
  return cy.get(`[data-test-id=${value}]`);
});

Cypress.Commands.add("findChildrenByID", (parentID, childrenID) => {
  return cy.get(`[data-test-id=${parentID}]`).find(`[data-test-id=${childrenID}]`);
});

Cypress.Commands.add("setSession", () => {
  cy.clearCookies();
  cy.setCookie("hk", "234astgbhnm");
  cy.setCookie("apiSuiteSession", "SET_SESSION");
});

Cypress.Commands.add("dismissCookiesBanner", () => {
  return cy.testID(testIds.cookieConsent).get("button").contains("I Accept").click();
});
