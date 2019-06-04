Cypress.Commands.add('setupAddressBookFixtures', () => {
  cy.setCookie('signedIn', 'true')

  cy.server()

  // Stub empty algolia request
  cy.route({
    method: 'POST',
    url: '**/1/indexes/**',
    status: 200,
    response: 'fixture:search/empty-search.json'
  }).as('emptySearch')

  // Stub AddressBook request
  cy.route({
    method: 'GET',
    url: '/getAddressBook',
    status: 200,
    response: 'fixture:account/get-address-book.json'
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
    url: '/customerOrders',
    status: 200,
    response: 'fixture:account/order-history.json'
  }).as('getCustomerOrders')

  // Stub createAddressBookEntry request and reply with fixture
  cy.route({
    method: 'POST',
    url: '/createAddressBookEntry',
    status: 200,
    response: {}
  }).as('createAddressBookEntry')

  // Stub createAddressBookEntry request and reply with fixture
  cy.route({
    method: 'POST',
    url: '/updateAddress/**',
    status: 200,
    response: 'fixture:account/update-address.json'
  }).as('updateAddress')

  // Stub deleteAddress request
  cy.route({
    method: 'DELETE',
    url: '/deleteAddress/**',
    status: 200,
    response: {}
  }).as('deleteAddress')
})
