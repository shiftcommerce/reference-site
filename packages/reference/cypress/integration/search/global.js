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
        response: 'fixture:search/computer-search.json'
      }).as('postSearch')

      // Visit the homepage
      cy.visit('/')

      cy.wait(1000)

      // Do a search
      cy.get('input[type=search]').eq(1).clear().type('computer{enter}')

      cy.wait(1000)

      // check the request gets called
      cy.wait('@postSearch')

      // check where we ended up
      cy.url().should('include', '/search?query=computer')
      // check the heading is correct
      cy.get('h1').should('contain.text', 'Search "computer"')

      // check the order and contents of products
      cy.get('.c-product-listing-card').eq(0).contains(/Old Computer/)
      cy.get('.c-product-listing-card').eq(0).contains(/£150/)
      cy.get('.c-product-listing-card').eq(0).find('img').should('have.attr', 'src').should('include', 'old_computer.jpg')
      cy.get('.c-product-listing-card').eq(0).find('a').should('have.attr', 'href').should('include', 'old_computer')
      cy.get('.c-product-listing-card').eq(0).find('span.o-rating__star--fill').should('have.length', 3)

      cy.get('.c-product-listing-card').eq(1).contains(/Geeky Computer/)
      cy.get('.c-product-listing-card').eq(1).contains(/£550/)
      cy.get('.c-product-listing-card').eq(1).find('img').should('have.attr', 'src').should('include', 'geeky_computer.jpg')
      cy.get('.c-product-listing-card').eq(1).find('a').should('have.attr', 'href').should('include', 'geeky_computer')
      cy.get('.c-product-listing-card').eq(1).find('span.o-rating__star--fill').should('have.length', 5)

      cy.get('.c-product-listing-card').eq(2).contains(/Regular Computer/)
      cy.get('.c-product-listing-card').eq(2).contains(/£799.99/)
      cy.get('.c-product-listing-card').eq(2).find('img').should('have.attr', 'src').should('include', 'regular_computer.jpg')
      cy.get('.c-product-listing-card').eq(2).find('a').should('have.attr', 'href').should('include', 'regular_computer')
      cy.get('.c-product-listing-card').eq(2).find('span.o-rating__star--fill').should('have.length', 0)

      cy.get('.c-product-listing-card').eq(3).contains(/Portable Computer/)
      cy.get('.c-product-listing-card').eq(3).contains(/£24.99/)
      cy.get('.c-product-listing-card').eq(3).find('img').should('have.attr', 'src').should('include', 'portable_computer.jpg')
      cy.get('.c-product-listing-card').eq(3).find('a').should('have.attr', 'href').should('include', 'portable_computer')
      cy.get('.c-product-listing-card').eq(3).find('span.o-rating__star--fill').should('have.length', 0)
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
