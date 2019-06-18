describe('Search', () => {
  describe('Sorting Results', () => {
    context('global search', () => {
      it('renders products using the default sorting and sends the correct requests', () => {
        // Setup server
        cy.server()

        // Uses custom command - Cypress/support/commands/empty-search.js
        cy.emptySearch()

        cy.route({
          method: 'POST',
          url: '**/1/indexes/**',
          status: 200,
          response: 'fixture:search/search-applied.json'
        }).as('searchApplied')

        // Navigate to homepage
        cy.visit('/')

        // Conduct search
        cy.get('input[type=search]').eq(1).clear().type('computer{enter}')

        // Check page url includes query
        cy.url().should('includes', '/search?query=computer')

        // Check default sorting (desc) - check rendered first product
        cy.contains(/Geeky Computer/i)
        cy.get('.c-product-listing-card img').first().should('have.attr', 'src', 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/248/1544098375.0540378-old_computer.jpg')
        cy.get('.c-product-listing-card__price').first().contains('£150')
        cy.get('.c-product-listing-card__rating').first().find('span.o-rating__star--fill').should('have.length', 3)

        // Stub sorting request
        cy.route({
          method: 'POST',
          url: '**/1/indexes/**',
          status: 200,
          response: 'fixture:search/sort-search-results-desc.json'
        }).as('sortGlobalSearchResultsDESC')

        // Sort products by rating asc
        cy.get('select.ais-SortBy-select').select('Rating desc.')

        // Check request payload
        cy.wait('@sortGlobalSearchResultsDESC').then((xhr) => {
          const requestParams = decodeURI(xhr.requestBody.requests[0].params).replace(/%2C/, ',')
          assert.include(requestParams, 'query=computer')
          assert.include(requestParams, 'facets=["product_rating","current_price"]')
        })

        // Check sorting (desc) is applied - check rendered first product
        cy.contains(/Old Computer/i)
        cy.get('.c-product-listing-card img').first().should('have.attr', 'src', 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/251/1544098376.2380257-geeky_computer.jpg')
        cy.get('.c-product-listing-card__price').first().contains('£550')
        cy.get('.c-product-listing-card__rating').first().find('span.o-rating__star--fill').should('have.length', 5)
      })
    })

    context('category page', () => {
      it('renders products using the default sorting and sends the correct requests', () => {
        // Setup server
        cy.server()

        // Navigate to category page
        // Uses custom command - Cypress/support/commands/category.js
        cy.navigateToCategoryPage()

        // Check default sorting (desc) - check rendered first product
        cy.contains(/Old Computer/i)
        cy.get('.c-product-listing-card img').first().should('have.attr', 'src', 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/248/1544098375.0540378-old_computer.jpg')
        cy.get('.c-product-listing-card__price').first().contains('£150')
        cy.get('.c-product-listing-card__rating').first().find('span.o-rating__star--fill').should('have.length', 3)

        // Stub sorting request
        cy.route({
          method: 'POST',
          url: '**/1/indexes/**',
          // status: 200,
          // response: 'fixture:search/category/sort-search-results-desc.json'
        }).as('sortCategoryProductsDESC')

        // Sort products by rating asc
        cy.get('select.ais-SortBy-select').select('Rating desc.')

        // Check request payload
        cy.wait('@sortCategoryProductsDESC').then((xhr) => {
          const requestParams = decodeURI(xhr.requestBody.requests[0].params)
          assert.include(requestParams, 'query=')
          assert.include(requestParams.replace(/%3A/g, ':'), 'filters=category_ids:73')
          assert.include(requestParams.replace(/%2C/, ','), 'facets=["product_rating","current_price"]')
        })

        // Check page url includes params
        cy.url().should('includes', '/categories/computers?sortBy=referencetest_catalogue_rating_desc')

        // Check sorting (desc) is applied - check rendered first product
        cy.contains(/Geeky Computer/i)
        cy.get('.c-product-listing-card img').first().should('have.attr', 'src', 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/251/1544098376.2380257-geeky_computer.jpg')
        cy.get('.c-product-listing-card__price').first().contains('£550')
        cy.get('.c-product-listing-card__rating').first().find('span.o-rating__star--fill').should('have.length', 5)
      })
    })
  })
})
