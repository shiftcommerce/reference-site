describe('Checkout', () => {
  describe('PayPal', () => {
    context('Navigating To Payment Methods Page', () => {
      it('renders the page correctly', () => {
        // Setup server
        cy.server()

        // Uses custom command - Cypress/support/commands/empty-search.js
        cy.emptySearch()

        // Stub get cart request
        cy.route({
          method: 'GET',
          url: '/getCart',
          status: 200,
          response: 'fixture:cart/get-cart-with-two-line-items.json'
        }).as('getCart')

        // Stub get shipping methods request
        cy.route({
          method: 'GET',
          url: '/getShippingMethods',
          status: 200,
          response: 'fixture:cart/get-shipping-methods.json'
        }).as('getShippingMethods')

        // Uses custom command - Cypress/support/commands/checkout.js
        cy.addVariantsToCartAndProceedToCheckout()
        // Check we are on the Payment Method Page
        cy.url().should('includes', '/checkout/payment-method')
        // Check page title is present
        cy.get('.c-payment-method__header').contains(/Payment Method/i)
        // Check Shipping Address section header is not present
        cy.get('.c-address-form__header').should('not.exist')
        // Check Shipping Method section header is not present
        cy.get('.c-shipping-method__header').should('not.exist')
        // Check Payment Details section is not present
        cy.get('.c-payment__header').should('not.exist')
        // Check that the card button is present
        cy.contains(/Pay By Credit\/Debit Card/i)
        // Check that the PayPal button is present
        cy.get('.paypal-buttons-context-iframe').contains('iframe')
        // Check that the shopping basket is not empty
        cy.contains(/You have 2 items in your shopping basket/i)
        // Check the line item in the shopping basket
        cy.contains(/Clock Computer 13''/i)
        cy.contains(/Clock Computer 15''/i)
        // Check it does not allow line item quantity update
        cy.get('.c-line-items__quantity').find('.c-line-items__quantity-select').should('not.exist')
        // Check it renders the line item quantity
        cy.get('.c-line-items__quantity').find('.c-line-items__quantity-amount').should('exist')

        /**
         * 
         * VALID COUPON SUBMISSION
         * 
        */
        // Stub coupon and cart requests
        cy.route({
          method: 'POST',
          url: '/addCartCoupon',
          status: 201,
          response: 'fixture:checkout/paypal/add-valid-coupon.json'
        }).as('addCartCoupon')

        // Stub cart with single line item and coupon request
        cy.route({
          method: 'GET',
          url: '/getCart',
          status: 200,
          response: 'fixture:checkout/paypal/get-cart-with-single-line-item-and-coupon.json'
        }).as('getCartWithCoupon')

        // Click apply promotion to cart
        // Uses custom command - Cypress/support/commands/cart.js
        cy.addPromotionCodeToCart({ promoCode: 'TESTCOUPON' })
        // Check coupon request payload
        cy.wait('@addCartCoupon')
          .its('requestBody')
          .should('include', {
            couponCode: 'TESTCOUPON'
          })
        // Check the promotion is added to the cart
        cy.contains(/£1 Off/i)

        /**
         * 
         * INVALID COUPON SUBMISSION
         * 
        */
        // Stub invalid coupon requests
        cy.route({
          method: 'POST',
          url: '/addCartCoupon',
          status: 422,
          response: [{
            title: 'Invalid promo code TESSSSSSSTCOUPONSSSSS',
            detail: 'base - Invalid promo code TESSSSSSSTCOUPONSSSSS',
            code: '100',
            source: { pointer: '/data/attributes/base' },
            status: '422'
          }]
        }).as('addInvalidCartCoupon')

        // Click apply promotion to cart
        // Uses custom command - Cypress/support/commands/cart.js
        cy.addPromotionCodeToCart({ promoCode: 'TESSSSSSSTCOUPONSSSSS' })
        // Check coupon request payload
        cy.wait('@addInvalidCartCoupon')
          .its('requestBody')
          .should('include', {
            couponCode: 'TESSSSSSSTCOUPONSSSSS'
          })
        // Check error message is rendered
        cy.contains(/Invalid promo code TESSSSSSSTCOUPONSSSSS/i)

        /**
         * 
         * CONTINUE SHOPPING
         * 
        */
        // Check continue shopping button is present and click
        cy.get('.c-checkout-cart-buttons__cta--continue').click()
        // Check we are redirected to the homepage
        cy.contains(/Test Homepage Heading/i)
        // check url has changed
        cy.url().should('includes', '/')
      })
    })
  })
})
