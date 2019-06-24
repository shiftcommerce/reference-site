// Libs
const { MemcachedStore } = require('./memcached-store')
const logger = require('./logger')

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
  constructor (cache = MemcachedStore, cacheKey = 'menus/data', log = logger) {
    this.cache = cache
    this.cacheKey = cacheKey
    this.defaultCacheDuration = parseInt(process.env.MENUS_CACHE_DURATION) || 300
    this.log = log
  }

  /**
   * Reads the cached menu response
   * @return {object} - the cached menu API response
   */
  async read () {
    try {
      // fetch data from cache
      const data = await this.cache.get(this.cacheKey)
      // log retrieved data
      this.log.info('Reading menu cache')
      // extract and return cached data if present
      return data ? JSON.parse(data.value) : {}
    } catch (error) {
      this.log.error('Error fetching menu cache', error)
      return {}
    }
  }

  /**
   * Sets the received API menu response
   * @param {object} response - menu API response
   * @param {number} cacheDuration - the cache duration in seconds, defaults to 300 seconds (5mins)
   */
  async set (response, cacheDuration = this.defaultCacheDuration) {
    try {
      // set data in cache
      const result = await this.cache.set(this.cacheKey, JSON.stringify(response), { expires: cacheDuration })
      // log result
      this.log.info('Set menu cache', result)
      // return result
      return result
    } catch (error) {
      this.log.error('Error setting menu cache', error)
      return false
    }
  }
}

module.exports = MenuCache
