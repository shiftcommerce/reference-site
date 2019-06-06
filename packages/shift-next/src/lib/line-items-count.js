import Cookies from 'js-cookie'

/**
 * Gets and returns the line item count
 * If the line item count in the cart is different from the one stored in the
 * cookie, then update the cookie
 * @param  {Object} cart
 * @return {Number}
 */
export default (cart) => {
  const lineItemsCountLabel = 'lineItemsCount'
  let lineItemsCount = Cookies.get(lineItemsCountLabel)

  if (lineItemsCount || cart.line_items_count) {
    if (cart.line_items_count && cart.line_items_count !== lineItemsCount) {
      Cookies.set(lineItemsCountLabel, cart.line_items_count, { path: '/' })
      lineItemsCount = cart.line_items_count
    }

    return lineItemsCount
  }
}
