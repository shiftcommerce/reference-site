Cypress.Commands.add('navigateToCategoryPage', () => {
  // stub requests
  cy.server()

  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/category/get-category-products.json'
  }).as('fetchCategoryProducts')

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
