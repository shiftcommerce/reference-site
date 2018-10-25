// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Components
import SearchBar from '../../../../client/components/search/search-bar'

test('renders the header', () => {
  // Arrange - provide an initail state for the search
  const initialState = {
    loading: true,
    error: false,
    query: null
  }

  // Act
  const wrapper = mount(
    <Provider store={createMockStore(initialState)} >
      <SearchBar />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Search')
})
