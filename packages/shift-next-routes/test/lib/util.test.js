const { isSecure } = require('../../src/lib/util')

describe('test isSecure', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    delete process.env.NO_HTTPS;
  })

  afterEach(() => {
    process.env = OLD_ENV;
  })

  test('false when not secure', () => {
    process.env.NO_HTTPS = true
    expect(isSecure()).toEqual(false)
  })

  test('true when secure', () => {
    process.env.NO_HTTPS = false
    expect(isSecure()).toEqual(true)
  })
})