/**
 * Stubs empty search request
 */
Cypress.Commands.add('emptySearch', () => {
  // Setup server
  cy.server()

  // Stub initial empty algolia search request
  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/empty-search.json'
  }).as('emptySearch')
})
