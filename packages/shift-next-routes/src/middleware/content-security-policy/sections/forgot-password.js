/**
 * Enables the Forgot Password Page Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const forgotPasswordPageContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/forgotpassword.js)$/, (req, res, next) => {
    console.log('Forgot Pass PAGE')
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(options))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { forgotPasswordPageContentSecurityPolicy: forgotPasswordPageContentSecurityPolicy }
