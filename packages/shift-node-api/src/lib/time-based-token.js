const crypto = require('crypto')

// Generate a date time string in the format of 'YYYY-MM-DDTHH:mm'
function dateTimeFormatted () {
  const date = new Date()
  const year = `${date.getUTCFullYear()}`
  const month = `${date.getMonth() + 1}`.padStart(2, 0)
  const day = `${date.getDate()}`.padStart(2, 0)
  const hour = `${date.getUTCHours()}`.padStart(2, 0)
  const minute = `${date.getUTCMinutes()}`.padStart(2,0)

  return `${year}-${month}-${day}T${hour}:${minute}`
}

function generateTimeBasedToken (sharedSecret) {
  return crypto.createHmac('sha256', sharedSecret).update(dateTimeFormatted()).digest('hex')
}

module.exports = { generateTimeBasedToken }
