describe('My account page', () => {
  it('Navigates between my account page menus', () => {
    // Login the user in
    cy.request('POST', '/login', {
      data: {
        type: 'customer_account_authentications',
        attributes: {
          email: 'test@example.com',
          password: 'password123'
        }
      }
    })
    cy.setCookie('signedIn', 'true')

    // Click My Account on the home page
    cy.visit('/')
    cy.contains('My Account').click()

    // Check that My Account has loaded and the details form is displayed
    cy.get('.c-myaccount-header').contains(/My Account/i)
    cy.get('.c-sidebar__child').contains(/Update details/i)

    // Check the address book can be navigated to
    cy.get('.c-sidebar').contains(/Addresses/i).click()
    cy.get('.c-sidebar__child').contains(/Your addresses/i)

    // Check the password section can be navigated to
    cy.get('.c-sidebar').contains(/Password/i).click()
    cy.get('.c-sidebar__child').contains(/Password/i)

    // Check the password section can be navigated to
    cy.get('.c-sidebar').contains(/Orders/i).click()
    cy.get('.c-sidebar__child').contains(/Order history/i)
  })
})
