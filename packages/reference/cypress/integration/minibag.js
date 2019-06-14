describe('Minibag', () => {
  beforeEach(() => {
    // Setup server
    cy.server()

    // Uses custom command - Cypress/support/commands/empty-search.js
    cy.emptySearch()

    // Stub shipping methods request
    cy.route({
      method: 'GET',
      url: '/getShippingMethods',
      status: 200,
      response: 'fixture:cart/get-shipping-methods.json'
    }).as('getShippingMethods')

    // Stub get cart request
    cy.route({
      method: 'GET',
      url: '/getCart',
      status: 200,
      response: 'fixture:cart/get-cart-with-line-item.json'
    }).as('getCart')

    // Stub get products
    cy.route({
      method: 'GET',
      url: '/getProduct/*',
      status: 200,
      response: 'fixture:products/clock-computer.json'
    }).as('getProduct')

    // Stub add to cart request
    cy.route({
      method: 'POST',
      url: '/addToCart*',
      status: 200,
      response: 'fixture:cart/add-clock-computer.json'
    }).as('addToCart')
  })

  it('Shows the minibag when adding an item to cart, hides the minibag when cross is clicked', () => {
    // Visit PDP
    cy.visit('/products/clock_computer')

    // Check that the minibag isn't displayed to start with
    cy.get('.c-minibag__dropdown').should('have.length', 0)

    cy.wait(1000)

    // Add an item to cart
    cy.contains(/Clock computer 15''/i).click()
    cy.contains(/Add to basket/i).click()

    // Check that the minibag is displayed
    cy.get('.c-minibag__dropdown').should('have.length', 1)

    // Check that the minibag has one line item and its title matches
    cy.get('.c-minibag__line-item').contains(/Clock computer - Clock computer 15''/i).should('have.length', 1)

    // Click the cross
    cy.get('.c-minibag__dropdown-cross').click()

    // Check that the minibag is closed now
    cy.get('.c-minibag__dropdown').should('have.length', 0)
  })

  it('Shows the minibag when clicking the basket', () => {
    // Click basket navigation option 
    cy.contains('Basket').click()

    // Check that the minibag is displayed
    cy.get('.c-minibag__dropdown').should('have.length', 1)

    // Check that the minibag has one line item and its title matches
    cy.get('.c-minibag__line-item').contains(/Clock computer - Clock computer 15''/i).should('have.length', 1)
  })

  it('Goes to cart page correctly', () => {
    // Click basket navigation option 
    cy.contains('Basket').click()

    // Check that the minibag is empty
    cy.contains(/View shopping basket/i).click()

    // Timeout is increased to 10 s due to occasional local failures
    cy.url({ timeout: 10000 }).should('include', '/cart')
  })

  it('Updates the line item quantity with a dropdown', () => {
    // Uses custom command - Cypress/support/commands/cart.js
    cy.addVariantToCart()

    // Stub update line item quantity request
    cy.route({
      method: 'POST',
      url: '/updateLineItem',
      status: 200,
      response: 'fixture:cart/update-line-item-quantity.json'
    }).as('updateQuantity')

    // Update the product's quantity with the dropdown
    cy.get('.c-minibag__quantity').select('3')

    // Check update line item quantity request has been made
    cy.wait('@updateQuantity')
      .its('request.body')
      .should('include', {
        newQuantity: 3
      })

    cy.get('.c-minibag__cart-image-count').should('contain', 3)
    cy.get('.c-checkout-cart__amount').should('contain', 3)
  })
})
