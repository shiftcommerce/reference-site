describe('PayPal Checkout: Payment Methods Page', () => {
  beforeEach(() => {
    // Add first item to cart
    cy.addVariantToCart({ variantId: '27104', quantity: 1 })
    // Add second item to cart and proceed to checkout
    cy.addVariantToCartAndProceedToCheckout({ variantId: '27103', quantity: 1 })
    // Check we are on the Payment Method Page
    cy.url().should('includes', '/checkout/payment-method')
  })

  it('renders the page correctly', () => {
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
    // Check continue shopping button is present
    cy.contains(/Continue Shopping/i)
    // Check it does not allow line item quantity update
    cy.get('.c-line-items__quantity').find('.c-line-items__quantity-select').should('not.exist')
    // Check it renders the line item quantity
    cy.get('.c-line-items__quantity').find('.c-line-items__quantity-amount').should('exist')
  })

  it('allows customers to continue shopping', () => {
    // Check continue shopping button is present and click
    cy.get('.c-checkout-cart-buttons__cta--continue').click()
    // Check we are redirected to the homepage
    cy.contains(/Test Homepage Heading/i)
    // check url has changed
    cy.url().should('includes', '/')
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
