
const { buildContentSecurityPolicy } = require('../../../src/middleware/content-security-policy/build-content-security-policy')

describe('buildContentSecurityPolicy()', () => {
  describe('image hosts', () => {
    test('correctly formats content-security-policy with a custom image host', () => {
      // Arrange
      const imageHost = 'https://example.com'

      // Act
      const csp = buildContentSecurityPolicy({ imageHosts: imageHost })

      // Assert
      expect(csp).toContain(`img-src 'self' ${imageHost}`)
    })

    test('correctly formats content-security-policy with several custom image hosts', () => {
      // Arrange
      const imageHost1 = 'https://example1.com'
      const imageHost2 = 'https://example2.com'

      // Act
      const csp = buildContentSecurityPolicy({ imageHosts: [imageHost1, imageHost2].join(',') })

      // Assert
      expect(csp).toContain(`img-src 'self' ${imageHost1} ${imageHost2}`)
    })
  })
})