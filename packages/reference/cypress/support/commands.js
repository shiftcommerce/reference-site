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

Cypress.Commands.add('addVariantToCart', ({ variantId, quantity }) => {
  cy.request('POST', '/addToCart', { variantId, quantity })
})

Cypress.Commands.add('addVariantToCartAndProceedToCheckout', ({ variantId, quantity }) => {
  // Add a product to cart with an API call
  cy.addVariantToCart({ variantId: variantId, quantity: quantity })
  // visit cart page
  cy.visit('/cart')
  // Click the checkout button
  cy.get('.c-cart-summary-buttons__cta--proceed').click()
})

Cypress.Commands.add('navigateToShippingMethodCheckoutPage', () => {
  // Check we are on the Payment Method Page
  cy.url().should('includes', '/checkout/payment-method')
  // Wait for PayPal script and page to be loaded
  cy.wait(3000)
  // Click the test PayPal btn
  cy.contains(/Test PayPal Button/i).click()
  // Check its the Shipping Methods Page
  cy.url().should('includes', '/checkout/shipping-method')
})

Cypress.Commands.add('navigateToReviewCheckoutPage', () => {
  // Stub server request
  cy.server()
  cy.route('POST', '/patchPayPalOrder', {})
  // Check we are on the Payment Method Page
  cy.url().should('includes', '/checkout/payment-method')
  // Wait for PayPal script and page to be loaded
  cy.wait(3000)
  // Click the test PayPal btn
  cy.contains(/Test PayPal Button/i).click()
  // Check its the Shipping Methods Page
  cy.url().should('includes', '/checkout/shipping-method')
  // Wait for page to fully load
  cy.wait(3000)
  // Navigate to the Review Page
  cy.contains(/Review Your Order/i).click()
  // Check its the Review Page Page
  cy.url().should('includes', '/checkout/review')
  // Check Payment Details section header is present
  cy.get('.c-payment__header').contains(/Payment Details/i)
})

Cypress.Commands.add('mockSuccessfulAuthorizePayPalOrderRequest', () => {
  cy.server()
  cy.route('POST', '/authorizePayPalOrder', {
    status: 201,
    data: {
      // generate random id
      id: `${Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36)}`,
      // the returned PayPal status
      status: 'COMPLETED',
      // expires a day from now
      expirationTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    }
  })
})

Cypress.Commands.add('addPromotionCodeToCart', ({ promoCode }) => {
  // Check the promotion form title
  cy.get('.c-coupon-form__title').contains(/Promotion Code/i)
  // Enter a promotion code
  cy.get('.c-coupon-form__input').type(promoCode)
  // Click apply button
  cy.get('.c-coupon-form__button').click()
})
