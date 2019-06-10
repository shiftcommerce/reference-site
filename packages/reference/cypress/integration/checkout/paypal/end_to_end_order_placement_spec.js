describe('Checkout', () => {
  describe('PayPal', () => {
    context('End To End Order Placement', () => {
      it('successfully places an order', () => {
        // Setup server
        cy.server()

        // Uses custom command - Cypress/support/commands/empty-search.js
        cy.emptySearch()

        // Uses custom command - Cypress/support/commands/checkout.js
        cy.stubSuccessfulAuthorizePayPalOrderRequest()

        // Stub get shipping methods request
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

        // Stub add cart coupon request
        cy.route({
          method: 'POST',
          url: '/addCartCoupon',
          status: 200,
          response: 'fixture:cart/add-cart-coupon.json'
        }).as('addCartCoupon')

        // Navigate to Review & Submit Checkout Page
        // Uses custom command - Cypress/support/commands/checkout.js
        cy.navigateToReviewCheckoutPage()

        // Add promotion code
        cy.addPromotionCodeToCart({ promoCode: 'TESTCOUPON' })

        // Check add promotion coupon request has been made
        cy.wait('@addCartCoupon')

        // Stub create order request
        cy.route({
          method: 'POST',
          url: '/createOrder**',
          status: 201,
          response: 'fixture:checkout/paypal-create-order.json'
        }).as('checkout/paypal-create-order')

        // Click place order button
        cy.contains(/Place Order/i).click()

        // Check create order request has been made
        cy.wait('@checkout/paypal-create-order')

        // Stub get empty cart request
        cy.route({
          method: 'GET',
          url: '/getCart',
          status: 200,
          response: 'fixture:cart/get-cart-empty.json'
        })

        // Check authorise PayPal request has been made
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
  })
})
