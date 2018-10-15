import { fixedPrice } from '../../client/lib/fixed-price'

const VariantsWithDifferentPrices = [
  {
    sku: 1,
    title: 'Small',
    variant: 'Size 8',
    price: fixedPrice(10.0)
  },
  {
    sku: 2,
    title: 'Medium',
    variant: 'Size 10',
    price: fixedPrice(11.0)
  },
  {
    sku: 3,
    title: 'Large',
    variant: 'Size 12',
    price: fixedPrice(12.0)
  }
]

export default VariantsWithDifferentPrices
