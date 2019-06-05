// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/empty-search'
import './commands/address-book'
import './commands/cart'
import './commands/category'
import './commands/checkout'
import './commands/login'
import './commands/products'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Screenshot.defaults({
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true
})

beforeEach(function () {
  // This runs prior to every test
  // across all files no matter what
  cy.server()

  cy.route({
    method: 'POST',
    url: '/xoplatform/logger/api/logger**',
    status: 200,
    response: "{'events': [], 'meta': '{}'}"
  }).as('payPalLogger')

  cy.route({
    method: 'GET',
    url: '/getMenus?**',
    status: 200,
    response: 'fixture:menus/get-menus.json'
  }).as('getMenus')

  cy.route({
    method: 'GET',
    url: 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/251/1544098376.2380257-geeky_computer.jpg',
    status: 200,
    response: 'fixture:product-image-1.jpg'
  }).as('geekyComputerImage')

  cy.route({
    method: 'GET',
    url: 'https://shift-platform-dev.s3-eu-west-1.amazonaws.com/uploads/asset_file/asset_file/248/1544098375.0540378-old_computer.jpg',
    status: 200,
    response: 'fixture:product-image-1.jpg'
  }).as('oldComputerImage')
})
