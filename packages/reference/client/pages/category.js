// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import qs from 'qs'

// Actions
import { readCategory } from '../actions/category-actions'

// Components
import { findResultsState } from '../components/search/algolia/instant-search'
import ProductListing from '../components/products/listing/product-listing'

// Set a debounce updateAfter in ms to limit
// window.history updates
const updateAfter = 300

// searchStateToUrl should not return a new url unless additional
// refinements are applied. This is required for back and forward
// navigation. Likewise we want to navigate either shallowly - without calling
// componentDidMount - or deeply
const searchStateToUrl = (searchState, categoryId) => {
  const filter = `category_ids:${categoryId}`
  const filterOnlySearchState = { configure: { filters: filter } }
  const isSimpleState = JSON.stringify(searchState) === JSON.stringify(filterOnlySearchState)

  if (qs.stringify(searchState) !== '' && !isSimpleState) {
    return { as: `${window.location.pathname}?${qs.stringify(searchState)}`, isShallow: true }
  } else {
    return { as: '', isShallow: false }
  }
}

class Category extends Component {
  constructor (props) {
    super(props)
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
  }

  static async getInitialProps ({ reduxStore, query }) {
    // The id is required for filtering to category and prevents flickering
    // of non-category items. Any further options should be passed along only
    // if they are present
    const { id, ...options } = query
    const filter = `category_ids:${id}`
    await reduxStore.dispatch(readCategory(id))
    const searchState = Object.assign({ configure: { filters: filter } }, options)
    const resultsState = await findResultsState(ProductListing, { searchState })

    return { searchState, resultsState }
  }

  onSearchStateChange = (searchState) => {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      const categoryId = this.props.id
      const href = `/category?id=${categoryId}`
      const { as, isShallow } = searchStateToUrl(searchState, categoryId)
      Router.replace(href, as, { shallow: isShallow })
    }, updateAfter)
    this.setState({ searchState })
  }

  // Algolia reference implementation would expect the full searchState to be
  // present in the Url. We wish to hide `{ configure: {filters: filter} }`
  // on initial page load, so that the url is the slug
  constructSearchState = (filter, search) => {
    const options = qs.parse(search.slice(1))
    Object.assign({ configure: { filters: filter } }, options)
  }

  componentDidMount () {
    const filter = this.props.id
    const { search } = window.location
    this.props.dispatch(readCategory(filter))
    this.setState({ searchState: this.constructSearchState(filter, search) })
  }

  componentWillReceiveProps () {
    const filter = this.props.id
    const { search } = window.location
    this.setState({ searchState: this.constructSearchState(filter, search) })
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

export default connect(mapStateToProps)(Category)
