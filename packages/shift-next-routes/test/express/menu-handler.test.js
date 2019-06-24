// Libraries
const nock = require('nock')

// Handlers
const { getMenu } = require('../../src/express/menu-handler')

// Config
const { shiftApiConfig } = require('@shiftcommerce/shift-node-api')

describe('#getMenu()', () => {
  // Shared set up
  const menuCache = {
    read: jest.fn(),
    set: jest.fn()
  }
  const res = {
    status: jest.fn(x => ({
      send: jest.fn(y => y)
    }))
  }
  const next =jest.fn()
  const dummyData = [{ id: '338' }]

  beforeAll(() => {
    shiftApiConfig.set({
      apiHost: 'http://example.com',
      apiTenant: 'test_tenant'
    })
  })
  
  afterAll(() => shiftApiConfig.reset())
  afterEach(() => nock.cleanAll())  

  test('skips menu caching when `preview: true`', async () => {
    // Arrange
    const req = {
      query: {
        preview: 'true'
      }
    }
    const menuCacheReadSpy = jest.spyOn(menuCache, 'read')
    const menuCacheSetSpy = jest.spyOn(menuCache, 'set')

    // stub external request
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(req.query)
      .reply(200, { data: dummyData })

    // Act
    const response = await getMenu(req, res, next, menuCache)

    // Assert
    expect(response).toEqual(dummyData)
    expect(menuCacheReadSpy).toHaveBeenCalledTimes(0)
    expect(menuCacheSetSpy).toHaveBeenCalledTimes(0)
    menuCacheReadSpy.mockRestore()
    menuCacheSetSpy.mockRestore()
  })

  test('fetches from menu cache when not previewing', async () => {
    // Arrange
    const req = {
      query: {}
    }
    const menuCacheReadSpy = jest.spyOn(menuCache, 'read')

    // stub external request
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(req.query)
      .reply(200, { data: dummyData })

    // Act
    const response = await getMenu(req, res, next, menuCache)

    // Assert
    expect(response).toEqual(dummyData)
    expect(menuCacheReadSpy).toHaveBeenCalledTimes(1)
    menuCacheReadSpy.mockRestore()
  })

  test('sets menus in cache when there are none in cache', async () => {
    // Arrange
    const req = {
      query: {}
    }
    const menuCacheReadSpy = jest.spyOn(menuCache, 'read')
    const menuCacheSetSpy = jest.spyOn(menuCache, 'set')

    // stub external request
    nock(shiftApiConfig.get().apiHost)
      .get(`/${shiftApiConfig.get().apiTenant}/v1/menus`)
      .query(req.query)
      .reply(200, { data: dummyData })

    // Act
    const response = await getMenu(req, res, next, menuCache)

    // Assert
    expect(response).toEqual(dummyData)
    expect(menuCacheReadSpy).toHaveBeenCalledTimes(1)
    expect(menuCacheSetSpy).toHaveBeenCalledTimes(1)
    menuCacheReadSpy.mockRestore()
    menuCacheSetSpy.mockRestore()
  })
})
