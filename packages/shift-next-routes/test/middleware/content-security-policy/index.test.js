// lib
const { contentSecurityPolicy } = require('../../../src/middleware/content-security-policy/index')

describe('contentSecurityPolicy()', () => {
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
    get: jest.fn((_path, callback) => {
      return callback(request, response, mockNext)
    })
  }

  test('calls all section CSPs', () => {
    // Arrange
    const options = {}

    // Act
    contentSecurityPolicy(server, options)

    // Assert
    expect(mockNext).toHaveBeenCalledTimes(11)
  })
})
