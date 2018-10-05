// Libraries
import { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

// Actions
import { readSlug } from '../actions/slugActions'

export class Slug extends Component {
  static async getInitialProps ({ reduxStore, req, query }) {
    await reduxStore.dispatch(readSlug(query.slug))

    return {
      url: query.slug
    }
  }

  componentDidMount () {
    const slug = this.props.slug.data[0]
    let { url } = this.props

    if (url === '/homepage') {
      url = '/'
    }

    Router.replace(`/${slug.resource_type.toLowerCase()}?id=${slug.resource_id}`, url, {shallow: true})
  }

  render () {
    return <div />
  }
}

function mapStateToProps (state) {
  const { slug } = state
  return { slug }
}

export default connect(mapStateToProps)(Slug)
