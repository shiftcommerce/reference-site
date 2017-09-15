// actionTypes
import * as types from './actionTypes'

// Actions
import { readEndpoint } from './apiActions'

export function readCategories () {
  const request = {
    endpoint: '/pim/v1/categories.json_api',
    query: {
      fields: {
        categories: 'id,title,reference'
      }
    },
    successActionType: types.SET_CATEGORIES
  }
  return readEndpoint(request)
}

export function readCategory (categoryID) {
  const request = {
    endpoint: `/pim/v1/categories/${categoryID}.json_api`,
    query: {
      fields: {
        categories: 'id,title,reference'
      }
    },
    successActionType: types.SET_CATEGORY
  }
  return readEndpoint(request)
}
