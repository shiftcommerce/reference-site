// Libraries
const Memcached = require('memcached')

// Config
Memcached.config.timeout = 1500
const memcachedServers = (process.env.MEMCACHED_SERVERS || '').split(',')

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
  constructor (cacheClient = new Memcached(memcachedServers)) {
    this.cache = cacheClient
    this.cacheKey = 'menus/data'
  }

  /**
   * Reads the cached menu response
   * @return {object} - the cached menu API response
   */
  read () {
    return this.cache.get(this.cacheKey, (error, data) => {
      if (error) console.error('Error fetching menu cache', error)
      return data
    })
  }

  /**
   * Sets the received API menu response
   * @param {object} response - menu API response
   * @param {number} cacheDuration - the cache duration
   * @return {boolean}
   */
  set (response, cacheDuration) {
    return this.cache.set(this.cacheKey, response, cacheDuration, (error) => {
      if (error) console.log('Error setting menu cache', error)
    })
  }
}

module.exports = {
  MenuCache: new MenuCache()
}
