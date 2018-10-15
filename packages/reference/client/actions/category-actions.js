import { categoryRequest } from '../requests/category-request'

// Actions
import { readEndpoint } from './api-actions'

export function readCategory (categoryId) {
  return readEndpoint(categoryRequest(categoryId))
}
