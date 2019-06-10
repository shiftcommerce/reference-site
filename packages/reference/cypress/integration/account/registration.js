describe('My Account', () => {
  describe('Registration', () => {
    beforeEach(() => {
      // Uses custom command
      // Cypress/support/commands/address-book.js
      cy.emptySearch()
    })

    context('valid input', () => {
      it('routes us to the my account page with a valid submission', () => {
        // stub requests
        cy.server()

        cy.route({
          method: 'POST',
          url: '/register',
          status: 201,
          response: 'fixture:account/registration.json'
        }).as('postRegistration')

        cy.route({
          method: 'GET',
          url: '/getAccount',
          status: 200,
          response: 'fixture:account/get-account.json'
        }).as('getAccount')

        cy.route({
          method: 'GET',
          url: '/getAddressBook',
          status: 200,
          response: 'fixture:account/get-address-book.json'
        }).as('getAddressBook')

        // Visit the account registration page
        cy.visit('/account/register')

        // Check the account registration page was loaded
        cy.contains(/Create your account/i)

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Click the create account button
        cy.contains(/CREATE ACCOUNT/i).click()

        // Check the registration request body data is correct
        cy.wait('@postRegistration')
          .its('requestBody.data.attributes')
          .should('include', {
            email: 'test@example.com',
            email_confirmation: 'test@example.com',
            password: 'password123',
            password_confirmation: 'password123'
          })

        // Check route has been called
        cy.wait('@getAccount')

        // Check the my account page was loaded
        cy.url().should('includes', 'account/details')
      })
    })

    context('invalid input', () => {
      it('renders a message when the email is already in use', () => {
        // Stub requests
        cy.server()

        cy.route({
          method: 'POST',
          url: '/register',
          status: 422,
          response: [{ 'title': 'has already been taken', 'detail': 'email - has already been taken', 'code': '100', 'source': { 'pointer': '/data/attributes/email' }, 'status': '422' }]
        }).as('postRegistrationError')

        // Visit the account registration page
        cy.visit('/account/register')

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Click the create account button
        cy.contains(/CREATE ACCOUNT/i).click()

        // Check request has been made
        cy.wait('@postRegistrationError')

        // Check we're still on the login page
        cy.contains(/Create your account/)
        cy.contains(/There has been a problem processing your request/)
        cy.contains(/email - has already been taken/)
      })

      it('renders a validation message when first name is missing', () => {
        // Visit the account registration page
        cy.visit('/account/register')

        // Enter new account details
        cy.get('input[name=firstName]').focus()
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check first name input has error message
        cy.get('input[name=firstName] + div').contains('Required')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when last name is missing', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').focus()
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check last name input has error message
        cy.get('input[name=lastName] + div').contains('Required')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when email is invalid', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test')
        cy.get('input[name=confirmEmail]').type('test')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check email input has error message
        cy.get('input[name=email] + div').contains('Invalid email')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when email and email confirmation are missing', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').focus()
        cy.get('input[name=confirmEmail]').focus()
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check email input has error message
        cy.get('input[name=email] + div').contains('Required')

        // Check email confirmation input has error message
        cy.get('input[name=confirmEmail] + div').contains('Required')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when emails do not match', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@test.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password123')

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check email confirmation input has error message
        cy.get('input[name=confirmEmail] + div').contains('Must match')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when password is missing', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').focus()
        cy.get('input[name=confirmPassword]').type('password123')

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check last name input has error message
        cy.get('input[name=password] + div').contains('Required')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when password confirmation is missing', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').focus().blur()

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check last name input has error message
        cy.get('input[name=confirmPassword] + div').contains('Required')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })

      it('renders a validation message when password confirmation does not match', () => {
        // Clear fields
        cy.get('input[name=firstName]').clear()
        cy.get('input[name=lastName]').clear()
        cy.get('input[name=email]').clear()
        cy.get('input[name=confirmEmail]').clear()
        cy.get('input[name=password]').clear()
        cy.get('input[name=confirmPassword]').clear()

        // Enter new account details
        cy.get('input[name=firstName]').type('John')
        cy.get('input[name=lastName]').type('Doe')
        cy.get('input[name=email]').type('test@example.com')
        cy.get('input[name=confirmEmail]').type('test@example.com')
        cy.get('input[name=password]').type('password123')
        cy.get('input[name=confirmPassword]').type('password321').blur()

        // Check we are still on the account registration page
        cy.url().should('includes', '/account/register')

        // Check last name input has error message
        cy.get('input[name=confirmPassword] + div').contains('Must match')

        // Check submit button is disabled
        cy.get('button[aria-label="Create Account"]').should('be.disabled')
      })
    })
  })
})
