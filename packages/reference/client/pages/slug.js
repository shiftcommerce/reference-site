// Libraries
import { Component } from 'react'
import Router from 'next/router'
import t from 'typy'

// Config
import { slugRequest } from '../requests/slug-request'

// Lib
import ApiClient from '../lib/api-client'
import JsonApiParser from '../lib/json-api-parser'

export class Slug extends Component {
  static async getInitialProps ({ query }) {
    const request = slugRequest(query.slug)
    const response = await new ApiClient().read(request.endpoint, request.query)
    const slug = new JsonApiParser().parse(response.data)

    const resourceType = t(slug, 'data[0].resource_type').safeObject
    const resourceId = t(slug, 'data[0].resource_id').safeObject
    let url = query.slug

    if (url === '/homepage') {
      url = '/'
    }

    Router.push(`/${resourceType.toLowerCase()}?id=${resourceId}`, url)
    return {}
  }
}

export default Slug
