// Actions
import * as types from '../actions/action-types'
import { readEndpoint } from './api-actions'

export function readMenu (request) {
  return readEndpoint(request)
}
