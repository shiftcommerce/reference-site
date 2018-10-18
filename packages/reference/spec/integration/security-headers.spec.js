import request from 'supertest'

import serverPromise from '../../server/server.js'

describe('GET /', () => {
  // Configure real server for testing against
  let httpServer
  beforeAll(async () => { httpServer = await serverPromise })
  afterAll(() => httpServer.close())

  test('It should respond with a 200 status', async () => {
    const response = await request(`http://localhost:${httpServer.address().port}`).get('/serviceWorker.js')

    expect(response.statusCode).toBe(200)
  })

  test('It should not respond with an x-powered-by header', async () => {
    const response = await request(`http://localhost:${httpServer.address().port}`).get('/serviceWorker.js')

    // Header keys are lowercased at this point. Here we have decided to check
    // the keys individually against a case insensitive regex in case the
    // library changes this behaviour.
    Object.keys(response.headers).forEach((key) => {
      expect(key).not.toMatch(/^x-powered-by$/i)
    })
  })

  test('It should respond with appropriate security headers', async () => {
    const response = await request(`http://localhost:${httpServer.address().port}`).get('/serviceWorker.js')
    const imageHosts = process.env.IMAGE_HOSTS
    const formattedImageHosts = (imageHosts) ? imageHosts.replace(',', ' ') : ''

    const expectedContentSecurityPolicy = [
      "default-src 'self'",
      `img-src 'self' ${formattedImageHosts}`,
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' https://js.stripe.com",
      'frame-src https://js.stripe.com',
      "connect-src 'self'",
      "form-action 'self'",
      "object-src 'self'",
      'block-all-mixed-content'
    ].join('; ')

    const expectedFeaturePolicy = [
      "vr 'none'",
      "usb 'none'",
      "midi 'none'",
      "camera 'none'",
      "speaker 'none'",
      "payment 'none'",
      "autoplay 'none'",
      "sync-xhr 'none'",
      "gyroscope 'none'",
      "fullscreen 'none'",
      "microphone 'none'",
      "geolocation 'none'",
      "magnetometer 'none'",
      "accelerometer 'none'",
      "encrypted-media 'none'",
      "picture-in-picture 'none'",
      "ambient-light-sensor 'none'"
    ].join('; ')

    expect(response.headers['expect-ct']).toEqual('enforce, max-age=600')
    expect(response.headers['x-frame-options']).toEqual('DENY')
    expect(response.headers['x-xss-protection']).toEqual('1; mode=block')
    expect(response.headers['x-content-type-options']).toEqual('nosniff')
    expect(response.headers['referrer-policy']).toEqual('no-referrer-when-downgrade')
    expect(response.headers['strict-transport-security']).toEqual('max-age=63072000; includeSubDomains; preload')
    expect(response.headers['content-security-policy']).toEqual(expectedContentSecurityPolicy)
    expect(response.headers['feature-policy']).toEqual(expectedFeaturePolicy)
  })
})
