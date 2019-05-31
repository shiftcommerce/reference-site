/**
 * are we in a secure environment or not
 */
const isSecure = () => {
  return process.env.NO_HTTPS !== true
}

module.exports = { isSecure }
