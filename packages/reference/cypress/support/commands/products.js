Cypress.Commands.add('goToPdpFromPlp', () => {
  cy.server()

  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:products/product-listing.json'
  }).as('getProducts')

  cy.route({
    method: 'GET',
    url: '/getProduct/*',
    status: 200,
    response: 'fixture:products/product.json'
  }).as('getProduct')

  cy.route({
    method: 'GET',
    url: '/getCategory/*',
    status: 200,
    response: 'fixture:products/get-category.json'
  }).as('getCategory')

  // Visit the PLP
  cy.visit('/categories/computers')

  cy.route({
    method: 'GET',
    url: '/getSlug/**',
    status: 200,
    response: 'fixture:products/get-slug.json'
  }).as('getSlug')

  // Click product
  cy.contains(/Regular Computer/i).click()

  cy.wait('@getSlug')

  // Check the PDP was loaded
  cy.contains(/Product Details/i)
})
