describe('My Account', () => {
  describe('Update Password', () => {
    beforeEach(() => {
      // Setup server
      cy.server()
      // Uses custom command - Cypress/support/commands/empty-search.js
      cy.emptySearch()
    })

    context('Valid input', () => {
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
        cy.get('label[name=oldPassword]').type('oldsupersecurepassword')
        cy.get('label[name=newPassword]').type('newsupersecurepassword')
        cy.get('label[name=newPasswordConfirmation]').type('newsupersecurepassword')


        // Submit change
        cy.contains(/UPDATE PASSWORD/i).click()

        // Check flash message
        cy.contains('Your Password were successfully updated.')

        // Check submitted request data
        cy.wait('@updatePassword')
          .its('requestBody')
          .should('include', {
            firstName: 'Dan',
            lastName: 'Doe',
            email: 'example123@test.com'
          })

        // Check first name has been updated
        cy.get('input[name=firstName]').should('have.value', 'Dan')
      })

      it('does not successfully update the password', () => {
        // Stub update customer password request
        cy.route({
          method: 'POST',
          url: '/updateCustomerPassword',
          status: 200,
          response: 'fixture:account/customer-account-auth-failed.json'
        }).as('updatePassword')

        cy.visit('/account/password')

        // Enter new password
        cy.get('label[name=oldPassword]').type('oldsupersecurepassword')
        cy.get('label[name=newPassword]').type('newsupersecurepassword')
        cy.get('label[name=newPasswordConfirmation]').type('newsupersecurepassword')

        // Submit change
        cy.contains(/UPDATE PASSWORD/i).click()

        // Check flash message
        cy.contains('Password reset failed')
      })
    })
  })
})
