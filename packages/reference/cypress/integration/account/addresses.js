describe('My Account - Addresses', () => {
  beforeEach(() => {
    cy.goToMyAccount()
  })

  it('can create a new address and set as preferred shipping and billing address', () => {
    // Navigate to the homepage
    cy.visit('/')

    // Hover over my account to reveal dropdown
    cy.contains('My Account').trigger('mouseover')

    cy.contains('Addresses').click()

    // Check the component renders & click add a new address
    cy.contains('Your addresses')
    cy.contains('Add a new address').click()

    // Fill out the address form
    cy.get('select[name=countryCode]').select('GB')
    cy.get('input[name=firstName]').type('John')
    cy.get('input[name=lastName]').type('Doe')
    cy.get('input[name=addressLine1]').type('Old School Board')
    cy.get('input[name=addressLine2]').type('Calverley St')
    cy.get('input[name=postcode]').type('LS1 3ED')
    cy.get('input[name=city]').type('Leeds')
    cy.get('input[name=county]').type('West Yorkshire')
    cy.get('input[name=phone]').type('08003029464')
    cy.get('input[name=email]').type('test@example.com')
    cy.get('input[name=label]').type('work address')

    // Select this address as preferred shipping & billing address
    cy.get('input[name=preferredShipping]').check()
    cy.get('input[name=preferredBilling]').check()

    // Submit the form
    cy.contains(/CREATE ADDRESS/i).click()

    // Check the address has been saved
    cy.wait('@createAddressBookEntry')
      .its('requestBody.data.attributes.meta_attributes')
      .should('deep.eq', {
        label: { value: 'work address' },
        email: { value: 'test@example.com' },
        company_name: { value: '' },
        phone_number: { value: '08003029464' }
      })

    cy.contains(/Address saved/i)
  })

  it('can update a pre-existing address', () => {
    // Select the address we want to update
    cy.get('input[name=address-book-radio]').check()

    // Update some address form fields
    cy.get('input[name=firstName]').clear().type('Test')
    cy.get('input[name=lastName]').clear().type('User')

    // Stub AddressBook request with updated details
    cy.route({
      method: 'GET',
      url: '/getAddressBook',
      status: 200,
      response: 'fixture:account/get-address-book-updated.json'
    }).as('getAddressBook')

    cy.contains(/UPDATE ADDRESS/i).click()

    cy.wait('@updateAddress')
      .its('requestBody.data.attributes')
      .should('contain', {
        first_name: 'Test',
        last_name: 'User'
      })

    cy.wait(1000)
    cy.contains(/Address updated/i)
    cy.contains(/Test User/i)
  })

  it('leaving a required field blank when updating address will disable the submit button', () => {
    // Select the address we want to update
    cy.get('input[name=address-book-radio]').check()

    // Leave fields blank when updating form
    cy.get('input[name=firstName]').clear()
    cy.get('input[name=lastName]').clear()

    // Check the button is disabled
    cy.get('button').should('be.disabled')
  })

  it('can delete an address', () => {
    // Delete a saved address
    cy.contains(/Delete/i).click()
    cy.wait('@deleteAddress')

    // Check there are no addresses to delete
    cy.get('a[label="Delete"]').should('not.exist')
  })
})
