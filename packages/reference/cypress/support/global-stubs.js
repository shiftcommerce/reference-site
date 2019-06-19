/**
 * This runs prior to every test
 * across all files no matter what
 */
beforeEach(() => {
  // Setup server
  cy.server()

  // Stub PayPal logger request
  cy.route({
    method: 'POST',
    url: '/xoplatform/logger/api/logger**',
    status: 200,
    response: "{'events': [], 'meta': '{}'}"
  }).as('payPalLogger')

  // Stub geeky computer image request
  cy.route({
    method: 'GET',
    url: 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/251/1544098376.2380257-geeky_computer.jpg',
    status: 200,
    response: 'fixture:product-image-1.jpg'
  }).as('geekyComputerImage')

  // Stub old computer image request
  cy.route({
    method: 'GET',
    url: 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/248/1544098375.0540378-old_computer.jpg',
    status: 200,
    response: 'fixture:product-image-1.jpg'
  }).as('oldComputerImage')
})
