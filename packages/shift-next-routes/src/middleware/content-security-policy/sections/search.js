// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Search Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const searchPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/search.js)/, (req, res, next) => {
    console.log('Search PAGE')
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(options))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { searchPageContentSecurityPolicy: searchPageContentSecurityPolicy }