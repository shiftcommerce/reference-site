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

  // Visit the PLP
  cy.visit('/categories/computers')

  // Click product
  cy.contains(/Hybrid Computer/i).click()

  // Check the PDP was loaded
  cy.contains(/Product Details/i)
})
