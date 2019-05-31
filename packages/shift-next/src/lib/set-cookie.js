const Cookies = require('js-cookie')
const { getSessionExpiryTime } = require('./session')
const { isSecure } = require('./is-secure')

export function setCookie () {
  Cookies.set('signedIn', true, {
    expires: getSessionExpiryTime(),
    secure: isSecure()
  })
}
