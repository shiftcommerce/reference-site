/**
 * Enables the Static Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const staticPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/staticpage.js)$/, (req, res, next) => {
    console.log('Static Page PAGE')
    // Build and set the CSP header on the response
    res.set('content-security-policy', buildContentSecurityPolicy(options))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { staticPageContentSecurityPolicy: staticPageContentSecurityPolicy }
