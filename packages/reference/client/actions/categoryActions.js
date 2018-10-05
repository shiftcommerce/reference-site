import { categoryRequest } from '../requests/categoryRequest'

// Actions
import { readEndpoint } from './apiActions'

export function readCategory (categoryId) {
  return readEndpoint(categoryRequest(categoryId))
}
