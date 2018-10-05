import * as types from '../actions/actionTypes'

export const pageRequest = (pageId) => {
  return {
    endpoint: `/getStaticPage/${pageId}`,
    query: {
      include: 'template,meta.*'
    },
    requestActionType: types.GET_PAGE,
    successActionType: types.SET_PAGE
  }
}
