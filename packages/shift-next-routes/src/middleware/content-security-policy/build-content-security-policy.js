/**
 * Builds the Content Security Policy
 * @param {object} options - eg. imageHosts, styleHosts, scriptHosts, frameHosts, connectHosts
 */
const buildContentSecurityPolicy = (options = {}) => {
  // Formats provided hosts
  const formatHosts = (hosts) => { return hosts ? hosts.replace(',', ' ') : '' }

  return [
    // Only first party origins are allowed by default
    "default-src 'self'",

    // Only allow first party images or from configured external hosts
    // TODO: data: is insecure, If your goal is security you'd be better off using a sha hash of the script trying to be executed rather than opening up this hole
    // Currently this is a workaround for having inline SVGs https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src
    `img-src 'self' ${formatHosts(options.imageHosts)} data:`,

    // Allow inline style attributes
    `style-src 'self' ${formatHosts(options.styleHosts)} 'unsafe-inline'`,

    // Only allow first party scripts and those from Stripe. Unsafe inline is
    // required as that's how we load Stripe
    // TODO: Added 'unsafe-eval' in order for stripe to load correctly and to stop an webpack error "Uncaught TypeError: __webpack_require__(...) is not a function"
    // for react index.js next and next-dev.  Is this approach safe?
    `script-src 'self' 'unsafe-inline' https://js.stripe.com  https://*.paypal.com https://*.paypalobjects.com  ${formatHosts(options.scriptHosts)} 'unsafe-eval'`,

    // Allow <frame> and <iframe>'s from third party sources.
    `frame-src https://js.stripe.com https://*.paypal.com ${formatHosts(options.frameHosts)}`,

    // Disable loading using script interfaces i.e. <a> pings, Fetch, XHR,
    // WebSocket and EventSource
    `connect-src 'self' https://*.algolia.net https://*.algolianet.com https://*.paypal.com ${formatHosts(options.connectHosts)}`,

    // Enforce that forms point to self
    "form-action 'self'",

    // Block all <object> tags
    "object-src 'self'",

    // Block all insecure requests
    'block-all-mixed-content'
  ].join('; ')
}

module.exports = { buildContentSecurityPolicy: buildContentSecurityPolicy }
