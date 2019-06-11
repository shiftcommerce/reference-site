describe('Search', () => {
  describe('Global Search', () => {
    it('sends the correct request to the server from the client', () => {
      // Setup server
      cy.server()

      // Stub product search request
      cy.route({
        method: 'POST',
        url: '*',
        status: 200,
        response: 'fixture:search/mug-search.json'
      }).as('postSearch')

      // Visit the homepage
      cy.visit('/')

      cy.wait(1000)

      // Do a search
      cy.get('input[type=search]').eq(1).clear().type('mug{enter}')

      cy.wait(1000)

      // we fire off a request for each key pressed, we're going to check a few of them
      const searches = Array(5).fill('@postSearch')

      // check the request
      cy.wait(searches).then(xhrs => {
        assert.include(xhrs[searches.length - 3].requestBody.requests[0].params, 'query=m')
        assert.include(xhrs[searches.length - 2].requestBody.requests[0].params, 'query=mu')
        assert.include(xhrs[searches.length - 1].requestBody.requests[0].params, 'query=mug') // check the last one is correct
      })

      // check where we ended up
      cy.url().should('include', '/search?query=mug')
      // check the heading is correct
      cy.get('h1').should('contain.text', 'Search "mug"')

      // check the order and contents of products
      cy.get('.c-product-listing-card').eq(0).contains(/first_product_title/)
      cy.get('.c-product-listing-card').eq(0).contains(/£2.30 - £24.91/)
      cy.get('.c-product-listing-card').eq(0).find('img').should('have.attr', 'src').should('include', '1537803709.468034-SEPIA_mug_340ml.jpg')
      cy.get('.c-product-listing-card').eq(0).find('a').should('have.attr', 'href').should('include', 'seed_product_48')
      cy.get('.c-product-listing-card').eq(0).find('span.o-rating__star--fill').should('have.length', 2)

      cy.get('.c-product-listing-card').eq(1).contains(/third_product_title/)
      cy.get('.c-product-listing-card').eq(1).contains(/£30.23 - £69.68/)
      cy.get('.c-product-listing-card').eq(1).find('img').should('have.attr', 'src').should('include', '1537803715.9444022-SCS_mug_250ml.jpg')
      cy.get('.c-product-listing-card').eq(1).find('a').should('have.attr', 'href').should('include', 'seed_product_26')
      cy.get('.c-product-listing-card').eq(1).find('span.o-rating__star--fill').should('have.length', 0)

      cy.get('.c-product-listing-card').eq(2).contains(/fifth_product_title/)
      cy.get('.c-product-listing-card').eq(2).contains(/£15.89 - £86.50/)
      cy.get('.c-product-listing-card').eq(2).find('img').should('have.attr', 'src').should('include', '1537803714.4669538-OCT_mug_300ml.jpg')
      cy.get('.c-product-listing-card').eq(2).find('a').should('have.attr', 'href').should('include', 'seed_product_25')
      cy.get('.c-product-listing-card').eq(2).find('span.o-rating__star--fill').should('have.length', 0)

      cy.get('.c-product-listing-card').eq(3).contains(/seventh_product_title/)
      cy.get('.c-product-listing-card').eq(3).contains(/£44.88 - £95.47/)
      cy.get('.c-product-listing-card').eq(3).find('img').should('have.attr', 'src').should('include', '120/1537803709.9103374-CLK-152_mug.jpg')
      cy.get('.c-product-listing-card').eq(3).find('a').should('have.attr', 'href').should('include', 'seed_product_13')
      cy.get('.c-product-listing-card').eq(3).find('span.o-rating__star--fill').should('have.length', 3)
    })

    it('clears the category selection properly', () => {
      // Visit the category page
      cy.navigateToCategoryPage()
      // clear the category
      cy.get('.c-searchbox__clear-filter').click()
      cy.url().should('include', '/search')
      // check the heading is correct
      cy.get('h1').should('contain.text', 'Showing all products')
    })
  })
})
