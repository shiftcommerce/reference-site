// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'

// Components
import ProductListing from '../components/products/listing/product-listing'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

class Search extends Component {
  static algoliaEnabled = () => true

  static updateAfter () { return 0 }

  render () {
    return (
      <>
        <Head>
          <title>{ suffixWithStoreName('Search') }</title>
        </Head>
        <ProductListing />
      </>
    )
  }
}

export default algoliaReduxWrapper(connect()(Search), Search)
