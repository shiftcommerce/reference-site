// Libs
const { MemcachedStore } = require('./memcached-store')
const { shiftApiConfig } = require('@shiftcommerce/shift-node-api')

// Constants
// Namespace menu cache key based on tenant
const defaultCacheKey = `${shiftApiConfig.get().apiTenant}/menus`

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
  constructor (cache = MemcachedStore, cacheKey = defaultCacheKey, logger = shiftApiConfig.get().logger) {
    this.cache = cache
    this.cacheKey = cacheKey
    this.defaultCacheDuration = parseInt(process.env.MENUS_CACHE_DURATION) || 300
    this.log = logger
  }

  /**
   * Reads the cached menu response
   * @return {object} - the cached menu API response
   */
  async read () {
    try {
      const data = await this.cache.get(this.cacheKey)
      const response = (data ? JSON.parse(data.value) : {})
      this.log.trace('Reading API menu response from cache')
      return response
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
      const result = await this.cache.set(this.cacheKey, JSON.stringify(response), { expires: cacheDuration })
      this.log.info(`Writing API menu response in ${this.cacheKey} cache: `, result)
      return result
    } catch (error) {
      this.log.error('Error setting menu cache', error)
      return false
    }
  }
}

module.exports = MenuCache
