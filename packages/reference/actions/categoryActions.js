// Config
import { menuRequest } from '../requests/apiRequests'

// actionTypes
import * as types from './actionTypes'

// Actions
import { CategoryUrl } from '../constants/apiUrls'
import { readEndpoint } from './apiActions'

export function readCategories (store) {
  const categories = store.getState().categories.data
  if (categories.length === 0) {
    return readEndpoint(menuRequest, menuRequest.successActionType)
  } else {
    return {
      type: types.SET_CATEGORIES,
      payload: {
        data: categories
      }
    }
  }
}

export function readCategory ({
  categoryId,
  pageNumber = 1,
  pageSize = 36
}) {
  return readEndpoint({
    endpoint: `${CategoryUrl}/${categoryId}/products`,
    query: {
      fields: {
        asset_files: 's3_url,canonical_path',
        products: 'title,description,canonical_path,reference,asset_files,min_price,max_price,min_current_price,max_current_price,rating,meta_attributes,updated_at',
        variants: 'price,meta_attributes,sku'
      },
      page: {
        number: pageNumber,
        size: pageSize
      },
      include: 'asset_files,variants,bundles'
    },
    successActionType: types.SET_CATEGORY
  })
}
