import qs from 'qs'
import { SlugUrl } from '../constants/apiUrls'

import * as types from '../actions/actionTypes'

export const slugRequest = (slug) => {
  const queryObject = {
    filter: {
      path: slug
    },
    page: {
      number: 1,
      size: 1
    },
    fields: {
      slugs: 'resource_type,resource_id,active,slug'
    }
  }
  const query = qs.stringify(queryObject)
  return {
    endpoint: `${SlugUrl}?${query}`,
    successActionType: types.SET_SLUG
  }
}
