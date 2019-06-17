// Libraries
const Memcached = require('memcache-client')

// Config
const memcachedServers = (process.env.MEMCACHED_SERVERS || '').split(',')
const memcachedServerConfigs = memcachedServers.map((server) => {
  return { server: server, maxConnections: 3 }
})
const memcachedConfig = {
  server: {
    servers: memcachedServerConfigs,
    config: {
      retryFailedServerInterval: 1000,
      failedServerOutTime: 30000,
      keepLastServer: false
    }
  }
}

/**
 *  MenuCache service
 *
 * Responsibility: Facilitating the setting and retrieval
 *                 of menu response from cache store
 */
class MenuCache {
  /**
   * Initializes the class.
   * @constructor
   */
  constructor (cacheClient = new Memcached(memcachedConfig)) {
    this.cache = cacheClient
    this.cacheKey = 'menus/data'
  }

  /**
   * Reads the cached menu response
   * @return {object} - the cached menu API response
   */
  async read () {
    const data = await this.cache.get(this.cacheKey, (error, data) => {
      if (error) console.error('Error fetching menu cache', error)
      return data
    })
    return data ? data.value : {}
  }

  /**
   * Sets the received API menu response
   * @param {object} response - menu API response
   * @param {number} cacheDuration - the cache duration
   */
  set (response, cacheDuration) {
    return this.cache.set(this.cacheKey, response, { lifetime: cacheDuration }, (error) => {
      if (error) console.log('Error setting menu cache', error)
    })
  }
}

module.exports = {
  MenuCache: new MenuCache()
}
