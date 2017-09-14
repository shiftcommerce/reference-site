// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import qs from 'qs'

// Actions
import { setSearchState, setSearchQuery } from '../actions/searchActions'

// Components
import Layout from '../components/Layout'
import { PLP, findResultsState } from '../components/products/PLP'

// Lib
import trimObject from '../lib/trimObject'

// Objects
import Breadcrumb from '../objects/Breadcrumb'

// Utils
import { configureStore } from '../utils/configureStore'

class Search extends Component {
  static async getInitialProps ({ store, req, query, url }) {
    const searchState = query
    const resultState = await findResultsState(PLP, { searchState })
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

  render () {
    let {
      search,
      resultState
    } = this.props

    let BreadcrumbTrail = [
      { id: 1, title: `Search: '${search.query || ''}'`, canonical_path: this.breadcrumbCanonicalPath(search) }
    ]

    return (
      <Layout searchObject={search} onSearchQueryChange={this.onSearchQueryChange.bind(this)}>
        <Breadcrumb trail={BreadcrumbTrail} />
        <PLP
          searchState={search}
          onSearchStateChange={this.onSearchStateChange.bind(this)}
          resultState={resultState}
        />
      </Layout>
    )
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

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Search)
