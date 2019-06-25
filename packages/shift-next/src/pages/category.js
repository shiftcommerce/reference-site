// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'
import Router from 'next/router'
import qs from 'qs'
import equal from 'deep-equal'
import { SortBy } from 'react-instantsearch-dom'

// Components
import SearchFilters from '@shiftcommerce/shift-react-components/src/components/search/search-filters'
import ProductMenu from '@shiftcommerce/shift-react-components/src/components/products/listing/product-menu'
import SearchFiltersClearControls from '@shiftcommerce/shift-react-components/src/components/search/search-filters-clear-controls'
import SearchRefinements from '@shiftcommerce/shift-react-components/src/components/search/search-refinements'
import ProductListingInfo from '@shiftcommerce/shift-react-components/src/components/products/listing/product-listing-info'
import ProductListingCards from '@shiftcommerce/shift-react-components/src/components/products/listing/product-listing-cards'
import LoadMoreHits from '@shiftcommerce/shift-react-components/src/components/search/load-more'

// Objects
import { Loading } from '@shiftcommerce/shift-react-components/src/objects/loading'
import { Breadcrumb } from '@shiftcommerce/shift-react-components/src/objects/breadcrumb'
import { Button } from '@shiftcommerce/shift-react-components/src/objects/button'

// Lib
import buildSearchStateForURL from '../lib/build-search-state-for-url'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import ApiClient from '../lib/api-client'
import { sortOptions } from '../lib/sort-options'
import setSurrogateKeys from '../lib/set-surrogate-keys'

// Actions
import { clearSearchFilter, setSearchFilter } from '../actions/search-actions'

// Config
import Config from '../lib/config'

class CategoryPage extends Component {
  constructor (props) {
    super(props)

    this.Head = Config.get().Head

    this.state = {
      filtersShown: false
    }
  }

  static algoliaEnabled = () => true

  static async getInitialProps ({ query: { id }, reduxStore, req }) {
    if (req) { // server-side
      const category = await CategoryPage.fetchCategory(id)
      return { id, category }
    } else { // client side
      return { id }
    }
  }

  /**
   * Request the category from the API
   * @param  {Number} id
   * @return {Object} API response or error
   */
  static async fetchCategory (id, req, res) {
    let options = {}
    if (req && res) {
      options.postRequestHook = (response) => { setSurrogateKeys(response.headers, req, res) }
    }
    const response = await new ApiClient().read(`/getCategory/${id}`, {}, null, options)
    return response.data
  }

  static buildAlgoliaStates (params) {
    const searchState = params.asPath.includes('?')
      ? qs.parse(params.asPath.substring(params.asPath.indexOf('?') + 1))
      : {}
    return Object.assign({ ...searchState })
  }

  static onSearchStateChange (searchState) {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      // We want to stay on the same page but push a url onto the stack
      // so that the back button works as expected
      const as = this.searchStateToUrl(searchState)

      // queryString is added at the end so that the url that is pushed
      // onto the stack is different for each combination of refinements and queries,
      // otherwise the url would always be the same and the back button would
      // navigate to the previous page instead of undoing refinements
      const queryString = as.split('?')[1]
      const href = `/category?id=${this.props.id}&${queryString}`

      Router.push(href, as)
    }, this.updateAfter())
    this.setState({ searchState })
  }

  static searchStateToUrl (searchState) {
    const urlSearchState = buildSearchStateForURL(searchState)
    return Object.keys(urlSearchState).length > 0 ? `${window.location.pathname}?${qs.stringify(urlSearchState)}` : window.location.pathname
  }

  // Updates the search state when navigating to another category clientside
  static async algoliaComponentDidUpdate (prevProps, prevState) {
    if ((prevProps.id != this.props.id) && this.state.searchState) { // eslint-disable-line
      this.setState({
        searchState: Object.assign(
          {},
          this.state.searchState, {
            configure: Object.assign(
              {},
              this.state.searchState.configure,
              { filters: `category_ids:${this.props.id}` }
            ),
            page: 1 }
        )
      })
    }

    if (!equal(prevState.searchState, this.state.searchState)) return

    const urlSearchState = qs.parse(window.location.search.slice(1))
    if (this.state.searchState && !equal(buildSearchStateForURL(this.state.searchState), urlSearchState)) {
      // Now that this code has been refactored somewhat, we may no longer need to set 'currentId'
      this.setState({ currentId: this.props.id, searchState: Object.assign(urlSearchState, { configure: this.props.searchState.configure }) })
    }
  }

  async componentDidMount () {
    await this.fetchCategoryIntoState(this.props.id)
  }

  // Get the category data when navigating to other category clientside
  async componentDidUpdate (prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      await this.fetchCategoryIntoState(this.props.id)
    }
  }

  async fetchCategoryIntoState (id) {
    const category = await CategoryPage.fetchCategory(id)

    this.setState({ loading: false, category })
    this.props.dispatch(setSearchFilter(category.title))
  }

  componentWillUnmount () {
    this.props.dispatch(clearSearchFilter())
  }

  toggleFiltering = () => {
    if (this.state.filtersShown) {
      document.body.classList.remove('modal-open')
    } else {
      document.body.classList.add('modal-open')
    }

    this.setState({
      filtersShown: !this.state.filtersShown
    })
  }

  /**
   * Render the loaded content
   * @param  {Object} category
   * @return {String} - HTML markup for the component
   */
  renderLoaded (category) {
    const { algoliaIndexName } = Config.get()
    const { filtersShown } = this.state
    const indexName = category.default_sort_order ? `${algoliaIndexName}_${category.default_sort_order}` : algoliaIndexName

    return (
      <>
        <this.Head>
          <title>{ suffixWithStoreName(category.title) }</title>
        </this.Head>
        <ProductMenu title={category.title} />
        <Breadcrumb />
        <div className='c-product-listing-wrapper'>
          <div className={classNames('c-product-listing-filter-heading', { 'c-product-listing-filter-heading--hide': !filtersShown })}>
            <h2> Filters <button className='c-product-listing-filter-close' onClick={this.toggleFiltering} /></h2>
          </div>
          <div className={classNames('c-product-listing-filter', { 'c-product-listing-filter--hide': !filtersShown })}>
            <div className='c-product-listing-filter__header'>
              <SearchFiltersClearControls/>
            </div>
            <SearchFilters facets={category.search_facets} filtersShown={filtersShown} />
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
                  <SortBy defaultRefinement={indexName} items={sortOptions(algoliaIndexName)} />
                  <Button className='c-product-listing__menu-options-sort-by-button u-hidden-d' />
                </div>
              </div>
            </div>
            <ProductListingInfo />
            <ProductListingCards />
            <LoadMoreHits />
          </div>
        </div>
      </>
    )
  }

  render () {
    const category = this.props.category || (this.state && this.state.category)
    const loading = (this.state && this.state.loading) || !category

    if (loading) {
      return (
        <>
          <Loading />
          { /* Render Search filters so that the Algolia request triggered by the spinner
          matches the default category page request - otherwise an extra call to Algolia is made */ }
          <div className='u-hidden'>
            <SearchFilters />
          </div>
        </>
      )
    } else {
      return this.renderLoaded(category)
    }
  }
}

export default CategoryPage
