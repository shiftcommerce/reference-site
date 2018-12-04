// Libraries
import { Provider } from 'react-redux'
import { createMockStore } from 'redux-test-utils'

// Components
import { NavBar } from '../../../../client/components/navigation/navbar'
import Loading from '../../../../client/components/loading'

// Fixtures
import menu from '../../../fixtures/menu'
import menuError from '../../../fixtures/menu-error'
import menuLoading from '../../../fixtures/menu-loading'

describe('The navbar', () => {
  test('renders the nav bar options', () => {
    // Act
    const wrapper = shallow(
      <Provider store={createMockStore()} >
        <NavBar menu={menu} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toContainReact(<NavBar menu={menu} />)
  })

  test('renders the error message', () => {
    // Act
    const wrapper = mount(
      <Provider store={createMockStore()} >
        <NavBar menu={menuError} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toIncludeText('Sorry! There is an error in loading menus')
  })

  test('renders loading spinner', () => {
    // Act
    const wrapper = mount(
      <Provider store={createMockStore()} >
        <NavBar menu={menuLoading} />
      </Provider>
    )

    // Assert
    expect(wrapper).toMatchSnapshot()
    expect(wrapper).toContainReact(<Loading />)
  })
})
