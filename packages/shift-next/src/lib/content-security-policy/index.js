// Config
import Config from '../config'

// lib
const { buildContentSecurityPolicy } = require('./build-content-security-policy')

/**
 * Enables the Page Content Security Policy
 * @param {String} page - eg. 'Product'
 * @param {object} response  - the HTTP response
 */
const setPageContentSecurityPolicy = (page, response) => {
  const policyOptions = {
    connectHosts: `https://*.algolia.net https://*.algolianet.com,${Config.get().connectHosts || ''}`,
    frameHosts: Config.get().frameHosts,
    imageHosts: Config.get().imageHosts,
    // Unsafe inline is required as that's how we load Stripe
    // TODO: Added 'unsafe-eval' in order for stripe to load correctly and to stop an webpack error "Uncaught TypeError: __webpack_require__(...) is not a function"
    // for react index.js next and next-dev.
    scriptHosts: `'unsafe-inline','unsafe-eval',https://js.stripe.com,https://*.paypal.com,https://*.paypalobjects.com,${Config.get().scriptHosts || ''}`,
    styleHosts: Config.get().styleHosts
  }

  console.log({ page })

  // Build and set the CSP header on the response
  switch (page) {
    case 'Cart':
    case 'Category':
    case 'Login':
    case 'MyAccount':
    case 'Order':
    case 'PasswordReset':
    case 'Product':
    case 'Register':
    case 'Search':
    case 'StaticPage':
      response.set('content-security-policy', buildContentSecurityPolicy(policyOptions))
      console.log({ response })
      return response
    case 'Checkout':
      // Clone & format CSP options
      let formattedPolicyOptions = Object.assign({}, policyOptions)
      formattedPolicyOptions.connectHosts = `https://*.paypal.com,${policyOptions.connectHosts || ''}`
      formattedPolicyOptions.frameHosts = `https://js.stripe.com,https://*.paypal.com,${policyOptions.frameHosts || ''}`
      // Build and set the Checkout CSP header on the response
      response.set('content-security-policy', buildContentSecurityPolicy(formattedPolicyOptions))
      console.log({ response })
      return response

  }
}

module.exports = { setPageContentSecurityPolicy }
