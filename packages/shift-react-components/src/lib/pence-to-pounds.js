/**
 * Convert the price from pence to pounds. For example:
 * 2547 pence becomes 25.47
 * @param  {Number} priceInPence
 * @return {Number} - The price
 */

function penceToPounds (priceInPence) {
  return (priceInPence / 100).toFixed(2)
}

export default penceToPounds
