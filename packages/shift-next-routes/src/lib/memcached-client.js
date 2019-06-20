// Library
const memjs = require('memjs')

// Config
const memcachedServers = (process.env.MEMCACHE_SERVERS || process.env.MEMCACHIER_SERVERS || process.env.MEMCACHEDCLOUD_SERVERS)
const username = (process.env.MEMCACHE_USERNAME || process.env.MEMCACHEDCLOUD_USERNAME)
const password = (process.env.MEMCACHE_PASSWORD || process.env.MEMCACHEDCLOUD_PASSWORD)

/**
 *  MemcachedClient
 *
 * Responsibility: Initialising the Memcached client
 */
module.exports = {
  MemcachedClient: memjs.Client.create(memcachedServers, { username, password })
}
