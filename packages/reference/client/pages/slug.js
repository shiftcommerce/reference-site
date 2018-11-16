// Libraries
import { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

// Actions
import { readSlug } from '../actions/slug-actions'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'

export class Slug extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    await reduxStore.dispatch(readSlug(query.slug))
    const { slug } = reduxStore.getState()
    const resourceType = slug.data[0].resource_type
    const resourceId = slug.data[0].resource_id
    let url = query.slug

    if (url === '/homepage') {
      url = '/'
    }

    Router.push(`/${resourceType.toLowerCase()}?id=${resourceId}`, url)
    return {}
  }
}

function mapStateToProps (state) {
  const { slug } = state
  return { slug }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(Slug), Slug)
