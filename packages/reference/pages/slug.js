// Libraries
import { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

// Actions
import { readSlug } from '../actions/slugActions'

export class Slug extends Component {
  static async getInitialProps ({ store, isServer, pathname, query }) {
    await store.dispatch(readSlug(query.slug))

    return {
      url: query.slug
    }
  }

  componentDidMount () {
    const slug = this.props.slug.data[0]
    const { url } = this.props
    Router.replace(`/${slug.resource_type.toLowerCase()}?id=${slug.resource_id}}`, url, {shallow: true})
  }

  render () {
    return <div />
  }
}

const mapStateToProps = (state) => {
  return {
    slug: state.slug.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Slug)
