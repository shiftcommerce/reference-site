// Libs
import { getSessionExpiryTime } from '../../src/lib/session'
import Config from '../../src/lib/config'

const RealDate = Date

// Update Date.now() to return 2019-01-01
beforeAll(() => {
  global.Date = class extends Date {
    static now () {
      // 2019-01-01 00:00:00 in miliseconds
      return 1546300800000
    }
  }
})

afterAll(() => {
  global.Date = RealDate
})

describe('getSessionExpiryTime()', () => {
  test('uses defaultSessionExpiryTime if Config.sessionExpiryTime is undefined', () => {
    const mockExpiryTime = new Date((Date.now() + (30 * 24 * 60 * 60)) * 1000).getTime() // 30 days
    const sessionExpiryTime = getSessionExpiryTime().getTime()

    expect(sessionExpiryTime).toEqual(mockExpiryTime)
  })

  test('uses value in Config.sessionExpiryTime if it is set', () => {
    const mockSessionExpirySeconds = 14 * 24 * 60 * 60 // 14 days
    const mockExpiryTime = new Date((Date.now() + mockSessionExpirySeconds) * 1000).getTime()
    Config.set({
      sessionExpirySeconds: mockSessionExpirySeconds
    })

    const sessionExpiryTime = getSessionExpiryTime().getTime()

    expect(sessionExpiryTime).toEqual(mockExpiryTime)
  })
})
