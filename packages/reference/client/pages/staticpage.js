// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Actions
import { readPage } from '../actions/page-actions'

// Lib
import renderComponents from '../lib/render-components'
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

// Components
import Loading from '../components/loading'
import StaticPageError from '../components/static-page-error'

class Page extends Component {
  static async getInitialProps ({ reduxStore, query: { id } }) {
    await reduxStore.dispatch(readPage(id))
    return { id }
  }

  renderPageTitle () {
    const { title } = this.props.page

    if (title === 'Homepage') {
      return (
        <Head>
          <title>ShopGo</title>
        </Head>
      )
    } else {
      return (
        <Head>
          <title>{ suffixWithStoreName(title) }</title>
        </Head>
      )
    }
  }

  render () {
    const { page: { loading, error, template } } = this.props

    if (loading) {
      return (
        <Loading />
      )
    } else if (error) {
      return (
        <StaticPageError error={error} />
      )
    } else {
      const { components } = template.sections.slice(-1).pop()

      return (
        <>
          { this.renderPageTitle() }
          { components && renderComponents(components) }
        </>
      )
    }
  }
}

function mapStateToProps (state) {
  const { page } = state

  return { page }
}

export default algoliaReduxWrapper(connect(mapStateToProps)(Page), Page)
