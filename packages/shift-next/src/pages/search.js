// Libraries
import React, { Component } from 'react'
import qs from 'qs'
import equal from 'deep-equal'

// Components
import { ProductListing } from '@shiftcommerce/shift-react-components/src/components/products/listing/product-listing'

// Lib
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import buildSearchStateForURL from '../lib/build-search-state-for-url'
import { setPageContentSecurityPolicy } from '../lib/content-security-policy/index'

// Config
import Config from '../lib/config'

class SearchPage extends Component {
  static algoliaEnabled = () => true

  static algoliaComponentDidUpdate (prevProps, prevState) {
    if (!equal(prevState.searchState, this.state.searchState)) return

    const urlSearchState = qs.parse(window.location.search.slice(1))
    if (!equal(buildSearchStateForURL(this.state.searchState), urlSearchState)) {
      this.setState({ searchState: Object.assign(urlSearchState, { configure: prevProps.searchState.configure }) })
    }
  }

  static onSearchStateChange (searchState) {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      const href = this.searchStateToUrl(searchState)
      Router.push(href, href)
    }, this.updateAfter())
    this.setState({ searchState })
  }

  constructor(props) {
    super(props)

    this.Head = Config.get().Head
  }

  static async getInitialProps ({ res }) {
    // Set Page Content Security Policy
    setPageContentSecurityPolicy('Search', res)
  }

  render () {
    return (
      <>
        <this.Head>
          <title>{ suffixWithStoreName('Search') }</title>
        </this.Head>
        <ProductListing indexName={Config.get().algoliaIndexName} />
      </>
    )
  }
}

export default SearchPage
