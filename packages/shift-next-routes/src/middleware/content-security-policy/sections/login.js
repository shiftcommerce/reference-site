// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Login Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const loginPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/account\/login.js)$/, (req, res, next) => {
    // Clone & format CSP options
    let formattedOptions = Object.assign({}, options)
    formattedOptions.connectHosts = `https://*.algolia.net https://*.algolianet.com,${options.connectHosts || ''}`
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(formattedOptions))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { loginPageContentSecurityPolicy: loginPageContentSecurityPolicy }
