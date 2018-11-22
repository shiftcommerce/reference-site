// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Components
import ProductListing from '../components/products/listing/product-listing'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'

class Search extends Component {
  static algoliaEnabled = () => true

  static updateAfter () { return 0 }

  render () {
    const searchQuery = this.props.searchState.query
    let searchTitle = 'Showing all products'

    if (searchQuery) {
      searchTitle = `Search "${searchQuery}"`
    }

    return (
      <>
        <Head>
          <title>{ searchTitle }</title>
        </Head>
        <ProductListing title={searchTitle} />
      </>
    )
  }
}

export default algoliaReduxWrapper(connect()(Search), Search)
