// Libraries
import { Component } from 'react'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'

// Actions
import { readSlug } from '../actions/slugActions'
import { readMenu } from '../actions/menuActions'

// Utils
import { configureStore } from '../utils/configureStore'

export class Slug extends Component {
  static async getInitialProps ({ store, query }) {
    await store.dispatch(readMenu(store))
    await store.dispatch(readSlug(query.slug))
  }

  componentDidMount () {
    const slug = this.props.slug.data[0]
    const { url } = this.props
    Router.replace(`/${slug.resource_type.toLowerCase()}?id=${slug.resource_id}`, url.query.slug, { shallow: true })
  }

  render () {
    return <div />
  }
}

const mapStateToProps = (state) => {
  return {
    slug: state.slug || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Slug)
