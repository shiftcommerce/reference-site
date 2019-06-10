describe('Search', () => {
  context('pagination', () => {
    it('load more sends correct requests, load more button hides when no more products, correct product counts', () => {
      // Stub requests
      cy.server()

      // Setup initial request (returns all products)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/default.json'
      }).as('defaultSearch')

      // Goto search index
      cy.visit('/search')

      // Check product count is correct
      cy.get('.c-product-listing__counts').contains('Showing 4 of 9 products')

      // Setup next request (returns page 2 of products)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/default-page-two.json'
      }).as('getSearchProducts')

      // Click Load More CTA
      cy.get('button.c-product-listing__view-more-button').click()

      // Check request for next page is correct
      cy.wait('@getSearchProducts')
        .its('requestBody.requests')
        .should('include', {
          indexName: 'reference_test_suite',
          params: 'query=&hitsPerPage=4&maxValuesPerFacet=10&page=1&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&distinct=50&facets=%5B%22product_rating%22%2C%22variant_meta_data.eu.price%22%5D&tagFilters='
        })

      // Check product count is correct
      cy.get('.c-product-listing__counts').contains('Showing 8 of 9 products')

      // Setup next request (returns page 3 of products)
      cy.route({
        method: 'POST',
        url: '**/indexes/**',
        status: 200,
        response: 'fixture:search/default-page-three.json'
      }).as('getSearchProducts')

      // Click Load More CTA
      cy.get('button.c-product-listing__view-more-button').click()

      // Check request for next page is correct
      cy.wait('@getSearchProducts')
        .its('requestBody.requests')
        .should('include', {
          indexName: 'reference_test_suite',
          params: 'query=&hitsPerPage=4&maxValuesPerFacet=10&page=2&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&distinct=50&facets=%5B%22product_rating%22%2C%22variant_meta_data.eu.price%22%5D&tagFilters='
        })

      // Check product count is correct
      cy.get('.c-product-listing__counts').contains('Showing 9 of 9 products')

      // Check Load More button is removed
      cy.get('button.c-product-listing__view-more-button').should('not.exist')

      // Check 'Showing all results' message exists in place of the load more CTA
      cy.get('.c-product-listing__view-more').contains('Showing all results')
    })
  })
})
