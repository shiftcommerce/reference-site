import qs from 'qs'

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
    endpoint: `/getSlug/?${query}`
  }
}
