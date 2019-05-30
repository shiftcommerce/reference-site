const pino = require('pino')

let prettyPrint = false
if (process.env.NODE_ENV !== 'production' && process.env.NODE_END !== 'test') {
  prettyPrint = { colorize: true }
}

console.log('Log Level:', process.env.LOG_LEVEL)
// Logger
const logConfig = {
  level: process.env.LOG_LEVEL || 'warn',
  prettyPrint: prettyPrint
}

module.exports = pino(logConfig)
