// Libraries
const helmet = require('helmet')

/**
 * Enables the Content Security Policy
 * @param {Function} server - eg. express
 * @param {object} options - eg. imageHosts, scriptHosts
 */
const contentSecurityPolicy = (server, options = {}) => {
  // Format image and script hosts if any
  const formattedImageHosts = options.imageHosts ? options.imageHosts.split(',') : []
  const formattedScriptHosts = options.scriptHosts ? options.scriptHosts.split(',') : []
  
  server.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      // Allow inline style attributes
      styleSrc: ["'self'", "'unsafe-inline'"],
      // Only allow first party images or from configured external hosts
      // TODO: data: is insecure, currently this is a workaround for having inline SVGs 
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src
      imgSrc: ["'self'", 'data:'].concat(formattedImageHosts),
      // Only allow first party scripts and those from Stripe. Unsafe inline is
      // required as that's how we load Stripe
      // TODO: Added 'unsafe-eval' in order for stripe to load correctly and to stop an webpack error "Uncaught TypeError: __webpack_require__(...) is not a function"
      // for react index.js next and next-dev.  Is this approach safe?
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://js.stripe.com', 'https://*.paypal.com', 'https://*.paypalobjects.com', "'unsafe-eval'"],
      // Allow <frame> and <iframe>'s from third party sources.
      frameSrc: ['https://js.stripe.com', 'https://*.paypal.com'],
      // Disable loading using script interfaces i.e. <a> pings, Fetch, XHR,
      // WebSocket and EventSource
      connectSrc: ["'self'", 'https://*.algolia.net', 'https://*.algolianet.com', 'https://*.paypal.com'].concat(formattedScriptHosts),
      // Enforce that forms point to self
      formAction: ["'self'"],
      // Block all <object> tags
      objectSrc: ["'self'"],
      // Block all insecure requests
      blockAllMixedContent: true
    }
  }))
}

module.exports = { contentSecurityPolicy: contentSecurityPolicy }
