// Libraries
import request from 'supertest'

// Server
import serverPromise from '../../server/server'

describe('Server', () => {
  // Server Setup
  let server
  beforeAll(async () => { server = await serverPromise })
  afterAll(() => { server.close() })

  describe('GET /order', () => {
    test('redirects to My Account page', async () => {
      // Arrange
      const requestUrl = `http://localhost:${server.address().port}`

      // Act
      const response = await request(requestUrl).get('/order')

      // Assert
      expect(response.statusCode).toEqual(302)
      expect(response.header['location']).toEqual('/account/myaccount')
    })
  })
})
