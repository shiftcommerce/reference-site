import * as types from '../actions/action-types'

export const productRequest = (productId) => {
  return {
    endpoint: `/getProduct/${productId}`,
    query: {
      include: 'asset_files,variants,bundles,bundles.asset_files,template,meta.*'
    },
    requestActionType: types.GET_PRODUCT,
    successActionType: types.SET_PRODUCT
  }
}
