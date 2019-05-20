describe('PayPal Checkout: End To End Order Placement', () => {
  it('successfully places an order', () => {
    cy.server()

    // Stub out the Algolia request
    cy.route({
      method: 'POST',
      url: '**/1/indexes/**',
      status: 200,
      response: 'fixture:search/empty-search.json'
    }).as('emptySearch')

    cy.route({
      method: 'GET',
      url: '/getShippingMethods',
      status: 200,
      response: 'fixture:cart/get-shipping-methods.json'
    }).as('getShippingMethods')

    cy.route({
      method: 'GET',
      url: '/getCart',
      status: 200,
      response: 'fixture:cart/get-cart-with-line-item.json'
    }).as('getCart')

    cy.route({
      method: 'POST',
      url: '/addCartCoupon',
      status: 200,
      response: 'fixture:cart/add-cart-coupon.json'
    }).as('addCartCoupon')

    // Mock successful PayPal order authorization
    cy.mockSuccessfulAuthorizePayPalOrderRequest()

    // Add item to cart and proceed to checkout
    cy.addVariantToCartAndProceedToCheckout({ variantId: '27104', quantity: 1 })

    cy.wait('@getCart')

    // Navigate to Review & Submit Checkout Page
    cy.navigateToReviewCheckoutPage()

    // Check the promotion form title
    cy.get('.c-coupon-form__title').contains(/Promotion Code/i)

    // Enter a promotion code
    cy.get('.c-coupon-form__input').type('TESTCOUPON')

    // Click apply button
    cy.get('.c-coupon-form__button').click()

    cy.route({
      method: 'POST',
      url: '/createOrder**',
      status: 201,
      response: 'fixture:checkout/paypal-create-order.json'
    }).as('checkout/paypal-create-order')

    // Click place order button
    cy.contains(/Place Order/i).click()

    cy.route({
      method: 'GET',
      url: '/getCart',
      status: 200,
      response: 'fixture:cart/get-cart-empty.json'
    })

    cy.wait('@authorizePayPalOrder')

    // Check that the order confirmation page is displayed
    cy.get('.c-order__header-tick')
    cy.contains(/Your Order Is Confirmed/i)
    cy.url().should('includes', '/order')

    // Check the ordered line item
    cy.contains(/Clock Computer 15''/i)

    // Check billing address
    cy.contains(/1 Main Terrace/i)

    // Check shipping address
    cy.contains(/Shift Commerce Ltd/i)

    // Check customer name
    cy.contains(/Test Example/i)

    // Check shipping method
    cy.contains(/Cheap Shipping/i)

    // Check continue shopping button is present and click
    cy.get('.c-order__button--continue').click()

    // Check we are redirected to the homepage
    cy.contains(/Test Homepage Heading/i)
  })
})