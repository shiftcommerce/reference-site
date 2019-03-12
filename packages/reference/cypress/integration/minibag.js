describe('Minibag', () => {
  it('Shows the minibag when adding an item to cart, hides the minibag when cross is clicked', () => {
    cy.visit('/products/clock_computer')

    // Check that the minibag isn't displayed to start with
    cy.get('.c-minibag__dropdown').should('have.length', 0)

    // Add an item to cart
    cy.contains(/Clock computer 13''/i).click()
    cy.contains(/Add to basket/i).click()

    // Check that the minibag is displayed
    cy.get('.c-minibag__dropdown').should('have.length', 1)

    // Check that the minibag has one line item and its title matches
    cy.get('.c-minibag__line-item').contains(/Clock computer - Clock computer 13''/i).should('have.length', 1)

    // Click the cross
    cy.get('.c-minibag__dropdown-cross').click()

    // Check that the minibag is closed now
    cy.get('.c-minibag__dropdown').should('have.length', 0)
  })

  it('Shows the minibag when clicking the basket, hides the minibag when clicking outside of it', () => {
    cy.visit('/')

    // Check that the minibag isn't displayed to start with
    cy.get('.c-minibag__dropdown').should('have.length', 0)

    cy.contains('Basket').click()

    // Check that the minibag is displayed
    cy.get('.c-minibag__dropdown').should('have.length', 1)

    // Check that the minibag is empty
    cy.contains('Your bag is empty')
  })

  it('Goes to cart page correctly', () => {
    cy.visit('/')

    cy.contains('Basket').click()

    // Check that the minibag is empty
    cy.contains(/View shopping basket/i).click()

    // Timeout is increased to 10 s due to occasional local failures
    cy.url({ timeout: 10000 }).should('include', '/cart')
  })

  it('Updates the line item quantity with a dropdown', () => {
    // Add a product to cart with an API call
    cy.request('POST', '/addToCart', { variantId: '27103', quantity: 1 })

    // Open the minibag
    cy.visit('/')
    cy.contains('Basket').click()

    // Start a mock server to assert on the API request to update line item quantity
    cy.server()
    cy.route('POST', '/updateLineItem', {}).as('updateQuantity')

    // Update the product's quantity with the dropdown
    cy.get('.c-minibag__quantity').select('3')

    cy.wait('@updateQuantity')
      .its('request.body')
      .should('include', {
        newQuantity: 3
      })
  })
})