Cypress.Commands.add('emptySearch', () => {
  cy.server()

  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/empty-search.json'
  }).as('emptySearch')
})
