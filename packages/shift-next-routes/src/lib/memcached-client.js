// Library
const Memcached = require('memcache-client')

// Config
// fetch the available memcached servers
const memcachedServers = (process.env.MEMCACHED_SERVERS || '').split(',')
// configure multiple redundant servers support
const memcachedServerConfigs = memcachedServers.map((server) => {
  // set max connections for each server
  return { server: server, maxConnections: 5 }
})
// build the memcached config
const memcachedConfig = {
  server: {
    servers: memcachedServerConfigs, // setup multiple redundant servers
    config: {
      retryFailedServerInterval: 1000, // (ms) - how often to check failed servers
      failedServerOutTime: 30000 // (ms) how long a failed server should be out before retrying it
    }
  },
  cmdTimeout: 1500 //(ms) connection is shutdown and Error returned if a response is not received before the timeout value
}

/**
 *  MemcachedClient
 *
 * Responsibility: Initialising the Memcached client
 */
module.exports = {
  MemcachedClient: new Memcached(memcachedConfig)
}
