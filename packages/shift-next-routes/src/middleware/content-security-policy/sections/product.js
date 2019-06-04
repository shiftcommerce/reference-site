// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Product Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const productPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/product.js)$/, (req, res, next) => {
    // Clone & format CSP options
    let formattedOptions = Object.assign({}, options)
    formattedOptions.connectHosts = `https://*.algolia.net https://*.algolianet.com,${options.connectHosts || ''}` 
    // Build and set the CSP header on the response
    res.set('content-security-policy', buildContentSecurityPolicy(formattedOptions))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { productPageContentSecurityPolicy: productPageContentSecurityPolicy }