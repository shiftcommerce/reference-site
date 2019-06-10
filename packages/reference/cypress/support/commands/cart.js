/**
 * Adds variant to cart
 * @param {integer} variantId - the variant ID
 * @param {integer} quantity - the required quantity
 */
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

/**
 * Adds promotion code to cart
 * @param {string} promoCode - the promotion code
 */
Cypress.Commands.add('addPromotionCodeToCart', ({ promoCode }) => {
  // Check the promotion form title
  cy.get('.c-coupon-form__title').contains(/Promotion Code/i)
  // Enter a promotion code
  cy.get('.c-coupon-form__input').type(promoCode)
  // Click apply button
  cy.get('.c-coupon-form__button').click()
})
