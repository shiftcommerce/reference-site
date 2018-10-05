// Config
import { productRequest } from '../requests/productRequest'

// Actions
import { readEndpoint } from './apiActions'

export function readProduct (productId) {
  return readEndpoint(productRequest(productId))
}
