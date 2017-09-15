// Libraries
import { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import qs from 'qs'

// Actions
import { setSearchState } from '../../actions/searchActions'
import { readCategory } from '../../actions/categoryActions'

// Components
import Layout from '../../components/Layout'
import { PLP, findResultsState } from '../../components/products/PLP'

// Lib
import trimObject from '../../lib/trimObject'

// Objects
import Breadcrumb from '../../objects/Breadcrumb'

// Utils
import { configureStore } from '../../utils/configureStore'

class Category extends Component {
  static async getInitialProps ({ store, query, url }) {
    const searchState = query
    const resultState = await findResultsState(PLP, { searchState })
    await store.dispatch(readCategory(query.id))
    store.dispatch(setSearchState(searchState))

    return {
      category: store.getState().category,
      search: searchState,
      resultState: resultState
    }
  }

  onSearchStateChange (searchState) {
    delete searchState.configure
    delete searchState.id

    let searchObject = trimObject(searchState)
    let href = `/categories/category?id=${this.props.category.id}`

    // Using `category.reference` in order for current algolia implementation to work
    let as = `/categories/${this.props.category.reference}?${qs.stringify(searchObject)}`

    Router.push(href, as, {shallow: true})
    this.props.dispatch(setSearchState(searchObject))
  }

  render () {
    let {
      category,
      search,
      resultState
    } = this.props

    let BreadcrumbTrail = [
      { id: 1, title: category.title, canonical_path: `/categories/${category.id}` }
    ]

    return (
      <Layout>
        <Breadcrumb trail={BreadcrumbTrail} />
        <PLP
          searchState={search}
          onSearchStateChange={this.onSearchStateChange.bind(this)}
          resultState={resultState}
          category={category.reference}
        />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search || undefined,
    category: state.category || undefined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}

export default withRedux(configureStore, mapStateToProps, mapDispatchToProps)(Category)
