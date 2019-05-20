describe('Successful Login', () => {
  it('routes us to the my account page with valid credentials', () => {
    // Uses custom command
    // Cypress/support/commands/login.js
    cy.loginToAccount()
  })
})

describe('Unsuccessful Login', () => {
  it('renders error message on login failure', () => {
    cy.server()

    cy.route({
      method: 'POST',
      url: '/login',
      status: 404,
      response: [{ 'title': 'Record not found', 'detail': 'Wrong email/reference/token or password', 'code': '404', 'status': '404' }]
    }).as('postLogin')

    // Visit the Login page
    cy.visit('/account/login')

    // Check the login page was loaded
    cy.contains(/Login/i)

    // Enter login details
    cy.get('input[name=email]').type('test@example.com')
    cy.get('input[name=password]').type('password123')

    cy.contains(/CONTINUE SECURELY/i).click()

    // Check we're still on the login page
    cy.contains(/Login/)
    cy.contains(/There has been a problem processing your request/)
    cy.contains(/Wrong email\/reference\/token or password/)
  })

  it('displays/clears error message for invalid email address', () => {
    // Visit the Login page
    cy.visit('/account/login')

    // Enter login details
    cy.get('input[name=email]').type('test@example').blur() // needs a tld

    // check for expected form field error
    cy.contains(/Invalid email/)

    // Check submit button is disabled
    cy.get('button[aria-label="Continue Securely"]').should('be.disabled')

    // check that a correct email clears the error
    cy.get('input[name=email]').clear().type('test@example.com').blur()
    cy.get('.o-form__input-field__error').should('be.empty')
  })

  it('displays errors for missing fields', () => {
    // Visit the Login page
    cy.visit('/account/login')

    // Enter login details
    cy.get('input[name=email]').focus().blur()
    cy.get('input[name=password]').focus().blur()

    // check for expected form field errors
    cy.contains(/Email is required/)
    cy.contains(/Password is required/)

    // Check submit button is disabled
    cy.get('button[aria-label="Continue Securely"]').should('be.disabled')

    // check that a correct email clears the error
    cy.get('input[name=email]').clear().type('foo@bar.com').blur()
    cy.get('input[name=password]').clear().type('anything').blur()
    cy.get('.o-form__input-field__error').should('be.empty')

    // Check submit button is enabled
    cy.get('button[aria-label="Continue Securely"]').should('be.enabled')
  })
})
