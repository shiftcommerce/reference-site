const pino = require('pino')

let prettyPrint = false
// if not production or test env
if (!(process.env.NODE_ENV === 'production' || process.env.NODE_END === 'test')) {
  prettyPrint = { colorize: true }
}

console.log('> Log level:', process.env.LOG_LEVEL)
// Logger
const config = {
  level: process.env.LOG_LEVEL || 'warn',
  prettyPrint: prettyPrint
}

module.exports = pino(config)
