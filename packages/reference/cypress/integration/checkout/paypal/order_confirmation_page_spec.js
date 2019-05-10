describe('PayPal Checkout: Order Confirmation Page', () => {
  it('successfully places an order', () => {
    // Mock successful PayPal order authorization
    cy.mockSuccessfulAuthorizePayPalOrderRequest()
    // Add item to cart and proceed to checkout
    cy.addVariantToCartAndProceedToCheckout({ variantId: '27104', quantity: 1 })
    // Navigate to Review & Submit Checkout Page
    cy.navigateToReviewCheckoutPage()
    // Check the promotion form title
    cy.get('.c-coupon-form__title').contains(/Promotion Code/i)
    // Enter a promotion code
    cy.get('.c-coupon-form__input').type('TESTCOUPON')
    // Click apply button
    cy.get('.c-coupon-form__button').click()
    // Click place order button
    cy.contains(/Place Order/i).click()
    // Check that the order confirmation page is displayed
    cy.url().should('includes', '/order')
    cy.contains(/Your Order Is Confirmed/i)
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
