// Config
import { accountRequest } from '../requests/account-request'

// Actions
import { readEndpoint } from './api-actions'

export function fetchAccountDetails (store) {
  return readEndpoint(accountRequest)
}
