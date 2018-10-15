// Config
import { pageRequest } from '../requests/page-request'

// Actions
import { readEndpoint } from './api-actions'

export function readPage (pageId) {
  return readEndpoint(pageRequest(pageId))
}
