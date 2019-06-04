// Libraries
const csurf = require('csurf')
const helmet = require('helmet')

/**
 * Sets HTTP Security Headers
 * 
 * The following headers are added:
 *  - Referrer-Policy: no-referrer
 *  - X-XSS-Protection: 1; mode=block
 *  - Expect-CT: enforce; max-age=600
 *  - X-Frame-Options: DENY
 *  - X-Content-Type-Options: nosniff
 *  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
 *  - X-Permitted-Cross-Domain-Policies: none
 *  - X-Download-Options: noopen
 * 
 * The following headers are removed:
 *  - X-Powered-By: Express
 * 
 * Also enables CSRF protection 
 * 
 * @param {Function} server - eg. express
 */
const httpSecurityHeaders = (server) => {
  // Remove 'X-Powered-By: Express' header as this could help attackers
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

  // Enable Cross-Site Request Forgery (CSRF) Protection
  server.use(csurf())
  server.all('*', (req, res, next) => {
    // set csrf token in cookie
    res.cookie('_csrf', req.csrfToken())
    next()
  })
}

module.exports = { httpSecurityHeaders }
