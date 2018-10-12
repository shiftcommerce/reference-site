import Cookies from 'js-cookie'

export function setCookie () {
  const defaultExpiryInSeconds = 30 * 24 * 60 * 60 // 30 days in seconds
  const expiryInSeconds = (process.env.SESSSION_EXPIRY || defaultExpiryInSeconds) // user configured time in seconds
  const sessionExpiryTime = new Date(Date.now() + expiryInSeconds * 1000)

  Cookies.set('signedIn', true, {
    expires: sessionExpiryTime
  })
}
