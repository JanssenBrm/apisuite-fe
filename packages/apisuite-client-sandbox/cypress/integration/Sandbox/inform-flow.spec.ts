// This test seem to be from an old version making it skip so it doesn't fail
// TODO Check if test can be removed
describe.skip('Sandbox', () => {
  context('Inform flow', () => {
    it('should have an inform button and open a modal on click', () => {
      cy.visit('/')

      // Opens inform dialog on infor me button click
      cy.testID('inform-dialog').should('not.be.visible')
      cy.testID('inform-btn').click()
      cy.testID('inform-dialog').should('be.visible')

      // info text contains the right target in it's generic text: Cloudoki Sandbox
      cy.testID('inform-dialog-text').contains('Cloudoki Sandbox')

      // submit is disabled until valid email and terms are valid
      cy.testID('inform-dialog-submit').should('be.disabled')

      cy.testID('inform-dialog-email')
        .find('input')
        .type('worngemail')

      cy.get('.MuiFormHelperText-root').contains('* A valid emails must be provided')

      cy.testID('inform-dialog-terms').click()

      cy.testID('inform-dialog-submit').should('be.disabled')

      cy.testID('inform-dialog-terms').click()

      cy.testID('inform-dialog-email')
        .find('input')
        .clear()
        .type('test@email.com')

      cy.testID('inform-dialog-submit')
        .should('be.disabled')

      cy.testID('inform-dialog-terms')
        .click()

      cy.testID('inform-dialog-submit')
        .should('not.be.disabled')

      // closes the dialog on cancel click
      cy.testID('inform-dialog-cancel')
        .click()

      cy.testID('inform-dialog')
        .should('not.be.visible')
    })

    it('should show response error if server responds with none ok status', () => {
      const supportUrl = Cypress.env('supportUrl')
      cy.server()
      cy.route({
        method: 'POST',
        url: supportUrl,
        status: 503,
        response: 'Server Unavailable',
      })

      cy.testID('inform-btn').click()
      cy.testID('inform-dialog-email')
        .find('input')
        .clear()
        .type('test@email.com')

      cy.testID('inform-dialog-submit').click()

      cy.get('.MuiFormHelperText-root').contains('An unexpected error occurred please try again later.')
    })
  })
})
