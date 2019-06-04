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
  let insertedCSPSectionPaths = []
  let server = {
    get: jest.fn((path, callback) => {
      // collect all called section paths
      insertedCSPSectionPaths.push(path)
      // return callback
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
    expect(insertedCSPSectionPaths).toEqual([
      /(\/pages\/account\/myaccount.js)$/,
      /(\/pages\/cart.js)$/,
      /(\/pages\/category.js)$/,
      /(\/pages\/checkout\/*)/,
      /(\/pages\/account\/forgotpassword.js)$/,
      /(\/pages\/account\/login.js)$/,
      /(\/pages\/order.js)$/,
      /(\/pages\/product.js)$/,
      /(\/pages\/account\/register.js)$/,
      /(\/pages\/search.js)/,
      /(\/pages\/staticpage.js)$/
    ])
    mockNext.mockRestore()
  })
})
