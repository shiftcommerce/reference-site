describe('Category Page', () => {
  it('renders products correctly and sends correct request', () => {
    // Navigate to category
    cy.navigateToCategoryPage()

    // Check search bar is scoped
    cy.get('.c-searchbox__form').find('.c-searchbox__category-name').contains(/Computers/i)

    // Check clear option is present for scoped category
    cy.get('.c-searchbox__form').find('.c-searchbox__category-name').should('exist')

    // Check product count
    cy.contains(/Showing 4 of 8 products/i)

    // Check load more button is present
    cy.contains(/Load More/i)

    // Check filter options
    cy.contains(/Rating/i)
    cy.contains(/Price/i)

    // Check sorting filter options
    cy.contains(/Sort by/i)
    cy.get('.ais-SortBy').contains(/Featured/i)
    cy.get('.ais-SortBy').contains(/Rating asc/i)
    cy.get('.ais-SortBy').contains(/Rating desc/i)

    // Check rendered first product
    cy.contains(/Geeky Computer/i)
    cy.get('.c-product-listing-card img').first().should('have.attr', 'src', 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/251/1544098376.2380257-geeky_computer.jpg')
    cy.get('.c-product-listing-card__price').first().contains('£550')
    cy.get('.c-product-listing-card__rating').first().find('span.o-rating__star--fill').should('have.length', 5)

    // Check rendered last product
    cy.contains(/Old Computer/i)
    cy.get('.c-product-listing-card img').last().should('have.attr', 'src', 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/248/1544098375.0540378-old_computer.jpg')
    cy.get('.c-product-listing-card__price').last().contains('£150')
    cy.get('.c-product-listing-card__rating').last().find('span.o-rating__star--fill').should('have.length', 3)

    // Stub search request
    cy.route({
      method: 'POST',
      url: '**/1/indexes/**',
      status: 200,
      response: 'fixture:search/category/search-category.json'
    }).as('searchCategory')

    // Conduct search
    cy.get('input[type=search]').eq(1).clear().type('geeky{enter}')

    // Collect all partial searches
    const partialSearches = Array(5).fill('@searchCategory')

    // Check partial search requests are as expected
    cy.wait(partialSearches).then(xhrs => {
      assert.include(xhrs[partialSearches.length - 3].requestBody.requests[0].params, 'query=gee')
      assert.include(xhrs[partialSearches.length - 1].requestBody.requests[0].params, 'query=geeky')
    })

    // Check page url includes query
    cy.url().should('includes', '/categories/computers?query=geeky')

    // Check product count
    cy.contains(/Showing 1 of 1 products/i)

    // Check rendered results
    cy.contains(/Geeky Computer/i)

    cy.get('.c-product-listing-card img').should('have.attr', 'src', '/static/fixtures/product-image-1.jpg')
    cy.get('.c-product-listing-card__price').contains('£550')
    cy.get('.c-product-listing-card__rating').find('span.o-rating__star--fill').should('have.length', 5)
  })
})
