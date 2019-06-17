/**
 *  MenuCache service
 *
 * Responsibility: Facilitating the setting and retrieval
 *                 of menu response from cache store
 *
 */
class MenuCache {
  /**
   * Initializes the class.
   * @constructor
   */
  constructor () {
    this.client = [] //initialise memcached client & set expiration to 5 mins
  }

  /**
   * Reads the cached menu response
   * @return {object} - the cached menu API response
   */
  read () {
    // fetch menu response in memcache via `this.client`
    console.log('FETCHED FROM CACHE')
    return this.client[0]
  }

  /**
   * Sets the received API menu response
   * @param {object} response - menu API response
   * @return {boolean}
   */
  set (response) {
    // set menu response in memcache via `this.client`
    console.log('SET IN CACHE')
    this.client.push(response)
    return true
  }
}

module.exports = {
  MenuCache: new MenuCache()
}
