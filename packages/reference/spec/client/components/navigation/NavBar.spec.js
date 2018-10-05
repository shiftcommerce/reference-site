// Components
import { NavBar } from '../../../../client/components/navigation/NavBar'

// Fixtures
import menu from '../../../fixtures/menu.fixture'

test('renders the nav bar options', () => {
  const wrapper = mount(<NavBar menu={menu} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('div.c-nav__menu-list')).toHaveHTML('<div class="c-nav__menu-list"><a class="c-nav__option c-nav__option--first" href="/categories/1">Bathroom<div class="c-nav__option-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></a></div>')
})
