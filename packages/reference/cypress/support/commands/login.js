// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginToAccount', () => {
  // stub requests
  cy.server()

  cy.route({
    method: 'POST',
    url: '/login',
    status: 201,
    response: 'fixture:account/login.json'
  }).as('postLogin')

  cy.route({
    method: 'GET',
    url: '/getAccount',
    status: 200,
    response: 'fixture:account/get-account.json'
  }).as('getAccount')

  // Visit the Login page
  cy.visit('/account/login')

  // Check the login page was loaded
  cy.contains(/Login/i)

  // Enter login details
  cy.get('input[name=email]').type('test@example.com')
  cy.get('input[name=password]').type('password123')

  cy.contains(/CONTINUE SECURELY/i).click()

  cy.wait('@postLogin')
    .its('requestBody.data.attributes')
    .should('include', {
      email: 'test@example.com',
      password: 'password123'
    })

  cy.wait('@getAccount')

  // Check the my account page was loaded
  cy.url().should('includes', '/myaccount')
})
