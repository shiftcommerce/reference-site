import { ProductUrl } from '../constants/apiUrls'
import * as types from '../actions/actionTypes'

export const productRequest = (productId) => {
  return {
    endpoint: `${ProductUrl}/${productId}`,
    query: {
      include: 'asset_files,variants,bundles,template,meta.*'
    },
    successActionType: types.SET_PRODUCT
  }
}
