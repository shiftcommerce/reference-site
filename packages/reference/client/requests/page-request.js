import * as types from '../actions/action-types'

export const pageRequest = (pageId) => {
  return {
    endpoint: `/getStaticPage/${pageId}`,
    query: {
      include: 'template,meta.*'
    },
    requestActionType: types.GET_PAGE,
    successActionType: types.SET_PAGE,
    errorActionType: types.ERROR_PAGE
  }
}
