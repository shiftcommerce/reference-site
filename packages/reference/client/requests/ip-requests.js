import * as types from '../actions/action-types'

export const ipRequest = {
  endpoint: 'http://ip-api.com/json',
  errorActionType: types.ERROR_IP,
  requestActionType: types.GET_IP,
  successActionType: types.SET_IP
}
