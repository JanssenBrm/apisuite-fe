declare namespace Cypress {
  interface Chainable {
    /**
     * Select DOM element by data-test-id attribute.
     * @example cy.testID('component-x')
    */
    testID(value: string): Chainable<Element>,
    /**
     * Select DOM children elements of a DOM element by data-test-id attribute from parent and children.
     * @example cy.findChildrenByID('component-x', 'children-x')
    */
    findChildrenByID(parentID: string, childrenID: string): Chainable<Element>,
    /**
     * Dismiss initial privacy notice banner
     * @example cy.dismissCookiesBanner()
    */
    dismissCookiesBanner(): Chainable<Element>,
    /**
     * Set a session
     * @example cy.setSession()
    */
    setSession(): Chainable<Element>,
  }
}
