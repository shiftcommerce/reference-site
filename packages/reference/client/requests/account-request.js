import * as types from '../actions/action-types'

export const accountRequest = {
  endpoint: '/getAccount',
  query: {},
  errorActionType: types.ERROR_ACCOUNT,
  requestActionType: types.GET_ACCOUNT,
  successActionType: types.SET_ACCOUNT
}
