// Lib
import InitialPropsDelegator from './initial-props-delegator'
import getConfig from 'next/config'
import { Configure } from 'react-instantsearch/dom'

// Components
import { InstantSearch } from '../components/search/algolia/instant-search'

const {
  publicRuntimeConfig: {
    ALGOLIA_API_KEY,
    ALGOLIA_APP_ID,
    ALGOLIA_INDEX_NAME
  }
} = getConfig()

export default function algoliaInnerWrapper (Component) {
  return class extends InitialPropsDelegator(Component) {
    render () {
      const { resultsState, onSearchStateChange, searchState, ...otherProps } = this.props
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
          <Component {...otherProps} />
        </InstantSearch>
      )
    }
  }
}
