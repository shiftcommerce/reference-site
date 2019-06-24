const pino = require('pino')

let prettyPrint = false
// if not production or test env
if (!(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test')) {
  prettyPrint = { colorize: true }
}

// Logger
const config = {
  level: process.env.LOG_LEVEL || 'warn',
  prettyPrint: prettyPrint
}
const logger = pino(config)
logger.info(`logger started at level ${process.env.LOG_LEVEL}`)

module.exports = logger
