// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Components
import { SearchBar } from '../../../../client/components/search/search-bar'
import { InstantSearch } from '../../../../client/components/search/algolia/instant-search'

test('Renders the algolia SearchBox and checks the placeholder', () => {
  // Arrange - provide an initial state for the search
  const initialState = {
    loading: true,
    error: false,
    query: null,
    search: {}
  }

  const store = createMockStore(initialState)

  // Act
  const wrapper = mount(
    <Provider store={store} >
      <InstantSearch
        appId='test'
        apiKey='test'
        indexName='test'>
        <SearchBar />
      </InstantSearch>
    </Provider>
  )

  // Assert
  expect(wrapper.find('.ais-SearchBox__input').prop('placeholder')).toBe('Search here…')
})
