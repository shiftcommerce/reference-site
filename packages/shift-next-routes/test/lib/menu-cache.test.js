// Libraries
const { MenuCache } = require('../../src/lib/menu-cache')

const exampleCacheClient = {
  get: jest.fn((key) => {
    const store = { test: { value: 'data' }}
    return store[key]
  }),
  set: jest.fn((key, data, options) => {
    return true
  })
}

describe('initialisation', () => {
  test('instantialises the service with the given client', async () => {
    // Act
    const menuCache = new MenuCache(exampleCacheClient)

    // Assert
    expect(menuCache.cache).toEqual(exampleCacheClient)
  })

  test('instantialises the service with the given cache key', async () => {
    // Arrange
    const exampleCacheKey = 'testCacheKey'

    // Act
    const menuCache = new MenuCache(exampleCacheClient, exampleCacheKey)

    // Assert
    expect(menuCache.cacheKey).toEqual(exampleCacheKey)
  })
})

describe('read()', () => {
  test('reads the cached data', async () => {
    // Arrange
    const exampleCacheKey = 'testCacheKey'

    // Act
    const menuCache = new MenuCache(exampleCacheClient, exampleCacheKey)
    menuCache.read(exampleCacheKey)

    // Assert
    menuCache.read(exampleCacheKey).then((data) => {
      expect(data).toEqual('data')
    })
    expect(exampleCacheClient.get).toHaveBeenCalledWith(exampleCacheKey)
  })

  test('returns an empty object if cache does not exist', async () => {
    // Arrange
    const exampleCacheKey = 'testCacheKey'

    // Act
    const menuCache = new MenuCache(exampleCacheClient, exampleCacheKey)

    // Assert
    menuCache.read('testing').then((data) => {
      expect(data).toEqual({})
    })
  })
})

describe('set()', () => {
  test('caches the given data for the set period', async () => {
    // Arrange
    const exampleCacheKey = 'testCacheKey'
    const exampleData = 'data'

    // Act
    const menuCache = new MenuCache(exampleCacheClient, exampleCacheKey)
    menuCache.set(exampleData, 300)

    // Assert
    expect(exampleCacheClient.set).toHaveBeenCalled()
  })
})
