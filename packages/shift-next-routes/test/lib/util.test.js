const { isSecure } = require('../../lib/util')

test('isSecure', () => {
  process.env.NO_HTTPS = false
  expect(isSecure()).toBe(true)

  process.env.NO_HTTPS = 'true'
  expect(isSecure()).toBe(false)
})