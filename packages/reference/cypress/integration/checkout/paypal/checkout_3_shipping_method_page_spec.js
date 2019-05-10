describe('PayPal Checkout: Shipping Methods Page', () => {
  beforeEach(() => {
    // Add item to cart and proceed to checkout
    cy.addVariantToCartAndProceedToCheckout({ variantId: '27103', quantity: 1 })
    // Navigate to Shipping Method Checkout Page
    cy.navigateToShippingMethodCheckoutPage()
  })

  it('renders the page correctly', () => {
    // Check Payment Method section header is present
    cy.get('.c-payment-method__header').contains(/Payment Method/i)
    // Check Shipping Address section header is present
    cy.get('.c-address-form__header').contains(/Shipping Address/i)
    // Check Shipping Method section header is present
    cy.get('.c-shipping-method__header').contains(/Shipping Method/i)
    // Check Payment Details section is not present
    cy.get('.c-payment__header').should('not.exist')
    // Check that the shopping basket is not empty
    cy.contains(/You have 1 item in your shopping basket/i)
    // Check the line item in the shopping basket
    cy.contains(/Clock Computer 13''/i)
    // Check shipping methods are rendered
    cy.contains(/Cheap Shipping/i)
    // Check it does not allow line item quantity update
    cy.get('.c-line-items__quantity').find('.c-line-items__quantity-select').should('not.exist')
    // Check it renders the line item quantity
    cy.get('.c-line-items__quantity').find('.c-line-items__quantity-amount').should('exist')
  })

  it('allows customers to change payment method', () => {
    // Check Payment Method section header is present
    cy.get('.c-payment-method__header').contains(/Payment Method/i)
    // Check Payment Method Edit button is present
    cy.get('.c-payment-method__header').contains(/Edit/i)
    // Check that the shopping basket is not empty
    cy.contains(/You have 1 item in your shopping basket/i)
    // Check the line item in the shopping basket
    cy.contains(/Clock Computer 13''/i)
    // Check shipping methods are rendered
    cy.contains(/Cheap Shipping/i)
    // Navigate to the Payment Method Page
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

  it('does not allow customers to change shipping address', () => {
    // Check Shipping Address section header is present
    cy.get('.c-address-form__header').contains(/Shipping Address/i)
    // Check Shipping Address Edit button is not present
    cy.get('.c-address-form__header').find(/Edit/i).should('not.exist')
    // Check that the shopping basket is not empty
    cy.contains(/You have 1 item in your shopping basket/i)
    // Check the line item in the shopping basket
    cy.contains(/Clock Computer 13''/i)
    // Check shipping methods are rendered
    cy.contains(/Cheap Shipping/i)
  })

  it('displays an error when the PayPal order total cannot be updated after a shipping option has been chosen', () => {
    // Check Shipping Method section header is present
    cy.get('.c-shipping-method__header').contains(/Shipping Method/i)
    // Navigate to the Review Page
    cy.contains(/Review Your Order/i).click()
    // Check error message is rendered
    cy.contains(/Sorry! There has been a problem with your selection. Please try again./i)
    // Check shipping methods are rendered
    cy.contains(/Cheap Shipping/i)
  })

  it('allows customers to apply a promotion code', () => {
    // Click apply promotion to cart
    cy.addPromotionCodeToCart({ promoCode: 'TESTCOUPON' })
    // Check the promotion is added to the cart
    cy.contains(/£1 Off/i)
  })

  it('renders errors when a promotion code is invalid', () => {
    // Click apply promotion to cart
    cy.addPromotionCodeToCart({ promoCode: 'TESSSSSSSTCOUPONSSSSS' })
    // Check error message is rendered
    cy.contains(/Invalid promo code 'TESSSSSSSTCOUPONSSSSS'/i)
  })
})