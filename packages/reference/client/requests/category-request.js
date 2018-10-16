import * as types from '../actions/action-types'

export const categoryRequest = (categoryId) => {
  return {
    endpoint: '/getCategory',
    query: {
      category_tree_id: 'reference:web',
      category_id: `${categoryId}`,
      fields: {
        asset_files: 's3_url',
        products: 'title,canonical_path,reference,asset_files,min_price,max_price,min_current_price,max_current_price,rating,meta_attributes,updated_at'
      },
      include: 'asset_files'
    },
    errorActionType: types.ERROR_CATEGORY,
    requestActionType: types.GET_CATEGORY,
    successActionType: types.SET_CATEGORY
  }
}
