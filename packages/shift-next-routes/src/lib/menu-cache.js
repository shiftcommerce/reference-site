// Libs
const { MemcachedStore } = require('./memcached-store')

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
  constructor (cache = MemcachedStore, cacheKey = 'menus/data') {
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
      return data ? JSON.parse(data.value) : {}
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
  async set (response, cacheDuration = process.env.MENUS_CACHE_DURATION) {
    try {
      const result = await this.cache.set(this.cacheKey, JSON.stringify(response), { expires: cacheDuration })
      return result
    } catch (error) {
      console.log('Error setting menu cache', error)
      return false
    }
  }
}

module.exports = MenuCache
