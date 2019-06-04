// libs
const { buildContentSecurityPolicy } = require('../build-content-security-policy')

/**
 * Enables the Checkout Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const checkoutContentSecurityPolicy = (server, options = {}) => {
  server.all(/(\/pages\/checkout\/*)/, (req, res, next) => {
    console.log('CHECKOUT PAGE')
    // Format CSP options
    const formattedOptions = {
      connectHosts: `https://*.paypal.com,${options.connectHosts || ''}`,
      frameHosts: `https://js.stripe.com,https://*.paypal.com,${options.frameHosts || ''}`,
      imageHosts: options.imageHosts,
      scriptHosts: `https://*.paypal.com,https://*.paypalobjects.com,${options.scriptHosts || ''}`,
      styleHosts: options.styleHosts
    }
    // Build and set the CSP header on the response
    res.set('Content-Security-Policy', buildContentSecurityPolicy(formattedOptions))
    // Call the next middleware in the stack
    next()
  })
}

module.exports = { checkoutContentSecurityPolicy: checkoutContentSecurityPolicy }
