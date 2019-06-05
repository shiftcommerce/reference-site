describe('Stripe checkout', () => {
  it('Checks a guest user out', () => {
    cy.server()

    cy.route({
      method: 'POST',
      url: '**/1/indexes/**',
      status: 200,
      response: 'fixture:search/empty-search.json'
    }).as('emptySearch')

    cy.route({
      method: 'POST',
      url: '/createOrder',
      status: 201,
      response: 'fixture:checkout/stripe-create-order.json'
    }).as('createOrder')

    cy.route({
      method: 'GET',
      url: '/getCart',
      status: 200,
      response: 'fixture:cart/get-cart-with-line-item.json'
    }).as('getCart')

    cy.route({
      method: 'POST',
      url: '/createAddress',
      status: 200,
      response: 'fixture:checkout/create-address.json'
    }).as('createAddress')

    // Start with an item in the cart
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
    cy.get('#email').type('test@example.com')
    cy.get('#primary_phone').type('07510123456')

    cy.route({
      method: 'POST',
      url: '/setCartShippingAddress',
      status: 200,
      response: 'fixture:checkout/set-cart-shipping-address.json'
    }).as('setCartShippingAddress')

    // Navigate to next step
    cy.contains(/View Shipping Options/i).click()

    cy.wait(3000)

    // Proceed with the preselected shipping method
    cy.contains(/Continue to payment/i).click()

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
