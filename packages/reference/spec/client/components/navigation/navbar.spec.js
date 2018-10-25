// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Components
import { NavBar } from '../../../../client/components/navigation/navbar'

// Fixtures
import menu from '../../../fixtures/menu'

test('renders the nav bar options', () => {
  // Arrange - provide an initail state for the search
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
  expect(wrapper.find('div.c-nav__menu-list')).toHaveHTML('<div class="c-nav__menu-list"><a class="c-nav__option" href="/categories/1"><div class="c-nav__option-label">Bathroom</div><div class="c-nav__option-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></a></div>')
})
