// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import qs from 'qs'

// Actions
import { readCategory } from '../actions/category-actions'

// Components
import ProductListing from '../components/products/listing/product-listing'

// Lib
import algoliaReduxWrapper from '../lib/algolia-redux-wrapper'

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

        if (!queryString) {
          return
        }
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
    // Get a deep copy of searchState - we don't want to modify it
    const searchStateClone = JSON.parse(JSON.stringify(searchState))
    // We don't need the category id filter in the URL
    delete searchStateClone.configure
    // We don't need the page in the URL
    delete searchStateClone.page
    // Build the query string and append it to current path
    return `${window.location.pathname}?${qs.stringify(searchStateClone)}`
  }

  static algoliaComponentDidMount () {
    // Algolia reference implementation would expect the full searchState to be
    // present in the Url. We wish to hide `{ configure: {filters: filter} }`
    // on initial page load, so that the url is the slug
    const constructSearchState = (filter, search) => {
      const options = qs.parse(search.slice(1))
      return Object.assign({ configure: { filters: filter } }, options)
    }

    const filter = `category_ids:${this.props.id}`
    const { search } = window.location
    this.setState({ searchState: constructSearchState(filter, search) })
  }

  static algoliaComponentWillReceiveProps (nextProps) {
    // Algolia reference implementation would expect the full searchState to be
    // present in the Url. We wish to hide `{ configure: {filters: filter} }`
    // on initial page load, so that the url is the slug
    const constructSearchState = (filter, search) => {
      const options = qs.parse(search.slice(1))
      return Object.assign({ configure: { filters: filter } }, options)
    }

    const filter = `category_ids:${nextProps.id}`
    const { search } = window.location
    this.setState({ searchState: constructSearchState(filter, search) })
  }

  render () {
    return (
      <ProductListing
        resultsState={this.props.resultsState}
        onSearchStateChange={this.onSearchStateChange}
        searchState={
          this.state && this.state.searchState
            ? this.state.searchState
            : this.props.searchState
        }
        title={this.props.title}
        categoryId={this.props.id}
      />
    )
  }
}

function mapStateToProps (state) {
  const { category } = state

  return category
}

export default algoliaReduxWrapper(connect(mapStateToProps)(Category), Category)
