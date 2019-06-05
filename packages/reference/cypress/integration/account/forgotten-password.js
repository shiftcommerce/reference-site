describe('Forgotten Password', () => {
  beforeEach(() => {
    cy.emptySearch()
  })

  it('sends the correct request to the server', () => {
    cy.server()

    cy.route({
      method: 'GET', // this is a GET for Reasons Unknown
      url: '**forgotPassword**',
      status: 201,
      response: {}
    }).as('postForgot')

    // Visit the Forgotten password page
    cy.visit('/account/forgotpassword')

    // Check the forgotten password page was loaded
    cy.contains(/Forgot Password/i)

    // Check that submitting the form with a valid email address shows the right message
    cy.get('input[name=email]').type('test@example.com').blur()
    cy.get('button[aria-label="Submit"]').click()
    cy.wait('@postForgot')
    cy.contains(/Password reset email sent/)
  })

  it('validates the form', () => {
    cy.visit('/account/forgotpassword')

    // Check the login page was loaded
    cy.contains(/Forgot Password/i)

    // validates bad email
    cy.get('input[name=email]')
      .type('test@example')
      .blur()
    cy.contains(/Invalid email/) // error message
    cy.get('button[aria-label="Submit"]').should('be.disabled')

    // validates good email
    cy.get('input[name=email]')
      .clear()
      .type('test@example.com')
      .blur()
    cy.get('.o-form__input-field__error').should('be.empty') // no error message
    cy.get('button[aria-label="Submit"]').should('be.enabled') // button re-enabled

    // validates required field
    cy.get('input[name=email]').clear().blur()
    cy.contains(/Email is required/)
    cy.get('button[aria-label="Submit"]').should('be.disabled')
  })
})

describe('Reset Password', () => {
  beforeEach(() => {
    cy.emptySearch()
  })

  it('sends the correct request to the server', () => {
    cy.server()

    cy.route({
      method: 'POST',
      url: '/passwordReset',
      status: 200,
      response: 'fixture:account/reset-password-success-response.json'
    }).as('postReset')

    // Visit the Forgotten password page
    cy.visit('/account/password_reset?email=bob@example.net&token=some-secret-one-time-token')

    // Check the login page was loaded
    cy.contains(/Password Reset/i)

    // Enter login details
    cy.get('input[name=password]').type('password123')
    cy.get('input[name=confirmPassword]').type('password123')
    cy.get('button[aria-label="Submit"]').click()

    // check it sent the right stuff
    cy.wait('@postReset')
      .its('requestBody.data.attributes')
      .should('include', {
        token: 'some-secret-one-time-token',
        password: 'password123'
      })

    // check we end up on the login page
    cy.url().should('includes', '/account/login')
  })

  it('displays error message on reset failure', () => {
    cy.server()

    cy.route({
      method: 'POST',
      url: '/passwordReset',
      status: 200,
      response: [{ title: 'Record not found', detail: 'Wrong email/reference/token or password', code: '404', status: '404' }]
    }).as('postReset')

    // Visit the Forgotten password page
    cy.visit('/account/password_reset?email=bob@example.net&token=some-secret-one-time-token')

    // Check the login page was loaded
    cy.contains(/Password Reset/i)

    // Enter new password
    cy.get('input[name=password]').type('password123')
    cy.get('input[name=confirmPassword]').type('password123')
    cy.get('button[aria-label="Submit"]').click()

    cy.wait('@postReset')
    cy.contains(/Wrong email\/reference\/token or password/)
  })

  it('validates the form correctly', () => {
    cy.visit('/account/password_reset?email=bob@example.net&token=some-secret-one-time-token')

    // should not complain with two valid matching password
    cy.get('input[name=password]').type('password123')
    cy.get('input[name=confirmPassword]').type('password123').blur()
    cy.get('.o-form__input-field__error').should('be.empty')
    cy.get('button[aria-label="Submit"]').should('be.enabled')

    // confirm password box must match
    cy.get('input[name=confirmPassword]').clear().type('foo').blur()
    cy.get('.o-form__input-field__error').last().contains('Must match')
    cy.get('button[aria-label="Submit"]').should('be.disabled')

    // check min length
    cy.get('input[name=password]').clear().type('foo').blur()
    cy.get('.o-form__input-field__error').first().contains('Password must be at least 5 characters')
    cy.get('button[aria-label="Submit"]').should('be.disabled')

    // check required fields
    cy.get('input[name=password]').clear().blur()
    cy.get('input[name=confirmPassword]').clear().blur()
    cy.get('.o-form__input-field__error').first().contains('Required')
    cy.get('.o-form__input-field__error').last().contains('Required')
    cy.get('button[aria-label="Submit"]').should('be.disabled')

    // error should be cleared with valid password
    cy.get('input[name=password]').clear().type('password123')
    cy.get('input[name=confirmPassword]').clear().type('password123').blur()
    cy.get('.o-form__input-field__error').should('be.empty')
    cy.get('button[aria-label="Submit"]').should('be.enabled')
  })
})
