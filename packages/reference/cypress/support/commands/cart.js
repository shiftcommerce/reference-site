/**
 * Adds variant to cart
 */
Cypress.Commands.add('addVariantToCart', () => {
  // Navigate to PDP
  cy.visit('/products/clock_computer')
  // Select the instock variant
  cy.contains(/Clock Computer 13'' - £799.00/i).click()
  // Add item to cart
  cy.contains(/Add To Basket/i).click()
})

/**
 * Adds variants to cart
 */
Cypress.Commands.add('addVariantsToCart', () => {
  // Navigate to PDP
  cy.visit('/products/clock_computer')
  // Select the first variant
  cy.contains(/Clock Computer 13'' - £799.00/i).click()
  // Add item to cart
  cy.contains(/Add To Basket/i).click()
  // Click the cross to close minibag
  cy.get('.c-minibag__dropdown-cross').click()
  // Select the second variant
  cy.contains(/Clock Computer 15'' - £999.00/i).click()
  // Add item to cart
  cy.contains(/Add To Basket/i).click()
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
