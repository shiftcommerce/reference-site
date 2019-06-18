/**
 * Navigates to a PDP from the PLP
 */
Cypress.Commands.add('goToPdpFromPlp', () => {
  // Setup server
  cy.server()

  // Stub products request
  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:products/product-listing.json'
  }).as('getProducts')

  // Stub product request
  cy.route({
    method: 'GET',
    url: '/getProduct/*',
    status: 200,
    response: 'fixture:products/product.json'
  }).as('getProduct')

  // Stub category request
  cy.route({
    method: 'GET',
    url: '/getCategory/*',
    status: 200,
    response: 'fixture:products/get-category.json'
  }).as('getCategory')

  // Visit the PLP
  cy.visit('/categories/computers')

  // Stub slug request
  cy.route({
    method: 'GET',
    url: '/getSlug/**',
    status: 200,
    response: 'fixture:products/get-slug.json'
  }).as('getSlug')

  // Click product
  cy.contains(/Regular Computer/i).click()

  // Check the PDP was loaded
  cy.contains(/Product Details/i)
})
