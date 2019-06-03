// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Checkout Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const checkoutContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/checkout\/*)/, (req, res, next) => {
    console.log({ req: req.url })
    console.log('CHECKOUT PAGE')
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy())
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { checkoutContentSecurityPolicy: checkoutContentSecurityPolicy }
