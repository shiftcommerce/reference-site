describe('My Account', () => {
  describe('Order History', () => {
    it('renders a list of previous orders', () => {
      // Set loggedIn in cookie
      cy.setCookie('signedIn', 'true')

      // Stub requests
      cy.server()

      // Uses custom command - Cypress/support/commands/empty-search.js
      cy.emptySearch()

      // Stub AddressBook request
      cy.route({
        method: 'GET',
        url: '/getAddressBook',
        status: 200,
        response: {}
      }).as('getAddressBook')

      // Stub login request and reply with fixture
      cy.route({
        method: 'POST',
        url: '/login',
        status: 201,
        response: 'fixture:account/login.json'
      }).as('postLogin')

      // Stub getAccount request and reply with fixture
      cy.route({
        method: 'GET',
        url: '/getAccount',
        status: 200,
        response: 'fixture:account/get-account.json'
      }).as('getAccount')

      // Stub customerOrders request and reply with fixture
      cy.route({
        method: 'GET',
        url: '/customerOrders**',
        status: 200,
        response: 'fixture:account/order-history-page-1.json'
      }).as('getCustomerOrders')

      // Navigate to the homepage
      cy.visit('/')

      // Hover over my account and click order history
      cy.contains('My Account').trigger('mouseover')
      cy.contains('Order History').click()

      // Wait for getCustomerOrders to return data
      cy.wait('@getCustomerOrders')

      // Check that the data returned is rendered in a list
      cy.get('.c-order-history-table__row--body').should('have.length', 10)

      // Expand the first order in the list
      cy.get('.c-order-history-table__row--body a').first().click()

      // Expect first order to contain values
      cy.contains(/SLEEK BRONZE SHIRT - 5878872459838/i)
      cy.contains(/quantity1/i)
      cy.contains(/shipping methodClick & Collect Next Day/i)
      cy.contains(/delivery addresscallum barratt/i)
      cy.contains(/£52.21/i)

      cy.contains(/View all orders/).click()
    })

    it('expands an orders details and back again', () => {
      cy.get('.c-myaccount-main').within(($myaccount) => {
        // Click 'VIEW DETAILS' on the last order
        cy.get('.c-order-history-table__row--body a').last().click()

        cy.contains(/£81.51/i)
        cy.contains(/Click & Collect Standard/)

        cy.contains(/£32.57/i)

        cy.contains(/View all orders/).click()

        // Check that we've landed back on the main orders index list
        cy.get('.c-order-history-table__row--body').should('have.length', 10)
      })
    })

    it('paginates orders and navigates between pages', () => {
      cy.get('.c-myaccount-main').within(($myaccount) => {
        cy.route({
          method: 'GET',
          url: '/customerOrders**',
          status: 200,
          response: 'fixture:account/order-history-page-2.json'
        }).as('getCustomerOrdersPage2')

        // Click 'Next' to load the next page
        cy.contains(/Next/).click()

        // Expect to see only 1 order on page 2
        cy.get('.c-order-history-table__row--body').should('have.length', 1)
      })
    })
  })
})
