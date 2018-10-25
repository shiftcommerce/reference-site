// Libraries
import { Component } from 'react'
import getConfig from 'next/config'
import { SearchBox, Configure } from 'react-instantsearch/dom'
import classNames from 'classnames'

// Components
import { InstantSearch } from '../../search/algolia/instant-search'
import { AlgoliaHits, LoadMoreHits } from '../../search/algolia/algolia-hits'
import AlgoliaFilters from '../../search/algolia/algolia-filters'

import ProductNavBar from '../../navigation/product-navbar'
import ProductMenu from './product-menu'
import ProductMenuOptions from './product-menu-options'

const {
  publicRuntimeConfig: {
    ALGOLIA_API_KEY,
    ALGOLIA_APP_ID,
    ALGOLIA_INDEX_NAME,
    ALGOLIA_RESULTS_PER_PAGE
  }
} = getConfig()

class ProductListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilters: false
    }
  }

  toggleFiltering = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  renderResults (searchState) {
    return (
      <>
        <AlgoliaFilters showFilters={this.state.showFilters} toggleFiltering={this.toggleFiltering} />
        <div className={classNames('c-product-listing', { 'u-hidden': this.state.showFilters })}>
          <ProductNavBar />
          <div className='c-product-listing__menu'>
            <ProductMenu title={this.props.title} body={'Optional text prop not yet setup but available'} />
            <ProductMenuOptions toggleFiltering={this.toggleFiltering} />
          </div>
          <AlgoliaHits />
          <LoadMoreHits />
        </div>
      </>
    )
  }

  render () {
    const { resultsState, searchState, onSearchStateChange } = this.props

    return (
      <InstantSearch
        appId={ALGOLIA_APP_ID}
        apiKey={ALGOLIA_API_KEY}
        indexName={ALGOLIA_INDEX_NAME}
        resultsState={resultsState}
        onSearchStateChange={onSearchStateChange}
        searchState={searchState}
      >
        <Configure hitsPerPage={ALGOLIA_RESULTS_PER_PAGE} {...searchState.configure}/>
        <div className='c-product-listing--hide'>
          <SearchBox />
        </div>
        { this.renderResults(searchState) }
      </InstantSearch>
    )
  }
}

export default ProductListing
