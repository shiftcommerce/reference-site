describe('Static pages', () => {
  before(() => {
    // Setup server
    cy.server()

    // Stub phones slug request
    cy.route({
      method: 'GET',
      url: '/getSlug/**/phones**',
      status: 200,
      response: 'fixture:slug/phones.json'
    }).as('getSlug/phones')

    // Uses custom command - Cypress/support/commands/empty-search.js
    cy.emptySearch()

    // Stub get homepaghe static page request
    cy.route({
      method: 'GET',
      url: '/getStaticPage/57**',
      status: 200,
      response: 'fixture:static-page/homepage.json'
    }).as('getStaticPage/homepage')

    // Stub get phones static page request
    cy.route({
      method: 'GET',
      url: '/getStaticPage/58**',
      status: 200,
      response: 'fixture:static-page/phones.json'
    }).as('getStaticPage/phones')
  })

  it('Navigates from one static page to another', () => {
    cy.visit('/')

    // Check the home page was loaded
    cy.contains(/Test homepage heading/i)

    // Go to another static page using the menu
    cy.get('.o-nav')
      .filter('.u-visible-d')
      .contains(/Mobiles/i)
      .click()

    // Wait for the clientside request to be completed
    cy.wait('@getStaticPage/phones')

    // Check the new static page was loaded
    cy.contains(/Explore our selection of mobile phones/i)

    // Click the logo in the header to navigate back to home
    cy.get('.o-header__logo').click()

    // Wait for the clientside request to be completed
    cy.wait('@getStaticPage/homepage')

    // Check the home page was loaded
    cy.contains(/Test homepage fixture heading/i)
  })
})
