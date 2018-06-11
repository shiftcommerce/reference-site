// actionTypes
import * as types from './actionTypes'

// Config
import { menuRequest } from '../requests/menuRequest'

// Actions
import { readEndpoint } from './apiActions'

export function readMenu (store) {
  const menu = store.getState().menu.data
  if (menu.length === 0) {
    return readEndpoint(menuRequest, menuRequest.successActionType)
  } else {
    return {
      type: types.SET_MENU,
      payload: {
        data: menu
      }
    }
  }
}
