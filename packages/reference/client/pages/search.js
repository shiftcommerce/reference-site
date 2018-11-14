// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'

// Components
import ProductListing from '../components/products/listing/product-listing'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'

class Search extends Component {
  static algoliaEnabled = () => true

  static algoliaComponentDidMount () {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) })
  }

  static algoliaComponentWillReceiveProps () {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) })
  }

  render () {
    return (
      <ProductListing
        title={`Search "${this.props.searchState.query}"`}
      />
    )
  }
}

export default algoliaReduxWrapper(connect()(Search), Search)
