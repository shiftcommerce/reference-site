describe('Checkout', () => {
  describe('PayPal', () => {
    context('Navigating To Review & Submit Page', () => {
      it('renders the page correctly', () => {
        // Navigate to Review & Submit Checkout Page
        // Uses custom command - Cypress/support/commands/checkout.js
        cy.navigateToReviewCheckoutPage()
        // Check Payment Method section header is present
        cy.get('.c-payment-method__header').contains(/Payment Method/i)
        // Check Shipping Address section header is present
        cy.get('.c-address-form__header').contains(/Shipping Address/i)
        // Check Shipping Address Edit button is not present
        cy.get('.c-address-form__header').find(/Edit/i).should('not.exist')
        // Check Shipping Method section header is present
        cy.get('.c-shipping-method__header').contains(/Shipping Method/i)
        // CheckPayment Details section header is present
        cy.get('.c-payment__header').contains(/Payment Details/i)
        // Check Payment Details Edit button is not present
        cy.get('.c-payment__header').find(/Edit/i).should('not.exist')
        // Check that the shopping basket is not empty
        cy.contains(/You have 1 item in your shopping basket/i)
        // Check the line item in the shopping basket
        cy.contains(/Clock Computer 13''/i)
        // Check shipping method is rendered
        cy.contains(/Cheap Shipping/i)
        // Check it does not allow line item quantity update
        cy.get('.c-line-items__quantity').find('.c-line-items__quantity-select').should('not.exist')
        // Check it renders the line item quantity
        cy.get('.c-line-items__quantity').find('.c-line-items__quantity-amount').should('exist')

        /**
         * 
         * UPDATE SHIPPING METHOD
         * 
        */
        // Stub update shipping method request
        cy.route({
          method: 'POST',
          url: '/setShippingMethod',
          status: 200,
          response: 'fixture:checkout/paypal/set-shipping-method.json'
        }).as('updateShippingMethod')
        // Check Shipping Method Edit button is present and Navigate to the Shipping Method Page
        cy.get('.c-shipping-method__header').contains(/Edit/i).click()
        // Check its the Shipping Methods Page
        cy.url().should('includes', '/checkout/shipping-method')
        // Change the shipping option
        cy.get('input[type="radio"]').last().check({ force: true })
        // Navigate to the Review Page
        cy.contains(/Review Your Order/i).click()
        // Check paypal request payload
        cy.wait('@updateShippingMethod').then((xhr) => {
          assert.include(xhr.requestBody.shippingMethodId, '27')
        })
        // Check its the Review Page Page
        cy.url().should('includes', '/checkout/review')

        /**
         * 
         * MOCK FAILED PAYPAL AUTHORIZATION
         * 
        */
        // Stub patch PayPal Order request
        cy.route({
          method: 'POST',
          url: '/authorizePayPalOrder',
          status: 404,
          response: {}
        }).as('authorizePayPalOrder')

        // Click place order button
        cy.contains(/Place Order/i).click()
        // Check authorize paypal order request payload
        cy.wait('@authorizePayPalOrder').then((xhr) => {
          assert.include(xhr.requestBody.payPalOrderID, '9B29180392286445Y')
        })
        // Check error message is rendered
        cy.contains(/Sorry! There has been a problem authorising your payment. Please try again./i)
        // Check its the Review Page Page
        cy.url().should('includes', '/checkout/review')

        /**
         * 
         * VALID COUPON SUBMISSION
         * 
        */
        // Stub  coupon and cart requests
        cy.route({
          method: 'POST',
          url: '/addCartCoupon',
          status: 201,
          response: 'fixture:checkout/paypal/add-valid-coupon.json'
        }).as('addCartCoupon')

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
        // Stub coupon requests
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
         * ALLOWS CUSTOMERS TO CHANGE PAYMENT METHOD
         * 
        */
        // Check Paym`ent Method Edit button is present and Navigate to the Shipping Method Page
        cy.get('.c-payment-method__header').contains(/Edit/i).click()
        // Check we have been redirected to the Payment Method Page
        cy.url().should('includes', '/checkout/payment-method')
        // Wait for PayPal script and page to be loaded
        cy.wait(3000)
        // Check that the PayPal button is present
        cy.get('.paypal-buttons-context-iframe').contains('iframe')
        // Choose credit card for payment method
        cy.contains(/Pay by credit\/debit card/i).click()
        // Check its the Shipping Address Page
        cy.url().should('includes', '/checkout/shipping-address')
        // Check Shipping Address section header is present
        cy.get('.c-address-form__header').contains(/Shipping Address/i)
        // Check the correct Payment Method is displayed
        cy.get('.c-payment-method__summary').contains('Credit/Debit Card')
      })
    })
  })
})
