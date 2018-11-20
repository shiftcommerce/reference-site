// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'

// Components
import ProductListing from '../components/products/listing/product-listing'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'

class Search extends Component {
  static algoliaEnabled = () => true

  static updateAfter () { return 0 }

  render () {
    return (
      <ProductListing title={`Search "${this.props.searchState.query}"`} />
    )
  }
}

export default algoliaReduxWrapper(connect()(Search), Search)
