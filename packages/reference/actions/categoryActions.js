// actionTypes
import * as types from './actionTypes'

// Actions
import { readEndpoint } from './apiActions'

export function readCategories (store) {
  const categories = store.getState().categories.data
  if (categories.length === 0) {
    const request = {
      endpoint: '/getCategories',
      query: {
        fields: {
          categories: 'id,title,reference'
        }
      },
      successActionType: types.SET_CATEGORIES
    }
    return readEndpoint(request, request.successActionType)
  } else {
    return {
      type: types.SET_CATEGORIES,
      payload: {
        data: categories
      }
    }
  }
}

export function readCategory (categoryID) {
  const request = {
    endpoint: `/getCategory/${categoryID}`,
    query: {
      fields: {
        categories: 'id,title,reference'
      }
    },
    successActionType: types.SET_CATEGORY
  }
  return readEndpoint(request, request.successActionType)
}
