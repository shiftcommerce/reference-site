// Config
import { slugRequest } from '../requests/slug-request'

// Actions
import { readEndpoint } from './api-actions'

export function readSlug (slug) {
  return readEndpoint(slugRequest(slug))
}
