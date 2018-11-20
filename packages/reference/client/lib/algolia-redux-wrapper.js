// Libraries
import withReduxStore from './with-redux-store'
import { Provider } from 'react-redux'
import { Configure } from 'react-instantsearch/dom'
import Router from 'next/router'
import qs from 'qs'
import getConfig from 'next/config'

// Lib
import InitialPropsDelegator from './initial-props-delegator'
import buildSearchStateForURL from '../lib/build-search-state-for-url'

// Components
import ConnectedLayout from '../components/layout'
import { InstantSearch, findResultsState } from '../components/search/algolia/instant-search'

const {
  publicRuntimeConfig: {
    ALGOLIA_API_KEY,
    ALGOLIA_APP_ID,
    ALGOLIA_INDEX_NAME,
    ALGOLIA_RESULTS_PER_PAGE
  }
} = getConfig()

export default function (ConnectedComponent, Page) {
  return algoliaOuterWrapper(
    withReduxStore(
      withProvider(
        algoliaInnerWrapper(
          withLayout(
            ConnectedComponent
          )
        )
      )
    ),
    Page
  )
}

function algoliaOuterWrapper (NextWrapper, Page) {
  return class extends InitialPropsDelegator(NextWrapper) {
    constructor (props) {
      super(props)
      this.onSearchStateChange = this.onSearchStateChange.bind(this)
    }

    static async getInitialProps (appContext) {
      const { query } = appContext

      // Get initial props from the parent
      const appProps = await Object.getPrototypeOf(this).getInitialProps(appContext)

      let searchState = query
      if (Page.buildAlgoliaStates) {
        searchState = Page.buildAlgoliaStates(appContext)
      }

      let resultsState = {
        _originalResponse: {
          results: [{}]
        }
      }
      if (Page.algoliaEnabled && Page.algoliaEnabled()) {
        resultsState = await findResultsState(NextWrapper, { searchState, ...appProps })
      }

      return {
        ...appProps,
        resultsState,
        searchState
      }
    }

    updateAfter () {
      // Delegate to custom implementation if the page provides one
      if (Page.updateAfter) {
        return Page.updateAfter()
      }

      // Default implementation
      return 700
    }

    onSearchStateChange (searchState) {
      // Delegate to custom implementation if the page provides one
      if (Page.onSearchStateChange) {
        return Page.onSearchStateChange.call(this, searchState)
      }

      // Default implementation
      clearTimeout(this.debouncedSetState)
      this.debouncedSetState = setTimeout(() => {
        const href = this.searchStateToUrl(searchState)
        Router.push(href, href, { shallow: true })
      }, this.updateAfter())
      this.setState({ searchState })
    }

    searchStateToUrl (searchState) {
      // Delegate to custom implementation if the page provides one
      if (Page.searchStateToUrl) {
        return Page.searchStateToUrl.call(this, searchState)
      }

      // Default implementation
      const urlSearchState = buildSearchStateForURL(searchState)
      // Build the query string and append it to search path
      return searchState.query ? `/search?${qs.stringify(urlSearchState)}` : '/search'
    }

    componentDidMount () {
      return Page.algoliaComponentDidMount && Page.algoliaComponentDidMount.call(this)
    }

    componentWillReceiveProps (nextProps) {
      return Page.algoliaComponentWillReceiveProps && Page.algoliaComponentWillReceiveProps.call(this, nextProps)
    }

    render () {
      const { resultsState, searchState, ...appProps } = this.props
      return (
        <NextWrapper
          resultsState={resultsState}
          onSearchStateChange={this.onSearchStateChange}
          searchState={
            this.state && this.state.searchState
              ? this.state.searchState
              : searchState
          }
          {...appProps}
        />
      )
    }
  }
}

function withProvider (Component) {
  return class extends InitialPropsDelegator(Component) {
    render () {
      const { reduxStore, ...otherProps } = this.props
      return (
        <Provider store={reduxStore}>
          <Component {...otherProps} />
        </Provider>
      )
    }
  }
}

function algoliaInnerWrapper (Component) {
  return class extends InitialPropsDelegator(Component) {
    render () {
      const { resultsState, onSearchStateChange, searchState, ...otherProps } = this.props
      // We should always configure this in the state to prevent a onSearchStateChange first render
      searchState.configure = { ...searchState.configure, hitsPerPage: ALGOLIA_RESULTS_PER_PAGE }
      return (
        <InstantSearch
          appId={ALGOLIA_APP_ID}
          apiKey={ALGOLIA_API_KEY}
          indexName={ALGOLIA_INDEX_NAME}
          resultsState={resultsState}
          onSearchStateChange={onSearchStateChange}
          searchState={searchState}
        >
          <Configure {...searchState.configure} />
          <Component searchState={ searchState } {...otherProps} />
        </InstantSearch>
      )
    }
  }
}

function withLayout (Component) {
  return class extends InitialPropsDelegator(Component) {
    render () {
      return (
        <ConnectedLayout>
          <Component {...this.props} />
        </ConnectedLayout>
      )
    }
  }
}
