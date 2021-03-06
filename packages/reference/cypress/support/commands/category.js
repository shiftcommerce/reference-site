/**
 * Navigates to the computers category page
 */
Cypress.Commands.add('navigateToCategoryPage', () => {
  // Setup server
  cy.server()

  // Uses custom command - Cypress/support/commands/empty-search.js
  cy.emptySearch()

  // Stub category products request
  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/category/get-category-products.json'
  }).as('fetchCategoryProducts')

  // Stub category request
  cy.route({
    method: 'GET',
    url: '/getCategory/*',
    status: 200,
    response: 'fixture:search/category/get-category.json'
  }).as('getCategory')

  // Visit computers category page
  cy.visit('/categories/computers')

  // Check request payload
  cy.wait('@fetchCategoryProducts').then((xhr) => {
    const requestParams = xhr.requestBody.requests[0].params.replace(/%3A/g, ':')
    assert.include(requestParams, 'query=')
    assert.include(requestParams, 'filters=category_ids:73')
  })

  // Check platform category request is made
  cy.wait('@getCategory')

  // Check page url is correct
  cy.url().should('includes', '/categories/computers')

  // Check page heading
  cy.contains(/Computers/i)
})
