// actionTypes
import * as types from './actionTypes'

// Actions
import { PageUrl } from '../constants/apiUrls'
import { readEndpoint } from './apiActions'

export function readPage (store, query) {
  return readEndpoint({
    endpoint: `${PageUrl}/${query.id}`,
    query: {
      include: 'template,meta.*'
    },
    successActionType: types.SET_PAGE
  })
}
