/**
 * Adds variant to cart and proceeds to checkout
 * @param {integer} variantId - the variant ID
 * @param {integer} quantity - the required quantity
 */
Cypress.Commands.add('addVariantToCartAndProceedToCheckout', () => {
  // Setup server
  cy.server()
  // Stub add to cart request
  cy.route({
    method: 'POST',
    url: '/addToCart',
    status: 200,
    response: 'fixture:cart/add-clock-computer.json'
  }).as('addToCart')
  // Add multiple variants to cart
  cy.addVariantsToCart()
  // visit cart page
  cy.contains(/View Shopping Basket/i).click()
  // Click the checkout button
  cy.get('.c-cart-summary-buttons__cta--proceed').click()
})

/**
 * Navigates to the shipping method checkout page
 */
Cypress.Commands.add('navigateToShippingMethodCheckoutPage', () => {
  // Setup server
  cy.server()

  // Uses custom command - Cypress/support/commands/empty-search.js
  cy.emptySearch()

  // Stub get cart request
  cy.route({
    method: 'GET',
    url: '/getCart',
    status: 200,
    response: 'fixture:cart/get-cart-with-line-item.json'
  }).as('getCart')

  // Stub create address request
  cy.route({
    method: 'POST',
    url: '/createAddress',
    status: 201,
    response: 'fixture:checkout/paypal/create-address.json'
  }).as('createAddress')

  // Stub get shipping methods request
  cy.route({
    method: 'GET',
    url: '/getShippingMethods',
    status: 200,
    response: 'fixture:cart/get-shipping-methods.json'
  }).as('getShippingMethods')

  // Stub set cart billing address request
  cy.route({
    method: 'POST',
    url: '/setCartBillingAddress',
    status: 201,
    response: 'fixture:checkout/paypal/set-cart-billing-address.json'
  }).as('setCartBillingAddress')

  // Stub set cart shipping address request
  cy.route({
    method: 'POST',
    url: '/setCartShippingAddress',
    status: 201,
    response: 'fixture:checkout/paypal/set-cart-shipping-address.json'
  }).as('setCartShippingAddress')

  // Stub set shipping method request
  cy.route({
    method: 'POST',
    url: '/setShippingMethod',
    status: 200,
    response: 'fixture:checkout/paypal/set-shipping-method.json'
  }).as('setShippingMethod')

  // Add item to cart and proceed to checkout
  cy.addVariantToCartAndProceedToCheckout()
  // Check we are on the Payment Method Page
  cy.url().should('includes', '/checkout/payment-method')
  // Wait for PayPal script and page to be loaded
  cy.wait(2500)
  // Click the test PayPal btn
  cy.contains(/Test PayPal Button/i).click()
  // Check its the Shipping Methods Page
  cy.url().should('includes', '/checkout/shipping-method')
})

/**
 * Navigates to the review checkout page
 */
Cypress.Commands.add('navigateToReviewCheckoutPage', () => {
  // Setup server
  cy.server()

  // Stub patch PayPal order request
  cy.route({
    method: 'POST',
    url: '/patchPayPalOrder',
    status: 200,
    response: {}
  }).as('patchPayPalOrder')

  // Navigate to shipping method checkout page
  cy.navigateToShippingMethodCheckoutPage()
  // Wait for page to fully load
  cy.wait(2000)
  // Navigate to the Review Page
  cy.contains(/Review Your Order/i).click()
  // Check patch PayPal order request has been made
  cy.wait('@patchPayPalOrder')
  // Check its the Review Page Page
  cy.url().should('includes', '/checkout/review')
  // Check Payment Details section header is present
  cy.get('.c-payment__header').contains(/Payment Details/i)
})

/**
 * Stubs the authorize PayPal order request
 */
Cypress.Commands.add('stubSuccessfulAuthorizePayPalOrderRequest', () => {
  // Setup server
  cy.server()

  // Stub authorize PayPal order request
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
  }).as('authorizePayPalOrder')
})
