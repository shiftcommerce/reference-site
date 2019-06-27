describe('My Account', () => {
  describe('Update Password', () => {
    beforeEach(() => {
      // Setup server
      cy.server()
      // Uses custom command - Cypress/support/commands/empty-search.js
      cy.emptySearch()
    })

    it('updates the account password', () => {
      // Stub update customer password request
      cy.route({
        method: 'POST',
        url: '/updateCustomerPassword',
        status: 200,
        response: 'fixture:account/details-email.json'
      }).as('updatePassword')

      cy.visit('/account/password')

      // Enter new password
      cy.get('input[name=oldPassword]').type('oldsupersecurepassword')
      cy.get('input[name=newPassword]').type('newsupersecurepassword')
      cy.get('input[name=newPasswordConfirmation]').type('newsupersecurepassword')

      // Submit change
      cy.contains(/UPDATE PASSWORD/i).click()

      // Check flash message
      cy.contains('Your Password was successfully updated.')
    })

    it('does not successfully update the password', () => {
      // Stub update customer password request
      cy.route({
        method: 'POST',
        url: '/updateCustomerPassword',
        status: 404,
        response: 'fixture:account/customer-account-auth-failed.json'
      }).as('updatePassword')

      cy.visit('/account/password')

      // Enter new password
      cy.get('input[name=oldPassword]').type('oldsupersecurepassword')
      cy.get('input[name=newPassword]').type('newsupersecurepassword')
      cy.get('input[name=newPasswordConfirmation]').type('newsupersecurepassword')

      // Submit change
      cy.contains(/UPDATE PASSWORD/i).click()

      // Check flash message
      cy.contains('Oops, there was an error updating your password.')
    })
  })
})
