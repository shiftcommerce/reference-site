/**
 * Logs into customer account
 */
Cypress.Commands.add('loginToAccount', () => {
  // Setup server
  cy.server()

  // Stub login request
  cy.route({
    method: 'POST',
    url: '/login',
    status: 201,
    response: 'fixture:account/login.json'
  }).as('postLogin')

  // Stub get account request 
  cy.route({
    method: 'GET',
    url: '/getAccount',
    status: 200,
    response: 'fixture:account/get-account.json'
  }).as('getAccount')

  // Stub get address book request
  cy.route({
    method: 'GET',
    url: '/getAddressBook',
    status: 200,
    response: 'fixture:account/get-address-book.json'
  }).as('getAddressBook')

  // Visit the Login page
  cy.visit('/account/login')

  // Check the login page was loaded
  cy.contains(/Login/i)

  // Enter login details
  cy.get('input[name=email]').type('test@example.com')
  cy.get('input[name=password]').type('password123')

  // Submit login form
  cy.contains(/CONTINUE SECURELY/i).click()

  // Check login form request has been made
  cy.wait('@postLogin')
    .its('requestBody.data.attributes')
    .should('include', {
      email: 'test@example.com',
      password: 'password123'
    })

  // Check get account request has been made
  cy.wait('@getAccount')

  // Check the my account page was loaded
  cy.url().should('includes', 'account/details')
})
