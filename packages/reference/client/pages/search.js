// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import qs from 'qs'

// Actions

// Components
import { findResultsState } from '../components/search/algolia/instant-search'
import ProductListing from '../components/products/listing/product-listing'

// Set a debounce updateAfter in ms to limit
// window.history updates
const updateAfter = 700

const searchStateToUrl = searchState =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : ''

class Search extends Component {
  constructor (props) {
    super(props)
    this.onSearchStateChange = this.onSearchStateChange.bind(this)
  }

  static async getInitialProps ({ query }) {
    const resultsState = await findResultsState(ProductListing, { searchState: query })

    return { resultsState, searchState: query }
  }

  onSearchStateChange = searchState => {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToUrl(searchState)
      Router.replace(href, href)
    }, updateAfter)
    this.setState({ searchState })
  }

  componentDidMount () {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) })
  }

  componentWillReceiveProps () {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) })
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
        title={`Search "${this.props.searchState.query}"`}
      />
    )
  }
}

function mapStateToProps (state) {
  const { search } = state

  return search
}

export default connect(mapStateToProps)(Search)
