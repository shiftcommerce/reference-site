// Config
import { slugRequest } from '../requests/slugRequest'

// Actions
import { readEndpoint } from './apiActions'

export function readSlug (slug) {
  return readEndpoint(slugRequest(slug))
}
