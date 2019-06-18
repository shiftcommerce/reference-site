// Libraries
const Memcached = require('memcache-client')

// Config
const memcachedServers = (process.env.MEMCACHED_SERVERS || '').split(',')
const memcachedConfig = {
  server: {
    servers: memcachedServers.map((server) => {
      return { server: server, maxConnections: 3 }
    }),
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
   * @param {function} cache - cache client, eg. memcached
   * @param {string} cacheKey - the cache key to be used
   */
  constructor (cache = new Memcached(memcachedConfig), cacheKey = 'menus/data') {
    this.cache = cache
    this.cacheKey = cacheKey
  }

  /**
   * Reads the cached menu response
   * @return {object} - the cached menu API response
   */
  async read () {
    try {
      const data = await this.cache.get(this.cacheKey)
      return data ? data.value : {}
    } catch (error) {
      console.error('Error fetching menu cache', error)
      return {}
    }
  }

  /**
   * Sets the received API menu response
   * @param {object} response - menu API response
   * @param {number} cacheDuration - the cache duration in seconds
   */
  set (response, cacheDuration = process.env.MENUS_CACHE_DURATION) {
    try {
      return this.cache.set(this.cacheKey, response, { lifetime: cacheDuration })
    } catch (error) {
      console.log('Error setting menu cache', error)
      return false
    }
  }
}

module.exports = MenuCache
