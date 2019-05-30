// Libraries
const csurf = require('csurf')
const helmet = require('helmet')

/**
 * Set HTTP Security Headers
 * @param {object} server - eg. express
 */
const httpSecurityHeaders = (server) => {
  // Enable Cross-Site Request Forgery (CSRF) Protection
  server.use(csurf())

  // Remove 'X-Powered-By:' Express header as this could help attackers
  server.use(helmet.hidePoweredBy())

  // Sets 'Referrer-Policy: no-referrer'
  server.use(helmet.referrerPolicy({
    policy: 'no-referrer'
  }))

  // Sets 'X-XSS-Protection: 1; mode=block'
  server.use(helmet.xssFilter())

  // Sets 'Expect-CT: enforce; max-age=600'
  // Enforces Certificate Transparency, see
  // https://scotthelme.co.uk/a-new-security-header-expect-ct/
  server.use(helmet.expectCt({
    enforce: true,
    maxAge: 600
  }))

  // Sets 'X-Frame-Options: DENY'
  // Prevents the site from being embedded within an iframe
  server.use(helmet.frameguard({
    action: 'deny'
  }))

  // Sets 'X-Content-Type-Options: nosniff'
  // Prevents a browser auto-detecting the type of an asset, meaning it'll only
  server.use(helmet.noSniff())

  // Sets 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload'
  // Prevents insecure HTTP requests, forces HTTPS
  server.use(helmet.hsts({
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
  }))

  // Sets 'X-Permitted-Cross-Domain-Policies: none'
  // Prevents Adobe Flash and Adobe Acrobat from loading content on the site
  server.use(helmet.permittedCrossDomainPolicies())

  // Sets 'X-Download-Options: noopen'
  // Prevent Internet Explorer from executing downloads
  server.use(helmet.ieNoOpen())
}

module.exports = { httpSecurityHeaders: httpSecurityHeaders }
