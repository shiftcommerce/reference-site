// Config
import { productRequest } from '../requests/product-request'

// Actions
import { readEndpoint } from './api-actions'

export function readProduct (productId) {
  return readEndpoint(productRequest(productId))
}
