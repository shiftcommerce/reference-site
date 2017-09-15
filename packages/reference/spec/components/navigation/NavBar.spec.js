// Libraries
import { createMockStore } from 'redux-test-utils'

// Components
import NavBar from '../../../components/navigation/NavBar'

// Fixtures
import categories from '../../fixtures/categories.fixture'

test('renders the nav bar options', () => {
  // Arrange
  const initialState = {
    categories: categories
  }

  const context = {
    context: {
      store: createMockStore(initialState)
    }
  }

  // Act
  const wrapper = mount(<NavBar />, context)

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toHaveHTML('<div class="o-nav" role="navigation"><a class="o-nav__option o-nav__option--first" href="/categories/1">Bathroom</a></div>')
})
