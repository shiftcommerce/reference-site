// Library
// @TODO - update when security vulnerability is addressed https://github.com/memcachier/memjs/issues/123
const memjs = require('memjs')

// Config
// The current setup supports env vars for the following services - Memcachier & MemcachedCloud
// When using a different service, you can set - MEMCACHE_SERVERS, MEMCACHE_USERNAME & MEMCACHE_PASSWORD env vars
const memcachedServers = (process.env.MEMCACHE_SERVERS || process.env.MEMCACHIER_SERVERS || process.env.MEMCACHEDCLOUD_SERVERS)
const username = (process.env.MEMCACHE_USERNAME || process.env.MEMCACHIER_USERNAME || process.env.MEMCACHEDCLOUD_USERNAME)
const password = (process.env.MEMCACHE_PASSWORD || process.env.MEMCACHIER_PASSWORD || process.env.MEMCACHEDCLOUD_PASSWORD)
const memcachedConfigs = { 
  username: username,
  password: password,
  failover: true,  // default: false
  timeout: 1,      // default: 0.5 (seconds)
  keepAlive: true  // default: false
 }

/**
 *  MemcachedStore
 *
 * Responsibility: Initialising the Memcached store
 */
module.exports = {
  MemcachedStore: memjs.Client.create(memcachedServers, memcachedConfigs)
}
