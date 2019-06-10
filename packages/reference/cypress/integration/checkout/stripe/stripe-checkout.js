describe('Checkout', () => {
  describe('Stripe', () => {
    it('Checks a guest user out', () => {
      // Setup server
      cy.server()

      // Uses custom command - Cypress/support/commands/empty-search.js
      cy.emptySearch()

      // Stub create order request
      cy.route({
        method: 'POST',
        url: '/createOrder',
        status: 201,
        response: 'fixture:checkout/stripe/create-order.json'
      }).as('createOrder')

      // Stub cart request with line item
      cy.route({
        method: 'GET',
        url: '/getCart',
        status: 200,
        response: 'fixture:checkout/stripe/cart-with-line-item.json'
      }).as('getCart')

      // Stub create address request
      cy.route({
        method: 'POST',
        url: '/createAddress',
        status: 201,
        response: 'fixture:checkout/create-address.json'
      }).as('createAddress')

      // Stub get shipping methods request
      cy.route({
        method: 'GET',
        url: '/getShippingMethods',
        status: 200,
        response: 'fixture:checkout/get-shipping-methods.json'
      }).as('getShippingMethods')

      // Stub set cart shipping address request
      cy.route({
        method: 'POST',
        url: '/setCartShippingAddress',
        status: 200,
        response: 'fixture:checkout/set-cart-shipping-address.json'
      }).as('setCartShippingAddress')

      // Stub set shipping method request
      cy.route({
        method: 'POST',
        url: '/setShippingMethod',
        status: 200,
        response: 'fixture:checkout/set-shipping-method.json'
      }).as('setShippingMethod')

      // Stub set cart billing address request
      cy.route({
        method: 'POST',
        url: '/setCartBillingAddress',
        status: 200,
        response: 'fixture:checkout/set-cart-billing-address.json'
      }).as('setCartBillingAddress')

      // Start with an item in the cart
      // Uses custom command - Cypress/support/commands/checkout.js
      cy.addVariantToCart({ variantId: '27103', quantity: 1 })

      // Go to the cart page
      cy.visit('/cart')

      // Start checkout
      cy.get('.c-cart-summary-buttons__cta--proceed').click()

      // Check that the PayPal button is present
      cy.get('.paypal-buttons-context-iframe').contains('iframe')

      cy.wait(2000)

      // Choose credit card for payment method
      cy.contains(/Pay by credit\/debit card/i).click()

      // Fill in the shipping address form
      cy.get('#country_code').select('GB')
      cy.get('#first_name').type('John (Test)')
      cy.get('#last_name').type('Smith (Test)')
      cy.get('#line_1').type('1 Test Lane')
      cy.get('#zipcode').type('LS1 3ED')
      cy.get('#city').type('Leeds')
      cy.get('#state').type('West Yorkshire')
      cy.get('#primary_phone').type('07510123456')
      cy.get('#email').type('test@example.com')

      // Navigate to next step
      cy.contains(/View Shipping Options/i).click()

      cy.url({ timeout: 10000 }).should('include', '/checkout/shipping-method')

      // Check create address request has been made
      cy.wait('@createAddress')

      // Check set cart shipping address request has been made
      cy.wait('@setCartShippingAddress')

      // Check get shipping methods request has been made
      cy.wait('@getShippingMethods')

      // Check set shipping method request has been made
      cy.wait('@setShippingMethod')

      // Proceed with the preselected shipping method
      cy.contains(/Continue to payment/i).click()

      cy.url({ timeout: 10000 }).should('include', '/checkout/payment')

      // Fill in card details
      cy.wait(5000)

      cy.get('.__PrivateStripeElement > iframe').then(element => {
        const body = element.contents().find('body')
        let stripe = cy.wrap(body)
        stripe.find('.CardField-number .InputElement').eq(1).click().type('4242424242424242')
        stripe = cy.wrap(body)
        stripe.find('.CardField-expiry .InputElement').click().type('4242')
        stripe = cy.wrap(body)
        stripe.find('.CardField-cvc .InputElement').click().type('424')
      })

      // Navigate to next step
      cy.contains(/Review your order/i).click()

      // Place the order
      cy.contains(/Place order/i).click()

      // Check that the order confirmation page is displayed
      cy.contains(/Your order is confirmed/i)
    })
  })
})