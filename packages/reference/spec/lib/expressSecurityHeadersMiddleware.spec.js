import expressSecurityHeadersMiddleware from '../../lib/expressSecurityHeadersMiddleware'

describe('expressSecurityHeadersMiddleware', () => {
  // Mock callback method
  const mockNext = jest.fn()
  // Mock request and response objects to help us test the middleware
  const request = {
    body: {}
  }
  const response = {
    headers: {},
    set (newHeaders) {
      this.headers = newHeaders
    }
  }

  afterEach(() => {
    mockNext.mockClear()
    response.headers = {}
  })

  test('correctly formats content-security-policy with a custom image host', () => {
    const imageHost = 'https://example.com'
    const callMiddleware = expressSecurityHeadersMiddleware({ imageHosts: imageHost })

    callMiddleware(request, response, mockNext)

    expect(response.headers['content-security-policy']).toContain(`img-src 'self' ${imageHost}`)
    expect(mockNext).toHaveBeenCalledTimes(1)
  })

  test('correctly formats content-security-policy with several custom image hosts', () => {
    const imageHost1 = 'https://example1.com'
    const imageHost2 = 'https://example2.com'
    const callMiddleware = expressSecurityHeadersMiddleware({ imageHosts: [imageHost1, imageHost2].join(',') })

    callMiddleware(request, response, mockNext)

    expect(response.headers['content-security-policy']).toContain(`img-src 'self' ${imageHost1} ${imageHost2}`)
    expect(mockNext).toHaveBeenCalledTimes(1)
  })
})
