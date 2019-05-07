// Libraries
import request from 'supertest'

// Server
import serverPromise from '../../server/server'

describe('Server', () => {
  // Server Setup
  let server

  beforeAll(async () => {
    try {
      server = await serverPromise
    } catch (error) {
      console.log(error)
    }
  })

  afterAll(() => { server.close() })

  describe('GET /order', () => {
    test('redirects to My Account page', async () => {
      // Arrange
      const requestUrl = `http://localhost:${server.address().port}`

      // Act // Assert
      request(requestUrl).get('/order').then(response => {
        expect(response.statusCode).toEqual(302)
        expect(response.header['location']).toEqual('/account/myaccount')
      })
    })
  })
})
