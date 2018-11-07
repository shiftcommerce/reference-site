// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Components
import { NavBar } from '../../../../client/components/navigation/navbar'

// Fixtures
import menu from '../../../fixtures/menu'

test('renders the nav bar options', () => {
  // Arrange - provide an initial state for the search
  const initialState = {
    loading: true,
    error: false,
    query: null
  }

  // Act
  const wrapper = mount(
    <Provider store={createMockStore(initialState)} >
      <NavBar menu={menu} />
    </Provider>
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<NavBar menu={menu} />)
})
