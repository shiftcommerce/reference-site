const pino = require('pino')

// Logger
const logConfig = {
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: { colorize: true } // only happens if pino-pretty is installed, which is a dev dependency
}

module.exports = pino(logConfig)
