// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Checkout Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const checkoutContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/checkout\/*)/, (req, res, next) => {
    // Clone & format CSP options
    let formattedOptions = Object.assign({}, options)
    formattedOptions.connectHosts = `https://*.paypal.com,${options.connectHosts || ''}`
    formattedOptions.frameHosts = `https://js.stripe.com,https://*.paypal.com,${options.frameHosts || ''}`
    // Unsafe inline is required as that's how we load Stripe
    // TODO: Added 'unsafe-eval' in order for stripe to load correctly and to stop an webpack error "Uncaught TypeError: __webpack_require__(...) is not a function"
    // for react index.js next and next-dev.
    formattedOptions.scriptHosts = `'unsafe-inline','unsafe-eval',https://js.stripe.com,https://*.paypal.com,https://*.paypalobjects.com,${options.scriptHosts || ''}`
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(formattedOptions))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { checkoutContentSecurityPolicy: checkoutContentSecurityPolicy }
