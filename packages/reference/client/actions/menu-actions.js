// Config
import { menuRequest } from '../requests/menu-request'

// Actions
import { readEndpoint } from './api-actions'

export function readMenu (store) {
  return readEndpoint(menuRequest)
}
