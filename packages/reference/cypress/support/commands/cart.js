/**
 * Adds variant to cart
 */
Cypress.Commands.add('addVariantToCart', () => {
  // Setup server
  cy.server()

  // Stub add to cart request
  cy.route({
    method: 'POST',
    url: '/addToCart',
    status: 200,
    response: 'fixture:cart/add-clock-computer-13.json'
  }).as('addToCart')

  // Navigate to PDP
  cy.visit('/products/clock_computer')
  // Select the instock variant
  cy.contains(/Clock Computer 13'' - £799.00/i).click()
  // Add item to cart
  cy.contains(/Add To Basket/i).click()
  // Check request has been made
  cy.wait('@addToCart')
})

/**
 * Adds variants to cart
 */
Cypress.Commands.add('addVariantsToCart', () => {
  // Setup server
  cy.server()

  // Stub first add to cart requests
  cy.route({
    method: 'POST',
    url: '/addToCart',
    status: 200,
    response: 'fixture:cart/add-clock-computer-13.json'
  }).as('addToCartClockComputer13')

  // Navigate to PDP
  cy.visit('/products/clock_computer')
  // Select the first variant
  cy.contains(/Clock Computer 13'' - £799.00/i).click()
  // Add item to cart
  cy.contains(/Add To Basket/i).click()
  // Check request has been made
  cy.wait('@addToCartClockComputer13')
  // Click the cross to close minibag
  cy.get('.c-minibag__dropdown-cross').click()

  // Stub second add to cart requests
  cy.route({
    method: 'POST',
    url: '/addToCart',
    status: 200,
    response: 'fixture:cart/add-clock-computer-15.json'
  }).as('addToCartClockComputer15')

  // Select the second variant
  cy.contains(/Clock Computer 15'' - £999.00/i).click()
  // Add item to cart
  cy.contains(/Add To Basket/i).click()
  // Check request has been made
  cy.wait('@addToCartClockComputer15')
})

/**
 * Adds promotion code to cart
 * @param {string} promoCode - the promotion code
 */
Cypress.Commands.add('addPromotionCodeToCart', ({ promoCode }) => {
  // Check the promotion form title
  cy.get('.c-coupon-form__title').contains(/Promotion Code/i)
  // Enter a promotion code
  cy.get('.c-coupon-form__input').type(promoCode)
  // Click apply button
  cy.get('.c-coupon-form__button').click()
})
