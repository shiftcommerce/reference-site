// Config
import { pageRequest } from '../requests/pageRequest'

// Actions
import { readEndpoint } from './apiActions'

export function readPage (pageId) {
  return readEndpoint(pageRequest(pageId))
}
