// Libraries
import React, { Component } from 'react'
import qs from 'qs'
import classNames from 'classnames'
import { SortBy } from 'react-instantsearch-dom'
import Router, { withRouter } from 'next/router'
import equal from 'deep-equal'

// Components
import GlobalSearchFilters from '@shiftcommerce/shift-react-components/src/components/search/global-search-filters'
import ProductMenu from '@shiftcommerce/shift-react-components/src/components/products/listing/product-menu'
import SearchFiltersClearControls from '@shiftcommerce/shift-react-components/src/components/search/search-filters-clear-controls'
import SearchRefinements from '@shiftcommerce/shift-react-components/src/components/search/search-refinements'
import ProductListingInfo from '@shiftcommerce/shift-react-components/src/components/products/listing/product-listing-info'
import ProductListingCards from '@shiftcommerce/shift-react-components/src/components/products/listing/product-listing-cards'
import LoadMoreHits from '@shiftcommerce/shift-react-components/src/components/search/load-more'

// Objects
import { Breadcrumb } from '@shiftcommerce/shift-react-components/src/objects/breadcrumb'
import { Button } from '@shiftcommerce/shift-react-components/src/objects/button'

// Lib
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import { sortOptions } from '../lib/sort-options'
import buildSearchStateForURL from '../lib/build-search-state-for-url'

// Config
import Config from '../lib/config'

export class SearchPage extends Component {
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

  // fix SSR
  static buildAlgoliaStates (params) {
    const searchState = params.asPath.includes('?')
      ? qs.parse(params.asPath.substring(params.asPath.indexOf('?') + 1))
      : {}
    return Object.assign({ ...searchState })
  }

  constructor (props) {
    super(props)

    this.Head = Config.get().Head
  }

  render () {
    const indexName = Config.get().algoliaIndexName
    const filtersShown = false
    const { CustomListingCard, CustomBreadCrumb, router } = this.props

    return (
      <>
        <this.Head>
          <title>{ suffixWithStoreName('Search') }</title>
          { Config.get().storeUrl ? <link rel='canonical' href={`${Config.get().storeUrl}${router.pathname}?query=${router.query.query}`} /> : null }
        </this.Head>
        <div className='o-container'>
          <ProductMenu />
          { CustomBreadCrumb ? <CustomBreadCrumb items={[{ label: 'Search' }]} /> : <Breadcrumb /> }
          <div className='c-product-listing-wrapper'>
            <div className={classNames('c-product-listing-filter-heading', { 'c-product-listing-filter-heading--hide': !filtersShown })}>
              <h2> Filters <button className='c-product-listing-filter-close' onClick={this.toggleFiltering} /></h2>
            </div>
            <div className={classNames('c-product-listing-filter', { 'c-product-listing-filter--hide': !filtersShown })}>
              <GlobalSearchFilters />
            </div>
            <div className={classNames('c-product-listing')}>
              <div className='c-product-listing__menu'>
                <div className='c-product-listing__menu-options'>
                  <div className='c-product-listing__menu-options-filters'>
                    <h2 className='c-product-listing__menu-options-filters-title'>Filters</h2>
                    <div className='c-product-listing__menu-options-filters-applied'>
                      <SearchRefinements />
                    </div>
                    <Button className='c-product-listing__menu-options-filters-button' onClick={this.toggleFiltering} />
                  </div>
                  <div className='c-product-listing__menu-options-sort-by'>
                    <h2 className='c-product-listing__menu-options-sort-by-title'>Sort by:</h2>
                    <SortBy defaultRefinement={indexName} items={sortOptions(indexName)} />
                    <Button className='c-product-listing__menu-options-sort-by-button u-hidden-d' />
                  </div>
                </div>
              </div>
              <ProductListingInfo />
              <div className='c-product-listing-filter__header'>
                <SearchFiltersClearControls/>
              </div>
              { CustomListingCard ? <CustomListingCard /> : <ProductListingCards /> }
              <LoadMoreHits />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(SearchPage)
