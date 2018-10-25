import * as types from '../actions/action-types'

export const categoryRequest = (categoryId) => {
  return {
    endpoint: `/getCategory/${categoryId}`,
    query: {},
    errorActionType: types.ERROR_CATEGORY,
    requestActionType: types.GET_CATEGORY,
    successActionType: types.SET_CATEGORY
  }
}
