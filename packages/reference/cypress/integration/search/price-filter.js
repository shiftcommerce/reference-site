describe('Search', () => {
  describe('Price Filters', () => {
    it('Filtering by price sends the correct request', () => {
      // Setup server
      cy.server()

      // Stub empty algolia request
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/all-index.json'
      }).as('algoliaFirstCall')

      // Visit homepage
      cy.visit('/')

      // Search
      cy.get('input[type="search"]').eq(1).type('computer{enter}')

      // Stub actual search call
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/computers-response.json'
      }).as('algoliaSearch')

      // Wait for page to load
      cy.wait('@algoliaSearch').then((xhr) => {
        assert.equal(xhr.responseBody.results[0].nbHits, 6, 'values equal')
      })

      // Check page has loaded
      cy.contains('Search "computer"')

      // Check that the correct query is applied to the url
      cy.url().should('includes', '/search?query=computer')

      // Check the number of products
      cy.get('.c-product-listing__counts').contains(/showing 4 of 6 products/i)

      // Renders correct hi-lo values
      cy.get('.ais-RangeSlider').contains('£24')
      cy.get('.ais-RangeSlider').contains('£999')

      // Check that there is no current refinement
      cy.get('.ais-CurrentRefinements--noRefinement').should('exist')

      // Stub actual search call
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/computers-price-filtered.json'
      }).as('algoliaPriceFiltered')

      // Move slider
      cy.get('.input-range__slider').last()
        .trigger('mousedown')
        .trigger('mousemove', { which: 1, clientX: 200 })
        .trigger('mouseup')

      // Check the request is correct
      cy.wait('@algoliaPriceFiltered').then((xhr) => {
        const decodedQuery = decodeURI(xhr.requestBody.requests[0].params).replace(/%3A/, ':')
        assert.include(decodedQuery, 'query=computer')
        assert.include(decodedQuery, 'numericFilters')
        assert.equal(xhr.responseBody.results[0].nbHits, 2, 'values equal')
      })

      // Check the number of products have changed
      cy.get('.c-product-listing__counts').contains(/showing 2 of 2 products/i)

      // Check that filter has been added and removal button is rendered
      cy.get('.ais-CurrentRefinements--noRefinement').should('not.exist')
      cy.get('.ais-CurrentRefinements').should('exist')
      cy.get('.ais-ClearRefinements').contains(/clear all filters/i)

      // Clear Refinements
      cy.get('.ais-ClearRefinements-button').click()

      // Check the number of products has reset
      cy.get('.c-product-listing__counts').contains(/showing 4 of 6 products/i)
    })
  })
})
