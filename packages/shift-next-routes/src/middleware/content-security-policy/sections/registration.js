/**
 * Enables the Registration Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const registrationPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/register.js)$/, (req, res, next) => {
    console.log('Account registration PAGE')
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(options))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { registrationPageContentSecurityPolicy: registrationPageContentSecurityPolicy }
