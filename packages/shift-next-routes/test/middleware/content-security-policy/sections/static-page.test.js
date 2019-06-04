// lib
const { staticPageContentSecurityPolicy } = require('../../../../src/middleware/content-security-policy/sections/static-page')

describe('staticPageContentSecurityPolicy()', () => {
  // Mock request and response objects to help us test the middleware
  const mockNext = jest.fn()
  const request = {}
  let response = {
    headers: {},
    set (header, value) {
      return this.headers[header] = value
    }
  }
  let server = {
    all: jest.fn((_path, callback) => {
      return callback(request, response, mockNext)
    })
  }

  afterEach(() => {
    mockNext.mockClear()
    response.headers = {}
  })

  test('correctly inserts the static page section content-security-policy', () => {
    // Arrange
    const options = {
      imageHosts: 'https://image.example.com',
      styleHosts: 'https://style.example.com',
      scriptHosts: 'https://script.example.com',
      frameHosts: 'https://frame.example.com',
      connectHosts: 'https://connect.example.com' 
    }

    // Act
    staticPageContentSecurityPolicy(server, options)

    // Assert
    const csp = response.headers['content-security-policy']
    expect(csp).toContain(`default-src 'self'`)
    expect(csp).toContain(`img-src 'self' ${options.imageHosts}`)
    expect(csp).toContain(`style-src 'self' ${options.styleHosts}`)
    expect(csp).toContain(`script-src 'self' ${options.scriptHosts}`)
    expect(csp).toContain(`frame-src ${options.frameHosts}`)
    expect(csp).toContain(`connect-src 'self' https://*.algolia.net https://*.algolianet.com ${options.connectHosts}`)
    expect(mockNext).toHaveBeenCalledTimes(1)
  })
})
