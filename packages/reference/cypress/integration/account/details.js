describe('Details', () => {
  context('Valid input', () => {
    it('renders account details with the correct information', () => {
      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Check account details render as expected
      cy.get('input[name=firstName]').should('have.value', 'John')
      cy.get('input[name=lastName]').should('have.value', 'Doe')
      cy.get('input[name=email]').should('have.value', 'test@example.com')
    })

    it('updates the account first name', () => {
      // Stub requests
      cy.server()

      cy.route({
        method: 'POST',
        url: '/updateCustomerAccount',
        status: 201,
        response: 'fixture:account/details-first-name.json'
      }).as('updateDetails')

      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account first name
      cy.get('input[name=firstName]').clear().type('Dan')
      cy.get('input[name=emailConfirmation]').type('test@example.com')

      // Submit change
      cy.contains(/Update Details/i).click()

      // Check flash message
      cy.contains('Your details were successfully updated.')

      // Check submitted request data
      cy.wait('@updateDetails')
        .its('requestBody')
        .should('include', {
          firstName: 'Dan',
          lastName: 'Doe',
          email: 'test@example.com',
          emailConfirmation: 'test@example.com'
        })

      // Check first name has been updated
      cy.get('input[name=firstName]').should('have.value', 'Dan')
    })

    it('updates the account last name', () => {
      // Stub requests
      cy.server()

      cy.route({
        method: 'POST',
        url: '/updateCustomerAccount',
        status: 201,
        response: 'fixture:account/details-last-name.json'
      }).as('updateDetails')

      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account last name
      cy.get('input[name=lastName]').clear().type('Doey')
      cy.get('input[name=emailConfirmation]').type('test@example.com')

      // Submit change
      cy.contains(/Update Details/i).click()

      // Check flash message
      cy.contains('Your details were successfully updated.')

      // Check submitted request data
      cy.wait('@updateDetails')
        .its('requestBody')
        .should('include', {
          firstName: 'John',
          lastName: 'Doey',
          email: 'test@example.com',
          emailConfirmation: 'test@example.com'
        })

      // Check first name has been updated
      cy.get('input[name=lastName]').should('have.value', 'Doey')
    })

    it('updates the account email', () => {
      // Stub requests
      cy.server()

      cy.route({
        method: 'POST',
        url: '/updateCustomerAccount',
        status: 201,
        response: 'fixture:account/details-email.json'
      }).as('updateDetails')

      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account first name
      cy.get('input[name=email]').clear().type('example@test.com')
      cy.get('input[name=emailConfirmation]').clear().type('example@test.com')

      // Submit change
      cy.contains(/Update Details/i).click()

      // Check flash message
      cy.contains('Your details were successfully updated.')

      // Check submitted request data
      cy.wait('@updateDetails')
        .its('requestBody')
        .should('include', {
          firstName: 'John',
          lastName: 'Doe',
          email: 'example@test.com',
          emailConfirmation: 'example@test.com'
        })

      // Check first name has been updated
      cy.get('input[name=email]').should('have.value', 'example@test.com')
    })
  })

  context('Invalid input', () => {
    it('renders a validation message if first name is missing', () => {
      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account first name
      cy.get('input[name=firstName]').clear()
      cy.get('input[name=emailConfirmation]').type('test@example.com')

      // Check we are still on the myaccount page
      cy.url().should('includes', '/myaccount')

      // Check email input has error message
      cy.get('input[name=firstName] + div').contains('Required')

      // Check submit button is disabled
      cy.get('button[aria-label="Update details"]').should('be.disabled')
    })

    it('renders a validation message if last name is missing', () => {
      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account first name
      cy.get('input[name=lastName]').clear()
      cy.get('input[name=emailConfirmation]').type('test@example.com')

      // Check we are still on the myaccount page
      cy.url().should('includes', '/myaccount')

      // Check email input has error message
      cy.get('input[name=lastName] + div').contains('Required')

      // Check submit button is disabled
      cy.get('button[aria-label="Update details"]').should('be.disabled')
    })

    it('renders a validation message if email is invalid', () => {
      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account details
      cy.get('input[name=email]').clear().type('test')
      cy.get('input[name=emailConfirmation]').clear().type('test')

      // Check we are still on the myaccount page
      cy.url().should('includes', '/myaccount')

      // Check email confirmation input has error message
      cy.get('input[name=email] + div').contains('Invalid email')

      // Check submit button is disabled
      cy.get('button[aria-label="Update details"]').should('be.disabled')
    })

    it('renders a validation message if emails do not match', () => {
      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new account details
      cy.get('input[name=email]').clear().type('test@example.com')
      cy.get('input[name=emailConfirmation]').clear().type('test@test.com').blur()

      // Check we are still on the myaccount page
      cy.url().should('includes', '/myaccount')

      // Check email confirmation input has error message
      cy.get('input[name=emailConfirmation] + div').contains('Must match')

      // Check submit button is disabled
      cy.get('button[aria-label="Update details"]').should('be.disabled')
    })

    it('renders a validation message if email is missing', () => {
      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Clear email field
      cy.get('input[name=email]').clear()
      cy.get('input[name=emailConfirmation]').clear().blur()

      // Check we are still on the myaccount page
      cy.url().should('includes', '/myaccount')

      // Check email input has error message
      cy.get('input[name=email] + div').contains('Required')
      cy.get('input[name=emailConfirmation] + div').contains('Required')

      // Check submit button is disabled
      cy.get('button[aria-label="Update details"]').should('be.disabled')
    })

    it('renders a validation message if email already exists in platform', () => {
      // Stub requests
      cy.server()

      cy.route({
        method: 'POST',
        url: '/updateCustomerAccount',
        status: 422,
        response: [{
          'title': 'has already been taken',
          'detail': 'email - has already been taken',
          'code': '100',
          'source': {
            'pointer': '/data/attributes/email'
          }
        }]
      }).as('invalideUpdateDetails')

      // Uses custom command
      // Cypress/support/commands/login.js
      cy.loginToAccount()

      // Check page heading
      cy.contains(/My Account/i)

      // Enter new email address
      cy.get('input[name=email]').clear().type('testing@example.com')
      cy.get('input[name=emailConfirmation]').type('testing@example.com')

      // Submit change
      cy.contains(/Update Details/i).click()

      // Check request has been made
      cy.wait('@invalideUpdateDetails')

      // Check flash message
      cy.contains('Oops, there was an error submitting your form.')

      // Check we are still on the myaccount page
      cy.url().should('includes', '/myaccount')
    })
  })
})
