// lib
const { buildContentSecurityPolicy } = require('../../../src/middleware/content-security-policy/build-content-security-policy')

describe('buildContentSecurityPolicy()', () => {
  describe('image hosts', () => {
    test('correctly formats content-security-policy with a custom image host', () => {
      // Arrange
      const imageHost = 'https://image.example.com'

      // Act
      const csp = buildContentSecurityPolicy({ imageHosts: imageHost })

      // Assert
      expect(csp).toContain(`img-src 'self' ${imageHost}`)
    })

    test('correctly formats content-security-policy with several custom image hosts', () => {
      // Arrange
      const imageHost1 = 'https://.image.example1.com'
      const imageHost2 = 'https://image.example2.com'

      // Act
      const csp = buildContentSecurityPolicy({ imageHosts: [imageHost1, imageHost2].join(',') })

      // Assert
      expect(csp).toContain(`img-src 'self' ${imageHost1} ${imageHost2}`)
    })
  })

  describe('style hosts', () => {
    test('correctly formats content-security-policy with a custom style host', () => {
      // Arrange
      const styleHost = 'https://style.example.com'

      // Act
      const csp = buildContentSecurityPolicy({ styleHosts: styleHost })

      // Assert
      expect(csp).toContain(`style-src 'self' ${styleHost}`)
    })

    test('correctly formats content-security-policy with several custom style hosts', () => {
      // Arrange
      const styleHost1 = 'https://style.example1.com'
      const styleHost2 = 'https://style.example2.com'

      // Act
      const csp = buildContentSecurityPolicy({ styleHosts: [styleHost1, styleHost2].join(',') })

      // Assert
      expect(csp).toContain(`style-src 'self' ${styleHost1} ${styleHost2}`)
    })
  })

  describe('script hosts', () => {
    test('correctly formats content-security-policy with a custom script host', () => {
      // Arrange
      const scriptHost = 'https://script.example.com'

      // Act
      const csp = buildContentSecurityPolicy({ scriptHosts: scriptHost })

      // Assert
      expect(csp).toContain(`script-src 'self' ${scriptHost}`)
    })

    test('correctly formats content-security-policy with several custom script hosts', () => {
      // Arrange
      const scriptHost1 = 'https://script.example1.com'
      const scriptHost2 = 'https://script.example2.com'

      // Act
      const csp = buildContentSecurityPolicy({ scriptHosts: [scriptHost1, scriptHost2].join(',') })

      // Assert
      expect(csp).toContain(`script-src 'self' ${scriptHost1} ${scriptHost2}`)
    })
  })

  describe('frame hosts', () => {
    test('correctly formats content-security-policy with a custom frame host', () => {
      // Arrange
      const frameHost = 'https://frame.example.com'

      // Act
      const csp = buildContentSecurityPolicy({ frameHosts: frameHost })

      // Assert
      expect(csp).toContain(`frame-src ${frameHost}`)
    })

    test('correctly formats content-security-policy with several custom frame hosts', () => {
      // Arrange
      const frameHost1 = 'https://frame.example1.com'
      const frameHost2 = 'https://frame.example2.com'

      // Act
      const csp = buildContentSecurityPolicy({ frameHosts: [frameHost1, frameHost2].join(',') })

      // Assert
      expect(csp).toContain(`frame-src ${frameHost1} ${frameHost2}`)
    })
  })

  describe('connect hosts', () => {
    test('correctly formats content-security-policy with a custom connect host', () => {
      // Arrange
      const connectHost = 'https://connect.example.com'

      // Act
      const csp = buildContentSecurityPolicy({ connectHosts: connectHost })

      // Assert
      expect(csp).toContain(`connect-src 'self' ${connectHost}`)
    })

    test('correctly formats content-security-policy with several custom connect hosts', () => {
      // Arrange
      const connectHost1 = 'https://connect.example1.com'
      const connectHost2 = 'https://connect.example2.com'

      // Act
      const csp = buildContentSecurityPolicy({ connectHosts: [connectHost1, connectHost2].join(',') })

      // Assert
      expect(csp).toContain(`connect-src 'self' ${connectHost1} ${connectHost2}`)
    })
  })
})