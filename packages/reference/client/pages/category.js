// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import qs from 'qs'
import Head from 'next/head'
import equal from 'deep-equal'

// Components
import AlgoliaFilters from '../components/search/algolia/algolia-filters'
import { Loading } from 'shift-react-components'
import ProductListing from '../components/products/listing/product-listing'

// Requests
import { categoryRequest } from '../requests/category-request'

// Lib
import { algoliaReduxWrapper } from '../lib/algolia-redux-wrapper'
import buildSearchStateForURL from '../lib/build-search-state-for-url'
import { suffixWithStoreName } from '../lib/suffix-with-store-name'
import ApiClient from '../lib/api-client'
import JsonApiParser from '../lib/json-api-parser'

const fetchCategory = async (id) => {
  const request = categoryRequest(id)
  const response = await new ApiClient().read(request.endpoint, request.query)
  return new JsonApiParser().parse(response.data)
}

export class Category extends Component {
  static algoliaEnabled = () => true

  static async getInitialProps ({ query: { id }, reduxStore, req }) {
    if (req) { // server-side
      const category = await fetchCategory(id)
      return { id, category }
    } else { // client side
      return { id }
    }
  }

  static buildAlgoliaStates ({ query: { id, ...options } }) {
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

  static algoliaGetDerivedStateFromProps (newProps, prevState) {
    if (prevState.categoryId !== newProps.id) {
      return { categoryId: newProps.id }
    }
    return null
  }

  static algoliaComponentDidUpdate (prevProps, prevState) {
    if (prevState.categoryId != this.state.categoryId) { // eslint-disable-line eqeqeq
      this.setState({
        searchState: Object.assign(
          {},
          this.state.searchState, {
            configure: Object.assign(
              {},
              this.state.searchState.configure,
              { filters: `category_ids:${this.state.categoryId}` }
            ),
            page: 1 }
        )
      })
    }

    if (!equal(prevState.searchState, this.state.searchState)) return

    const urlSearchState = qs.parse(window.location.search.slice(1))
    if (!equal(buildSearchStateForURL(this.state.searchState), urlSearchState)) {
      this.setState({ currentId: prevProps.id, searchState: Object.assign(urlSearchState, { configure: prevProps.searchState.configure }) })
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps (newProps, prevState) {
    if (prevState.currentId !== newProps.id) {
      return { currentId: newProps.id, loading: true }
    }
    return null
  }

  async componentDidMount () {
    await this.fetchCategoryIntoState(this.props.id)
  }

  async componentDidUpdate (_, prevState) {
    if (prevState.currentId !== this.state.currentId) {
      await this.fetchCategoryIntoState(this.props.id)
    }
  }

  async fetchCategoryIntoState (id) {
    const category = await fetchCategory(id)
    this.setState({ loading: false, category })
  }

  render () {
    const category = this.props.category || (this.state && this.state.category)
    const loading = (this.state && this.state.loading) || !category

    if (loading) {
      return (
        <>
          <Loading />
          {/* Render Algolia filters so that the Algolia request triggered by the spinner
          matches the default category page request - otherwise an extra call to Algolia is made */}
          <div className='u-hidden'>
            <AlgoliaFilters />
          </div>
        </>
      )
    } else {
      const { title, facets } = category

      return (
        <>
          <Head>
            <title>{ suffixWithStoreName(title) }</title>
          </Head>
          <ProductListing title={title} facets={facets} />
        </>
      )
    }
  }
}

export default algoliaReduxWrapper(connect()(Category), Category)
