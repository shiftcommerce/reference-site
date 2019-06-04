// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Order Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const orderPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/order.js)$/, (req, res, next) => {
    // Format CSP options
    let formattedOptions = options
    formattedOptions.connectHosts = `https://*.algolia.net https://*.algolianet.com,${options.connectHosts || ''}` 
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(formattedOptions))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { orderPageContentSecurityPolicy: orderPageContentSecurityPolicy }
