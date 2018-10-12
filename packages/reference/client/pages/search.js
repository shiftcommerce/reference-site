// Libraries
import { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import qs from 'qs'

// Actions
import { setSearchState, setSearchQuery } from '../actions/searchActions'

// Components
import Layout from '../components/Layout'
import { ProductListing, findResultsState } from '../components/products/listing/ProductListing'

// Lib
import trimObject from '../lib/trimObject'

// Objects
import Breadcrumb from '../objects/Breadcrumb'

class Search extends Component {
  static async getInitialProps ({ store, req, query, url }) {
    const searchState = query
    const resultState = await findResultsState(ProductListing, { searchState })
    store.dispatch(setSearchState(searchState))
    return { search: searchState, resultState: resultState, url: url }
  }

  breadcrumbCanonicalPath (searchState) {
    delete searchState.configure
    return `/search?${qs.stringify(searchState)}`
  }

  onSearchQueryChange (e) {
    this.props.dispatch(setSearchQuery(e.target.value))
  }

  onSearchStateChange (searchState) {
    delete searchState.configure
    let searchObject = trimObject(searchState)
    let href = `${Router.router.pathname}?${qs.stringify(searchObject)}`
    Router.push(href, href, {
      shallow: true
    })
    this.props.dispatch(setSearchState(searchObject))
  }

  renderNoResults (search) {
    return (
      <div className='c-product_list__products--no-results'>
        <h2>Oh no! Nothing matches { `'${search.query || ''}'` }</h2>
      </div>
    )
  }

  renderSearchResults (search, resultState) {
    return (
      <div>
        {
          (search.query !== undefined) && (resultState.content.hits.length !== 0)
            ? <ProductListing searchState={search} onSearchStateChange={this.onSearchStateChange.bind(this)} resultState={resultState} />
            : this.renderNoResults(search)
        }
      </div>
    )
  }

  render () {
    let {
      search,
      resultState
    } = this.props

    let BreadcrumbTrail = [
      { id: 1, title: `Search: '${search.query || ''}'`, canonical_path: this.breadcrumbCanonicalPath(search) }
    ]

    // TODO: Push search results into search object
    if (search.loading) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    } else if (search.error) {
      return (
        <Layout>
          <p>{ search.error }</p>
        </Layout>
      )
    } else {
      return (
        <Layout searchObject={search} onSearchQueryChange={this.onSearchQueryChange.bind(this)}>
          <Breadcrumb trail={BreadcrumbTrail} />
          { this.renderSearchResults(search, resultState) }
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search || undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
