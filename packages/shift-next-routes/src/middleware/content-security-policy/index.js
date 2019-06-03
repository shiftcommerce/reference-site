// Section CSPs
const { accountPageContentSecurityPolicy } = require('./sections/account')
const { cartPageContentSecurityPolicy } = require('./sections/cart')
const { categoryPageContentSecurityPolicy } = require('./sections/category')
const { checkoutContentSecurityPolicy } = require('./sections/checkout')
const { forgotPasswordPageContentSecurityPolicy } = require('./sections/forgot-password')
const { loginPageContentSecurityPolicy } = require('./sections/login')
const { orderPageContentSecurityPolicy } = require('./sections/order')
const { productPageContentSecurityPolicy } = require('./sections/product')
const { registrationPageContentSecurityPolicy } = require('./sections/registration')
const { searchPageContentSecurityPolicy } = require('./sections/search')
const { staticPageContentSecurityPolicy } = require('./sections/static-page')

/**
 * Enables the Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options  - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const contentSecurityPolicy = (server, options = {}) => {
  // Set MyAccount CSP
  accountPageContentSecurityPolicy(server, options)
  // Set Cart page CSP
  cartPageContentSecurityPolicy(server, options)
  // Set PLP CSP
  categoryPageContentSecurityPolicy(server, options)
  // Set Checkout CSP
  checkoutContentSecurityPolicy(server, options)
  // Set Forgot Password page CSP
  forgotPasswordPageContentSecurityPolicy(server, options)
  // Set Login page CSP
  loginPageContentSecurityPolicy(server, options)
  // Set Order page CSP
  orderPageContentSecurityPolicy(server, options)
  // Set PDP CSP
  productPageContentSecurityPolicy(server, options)
  // Set Registration page CSP
  registrationPageContentSecurityPolicy(server, options)
  // Set Search page CSP
  searchPageContentSecurityPolicy(server, options)
  // Set static page CSP
  staticPageContentSecurityPolicy(server, options)
}

module.exports = { contentSecurityPolicy: contentSecurityPolicy }
