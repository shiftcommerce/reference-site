describe('Search', () => {
  describe('Rating Filters', () => {
    beforeEach(() => {
      // Stub requests
      cy.server()

      // Stub initial empty algolia request
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/empty-search.json'
      }).as('emptySearch')
    })

    it('sends the correct request', () => {
      // Navigate to the homepage
      cy.visit('/')

      // Stub the request once a search is applied
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/search-applied.json'
      }).as('searchApplied')

      // Search for products
      cy.get('input[type=search]').eq(1).clear().type('computer{enter}')

      // Check search applied request has been made
      cy.wait('@searchApplied')

      // Check the URL updates correctly
      cy.url().should('includes', '/search?query=computer')

      // Check search applied request has been made
      cy.wait('@searchApplied')

      // Stub the request when a rating filter is applied
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/rating-filter-applied.json'
      }).as('ratingFilterApplied')

      // Select a rating filter
      cy.get('ul>li').eq(1).click()

      // Check the request is correct
      cy.wait('@ratingFilterApplied').then((xhr) => {
        const decodedQuery = decodeURI(xhr.requestBody.requests[0].params).replace(/%3A/, ':')
        assert.include(decodedQuery, 'query=computer')
        assert.include(decodedQuery, 'facetFilters=[["product_rating:4"]]')
      })
    })

    it('shows correct filter removal buttons when a rating filter is applied', () => {
      // Navigate to the homepage
      cy.visit('/')

      // Stub the request once a search is applied
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/search-applied.json'
      }).as('searchApplied')

      // Search for products
      cy.get('input[type=search]').eq(1).clear().type('computer{enter}')

      // Check search applied request has been made
      cy.wait('@searchApplied')

      // Check the URL updates correctly
      cy.url().should('includes', '/search?query=computer')

      // Check search applied request has been made
      cy.wait('@searchApplied')

      // Stub the request when a rating filter is applied
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/rating-filter-applied.json'
      }).as('ratingFilterApplied')

      // Select a rating filter
      cy.get('ul>li').eq(1).click()

      // Check we render a 'clear all filters' button when rating
      // filter is applied
      cy.contains(/Clear all filters/i)

      // Check button to remove just the rating filter is rendered
      cy.get('button[class="ais-CurrentRefinements-delete"]')
    })

    it('does not render rating filters when a search yields no results', () => {
      // Navigate to the homepage
      cy.visit('/')

      // Do a search which should yield no results
      cy.get('input[type=search]').eq(1).type('jackets')

      // Check the rating filters are not being rendered
      cy.get('ul[class="ais-RefinementList-list"]').should('not.exist')
    })

    it('renders the correct product count', () => {
      // Navigate to the homepage
      cy.visit('/')

      // Stub the request once a search is applied
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/search-applied.json'
      }).as('searchApplied')

      // Search for products
      cy.get('input[type=search]').eq(1).clear().type('computer{enter}')

      // Check search applied request has been made
      cy.wait('@searchApplied')

      // Check the URL updates correctly
      cy.url().should('includes', '/search?query=computer')

      // Check search applied request has been made
      cy.wait('@searchApplied')

      // Stub the request when a rating filter is applied
      cy.route({
        method: 'POST',
        url: '**/1/indexes/**',
        status: 200,
        response: 'fixture:search/rating-filter-applied.json'
      }).as('ratingFilterApplied')

      // Select the first rating filter containing 2 products
      cy.get('ul>li').eq(1).should('contain', 2).click()

      // Expect just 2 products to be displayed
      cy.contains(/Showing 2 of 2 products/i)

      // Check response contains just 2 results
      cy.wait('@ratingFilterApplied').then((xhr) => {
        assert.lengthOf(xhr.responseBody.results, 2, 'array has length of 2')
      })
    })
  })
})
