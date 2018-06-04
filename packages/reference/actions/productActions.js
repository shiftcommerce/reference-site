// Config
import { productRequest } from '../requests/apiRequests'

// Actions
import { readEndpoint } from './apiActions'

export function readProduct (productId) {
  return readEndpoint(productRequest(productId))
}
