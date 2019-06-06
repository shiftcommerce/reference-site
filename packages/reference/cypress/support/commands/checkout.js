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
  // visit homepage so we can get cookie
  cy.visit('/').then(() => {
    // fetch cookies
    cy.getCookies().then((cookies) => {
      const requestOption = {
        method: 'POST',
        url: '/addToCart',
        body: { variantId, quantity },
        headers: {
          // extract and set csrf token
          'x-xsrf-token': cookies.find((cookie) => { return cookie.name === '_csrf' }).value
        }
      }
      // make request to add cart
      return cy.request(requestOption)
    })
  })
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
  // Stub requests
  cy.server()

  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/empty-search.json'
  }).as('emptySearch')

  cy.route({
    method: 'GET',
    url: '/getCart',
    status: 200,
    response: 'fixture:cart/get-cart-with-line-item.json'
  }).as('getCart')

  cy.route({
    method: 'POST',
    url: '/createAddress',
    status: 201,
    response: 'fixture:checkout/paypal/create-address.json'
  }).as('createAddress')

  cy.route({
    method: 'GET',
    url: '/getShippingMethods',
    status: 200,
    response: 'fixture:cart/get-shipping-methods.json'
  }).as('getShippingMethods')

  cy.route({
    method: 'POST',
    url: '/setCartBillingAddress',
    status: 201,
    response: 'fixture:checkout/paypal/set-cart-billing-address.json'
  }).as('setCartBillingAddress')

  cy.route({
    method: 'POST',
    url: '/setCartShippingAddress',
    status: 201,
    response: 'fixture:checkout/paypal/set-cart-shipping-address.json'
  }).as('setCartShippingAddress')

  cy.route({
    method: 'POST',
    url: '/setShippingMethod',
    status: 200,
    response: 'fixture:checkout/paypal/set-shipping-method.json'
  }).as('setShippingMethod')

  // Add item to cart and proceed to checkout
  cy.addVariantToCartAndProceedToCheckout({ variantId: '27103', quantity: 1 })
  // Check we are on the Payment Method Page
  cy.url().should('includes', '/checkout/payment-method')
  // Wait for PayPal script and page to be loaded
  cy.wait(2500)
  // Click the test PayPal btn
  cy.contains(/Test PayPal Button/i).click()
  // Check its the Shipping Methods Page
  cy.url().should('includes', '/checkout/shipping-method')
})

Cypress.Commands.add('navigateToReviewCheckoutPage', () => {
  // Stub requests
  cy.server()

  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/empty-search.json'
  }).as('emptySearch')

  cy.route({
    method: 'POST',
    url: '/createAddress',
    status: 201,
    response: 'fixture:checkout/paypal/create-address.json'
  }).as('createAddress')

  cy.route({
    method: 'GET',
    url: '/getShippingMethods',
    status: 200,
    response: 'fixture:cart/get-shipping-methods.json'
  }).as('getShippingMethods')

  cy.route({
    method: 'POST',
    url: '/setCartBillingAddress',
    status: 201,
    response: 'fixture:checkout/paypal/set-cart-billing-address.json'
  }).as('setCartBillingAddress')

  cy.route({
    method: 'POST',
    url: '/setCartShippingAddress',
    status: 201,
    response: 'fixture:checkout/paypal/set-cart-shipping-address.json'
  }).as('setCartShippingAddress')

  cy.route({
    method: 'POST',
    url: '/setShippingMethod',
    status: 200,
    response: 'fixture:checkout/paypal/set-shipping-method.json'
  }).as('setShippingMethod')

  cy.route({
    method: 'POST',
    url: '/patchPayPalOrder',
    status: 200,
    response: {}
  }).as('patchPayPalOrder')

  // Add item to cart and proceed to checkout
  cy.addVariantToCartAndProceedToCheckout({ variantId: '27103', quantity: 1 })
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
  }).as('authorizePayPalOrder')
})

Cypress.Commands.add('addPromotionCodeToCart', ({ promoCode }) => {
  // Check the promotion form title
  cy.get('.c-coupon-form__title').contains(/Promotion Code/i)
  // Enter a promotion code
  cy.get('.c-coupon-form__input').type(promoCode)
  // Click apply button
  cy.get('.c-coupon-form__button').click()
})
