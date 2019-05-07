describe('Static pages', () => {
  it('Navigates from one static page to another', () => {
    // Start a mock server so we can wait for static page requests
    cy.server()
    cy.route('GET', '/getStaticPage/*').as('getStaticPage')

    cy.visit('/')

    // Check the home page was loaded
    cy.contains(/Test homepage heading/i)

    // Go to another static page using the menu
    cy.get('.o-nav')
      .filter('.u-visible-d')
      .contains(/Mobiles/i)
      .click()

    // Check the new static page was loaded
    cy.wait('@getStaticPage')
    cy.contains(/Explore our selection of mobile phones/i)

    // Click the logo in the header
    cy.get('.o-header__logo').click()

    // Check the home page was loaded
    cy.contains(/Test homepage heading/i)
  })
})
