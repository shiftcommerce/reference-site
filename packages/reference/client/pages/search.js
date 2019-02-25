// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import qs from 'qs'
import equal from 'deep-equal'
import getConfig from 'next/config'

// Components
import { ProductListing } from 'shift-react-components'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import buildSearchStateForURL from '../lib/build-search-state-for-url'

const {
  publicRuntimeConfig: {
    ALGOLIA_INDEX_NAME
  }
} = getConfig()

export class Search extends Component {
  static algoliaEnabled = () => true

  static algoliaComponentDidUpdate (prevProps, prevState) {
    if (!equal(prevState.searchState, this.state.searchState)) return

    const urlSearchState = qs.parse(window.location.search.slice(1))
    if (!equal(buildSearchStateForURL(this.state.searchState), urlSearchState)) {
      this.setState({ searchState: Object.assign(urlSearchState, { configure: prevProps.searchState.configure }) })
    }
  }

  render () {
    return (
      <>
        <Head>
          <title>{ suffixWithStoreName('Search') }</title>
        </Head>
        <ProductListing indexName={ALGOLIA_INDEX_NAME} />
      </>
    )
  }
}

export default algoliaReduxWrapper(connect()(Search), Search)
