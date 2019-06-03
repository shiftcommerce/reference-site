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
  accountPageContentSecurityPolicy(server, options)
  cartPageContentSecurityPolicy(server, options)
  categoryPageContentSecurityPolicy(server, options)
  checkoutContentSecurityPolicy(server, options)
  forgotPasswordPageContentSecurityPolicy(server, options)
  loginPageContentSecurityPolicy(server, options)
  orderPageContentSecurityPolicy(server, options)
  productPageContentSecurityPolicy(server, options)
  registrationPageContentSecurityPolicy(server, options)
  searchPageContentSecurityPolicy(server, options)
  staticPageContentSecurityPolicy(server, options)
}

module.exports = { contentSecurityPolicy: contentSecurityPolicy }
