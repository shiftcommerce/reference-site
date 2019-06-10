const Cookies = require('js-cookie')
const { getSessionExpiryTime } = require('./session')
const { isSecure } = require('./is-secure')

const lineItemsCountLabel = 'lineItemsCount'

export function setSignedInCookie () {
  Cookies.set('signedIn', true, {
    expires: getSessionExpiryTime(),
    secure: isSecure()
  })
}

/**
 * Set the lineItemsCount cookie
 * @param  {Number} total
 */
export function setCartLineItemCookie (total) {
  Cookies.set(lineItemsCountLabel, total, { path: '/' })
}

/**
 * Get the lineItemsCount cookie
 * @return  {Number} total
 */
export function getCartLineItemCookie () {
  return Cookies.get(lineItemsCountLabel) || 0
}
