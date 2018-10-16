import { fixedPrice } from '../../client/lib/fixed-price'

const ProductsWithVariantsWithDifferentPrices = {
  min_current_price: fixedPrice(10),
  max_current_price: fixedPrice(12)
}

export default ProductsWithVariantsWithDifferentPrices
