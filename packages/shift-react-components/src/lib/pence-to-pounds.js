/**
 * Convert the price from pence to pounds. For example:
 * 2547 pence becomes 25.47
 * @param  {Number} priceInPence
 * @return {Number} - The price
 */

export function penceToPounds (priceInPence) {
  return (Number(priceInPence) / 100).toFixed(2)
}
