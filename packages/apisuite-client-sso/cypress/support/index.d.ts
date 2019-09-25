declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.testID('component-x')
    */
    testID(value: string): Chainable<Element>,
  }
}
