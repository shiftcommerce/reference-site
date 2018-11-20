// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import qs from 'qs'
import Head from 'next/head'

// Actions
import { readCategory } from '../actions/category-actions'

// Components
import ProductListing from '../components/products/listing/product-listing'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'
import buildSearchStateForURL from '../lib/build-search-state-for-url'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'

class Category extends Component {
  static algoliaEnabled = () => true

  static async getInitialProps ({ query: { id }, reduxStore }) {
    await reduxStore.dispatch(readCategory(id))
    return { id }
  }

  static buildAlgoliaStates ({ query }) {
    const { id, ...options } = query
    return Object.assign({ configure: { filters: `category_ids:${id}` } }, options)
  }

  static onSearchStateChange (searchState) {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      let href, as
      if (searchState.query) {
        // If the user typed in the searchbox we want to clear any filters
        // and redirect to the search page
        const newSearchState = { query: searchState.query }
        href = as = `/search?${qs.stringify(newSearchState)}`
      } else {
        // Otherwise searchState changed because refinments were applied
        // we want to stay on the same page but push a url onto the stack
        // so that the back button works as expected
        const categoryId = this.props.id
        as = this.searchStateToUrl(searchState)
        const queryString = as.split('?')[1]

        // queryString is added at the end so that the url that is pushed
        // onto the stack is different for each combination of refinements,
        // otherwise the url would always be the same and the back button would
        // navigate to the previous page instead of undoing refinements
        href = `/category?id=${categoryId}&${queryString}`
      }
      Router.push(href, as, { shallow: true })
    }, this.updateAfter())
    this.setState({ searchState })
  }

  static searchStateToUrl (searchState) {
    const urlSearchState = buildSearchStateForURL(searchState)
    return Object.keys(urlSearchState).length > 0 ? `${window.location.pathname}?${qs.stringify(urlSearchState)}` : window.location.pathname
  }

  static algoliaComponentWillReceiveProps (nextProps) {
    // Only set a new state when we switch category
    if (nextProps.id !== this.props.id) {
      this.setState({ searchState: nextProps.searchState })
    }
  }

  render () {
    const { title } = this.props

    return (
      <>
        <Head>
          <title>{ suffixWithStoreName(title) }</title>
        </Head>
        <ProductListing title={this.props.title} />
      </>
    )
  }
}

function mapStateToProps (state) {
  const { category } = state

  return category
}

export default algoliaReduxWrapper(connect(mapStateToProps)(Category), Category)
