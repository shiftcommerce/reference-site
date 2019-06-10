// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

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

Cypress.Commands.add('addPromotionCodeToCart', ({ promoCode }) => {
  // Check the promotion form title
  cy.get('.c-coupon-form__title').contains(/Promotion Code/i)
  // Enter a promotion code
  cy.get('.c-coupon-form__input').type(promoCode)
  // Click apply button
  cy.get('.c-coupon-form__button').click()
})
