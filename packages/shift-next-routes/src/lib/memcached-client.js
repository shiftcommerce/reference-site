// Library
const Memcached = require('memcache-client')

// Config
const memcachedServers = (process.env.MEMCACHED_SERVERS || '').split(',')
const memcachedConfig = {
  server: {
    servers: memcachedServers.map((server) => {
      return { server: server, maxConnections: 5 }
    }),
    config: {
      retryFailedServerInterval: 1000, // (ms) - how often to check failed servers
      failedServerOutTime: 30000 // (ms) how long a failed server should be out before retrying it
    }
  },
  cmdTimeout: 1500 // (ms) command timeout
}

/**
 *  MemcachedClient
 *
 * Responsibility: Initialising the Memcached client
 */
module.exports = {
  MemcachedClient: new Memcached(memcachedConfig)
}
