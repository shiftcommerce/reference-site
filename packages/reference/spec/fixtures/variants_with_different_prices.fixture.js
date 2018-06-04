import { fixedPrice } from '../../lib/fixedPrice'

const VariantsWithDifferentPrices = [
  {
    sku: 1,
    title: 'Small',
    size: 'Size 8',
    price: fixedPrice(10.0)
  },
  {
    sku: 2,
    title: 'Medium',
    size: 'Size 10',
    price: fixedPrice(11.0)
  },
  {
    sku: 3,
    title: 'Large',
    size: 'Size 12',
    price: fixedPrice(12.0)
  }
]

export default VariantsWithDifferentPrices
