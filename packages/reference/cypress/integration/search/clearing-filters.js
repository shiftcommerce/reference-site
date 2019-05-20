describe('Search', () => {
  context('clearing filters', () => {
    it('clears all filters sends correct request', () => {
      // Stub requests
      cy.server()

      // Setup initial request (returns all products)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/default.json'
      })

      // Goto search index
      cy.visit('/search')

      // Setup next request (returns all that are 5 stars)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/five-star-filtered.json'
      })

      // Click 5 star filter
      cy.get('.ais-RefinementList-item:nth-child(1) label').click()

      // Button to clear all filters should enabled
      cy.get('button.ais-ClearRefinements-button').should('not.be.disabled')
      // Current filters should include one for '5'
      cy.get('.ais-CurrentRefinements-category:nth-child(2) .ais-CurrentRefinements-categoryLabel').contains(/5/)

      // Setup next request (returns all that are 5 and 4 stars)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/five-and-four-star-filtered.json'
      })

      // Click 4 star filter
      cy.get('.ais-RefinementList-item:nth-child(2) label').click()

      // Button to clear all filters should enabled
      cy.get('button.ais-ClearRefinements-button').should('not.be.disabled')

      // Setup next request (returns all that are 4 stars)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/default.json'
      })

      // Click button to clear all filters
      cy.get('button.ais-ClearRefinements-button').click()

      // Button to clear all filters should now be disabled
      cy.get('button.ais-ClearRefinements-button').should('be.disabled')
    })

    it('clearing individual filter sends correct request', () => {
      // Stub requests
      cy.server()

      // Setup initial request (returns all products)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/default.json'
      })

      // Goto search index
      cy.visit('/search')

      // Setup next request (returns all that are 5 stars)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/five-star-filtered.json'
      })

      // Click 5 star filter
      cy.get('.ais-RefinementList-item:nth-child(1) label').click()

      // Button to clear all filters should enabled
      cy.get('button.ais-ClearRefinements-button').should('not.be.disabled')
      // Current filters should include one for '5'
      cy.get('.ais-CurrentRefinements-category:nth-child(2) .ais-CurrentRefinements-categoryLabel').contains(/5/)

      // Setup next request (returns all that are 5 and 4 stars)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/five-and-four-star-filtered.json'
      })

      // Click 4 star filter
      cy.get('.ais-RefinementList-item:nth-child(2) label').click()

      // Button to clear all filters should enabled
      cy.get('button.ais-ClearRefinements-button').should('not.be.disabled')
      // Current filters should include one for '4'
      cy.get('.ais-CurrentRefinements-category:nth-child(3) .ais-CurrentRefinements-categoryLabel').contains(/4/)

      // Setup next request (returns all that are 4 stars)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/four-star-filtered.json'
      }).as('getSearchProducts')

      // Unclick the first filter
      cy.get('.ais-CurrentRefinements-category:nth-child(2) .ais-CurrentRefinements-delete').click()

      // Button to clear all filters should enabled
      cy.get('button.ais-ClearRefinements-button').should('not.be.disabled')
      // Current filters should include one for '4'
      cy.get('.ais-CurrentRefinements-category:nth-child(2) .ais-CurrentRefinements-categoryLabel').contains(/4/)

      // Check request payload
      cy.wait('@getSearchProducts')
        .its('requestBody.requests')
        .should('include', {
          indexName: 'reference_test_suite',
          params: 'query=&hitsPerPage=4&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&distinct=50&facets=%5B%22product_rating%22%2C%22variant_meta_data.eu.price%22%5D&tagFilters=&facetFilters=%5B%5B%22product_rating%3A4%22%5D%5D'
        })
    })
  })
})
