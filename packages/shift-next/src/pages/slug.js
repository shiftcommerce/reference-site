// Libraries
import React, { Component } from 'react'
import Router from 'next/router'
import t from 'typy'
import qs from 'qs'

// Lib
import ApiClient from '../lib/api-client'
import navigateTo from '../lib/navigate-to'

import { toggleLoading } from '../actions/global-actions'

const slugRequest = (slug) => {
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

  return {
    endpoint: '/getSlug',
    query: queryObject
  }
}

class Slug extends Component {
  static async getInitialProps ({ query, reduxStore }) {
    reduxStore.dispatch(toggleLoading(true))
    const request = slugRequest(query.slug)
    const response = await new ApiClient().read(request.endpoint, request.query)

    const resourceType = t(response, 'data.resource_type').safeObject.toLowerCase()
    const resourceId = t(response, 'data.resource_id').safeObject
    let url = query.slug

    // Temporary fix for Trendy
    if (url === 'pages/homepage') {
      url = '/'
    }

    if (url === '/homepage') {
      url = '/'
    }

    if (resourceType === 'staticpage' && url === '/pages/articles') {
      navigateTo(`/articles?id=${resourceId}`, url)
    } else {
      navigateTo(`/${resourceType}?id=${resourceId}`, url)
    }

    return {}
  }
}

export default Slug
