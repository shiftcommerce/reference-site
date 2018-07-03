// Config
import { menuRequest } from '../requests/menuRequest'

// Actions
import { readEndpoint } from './apiActions'

export function readMenu (store) {
  return readEndpoint(menuRequest)
}
