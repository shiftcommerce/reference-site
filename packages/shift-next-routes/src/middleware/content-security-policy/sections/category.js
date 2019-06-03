// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Category Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const categoryPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/category.js)$/, (req, res, next) => {
    console.log('Category PAGE')
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(options))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { categoryPageContentSecurityPolicy: categoryPageContentSecurityPolicy }
