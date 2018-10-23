// Components
import { NavBar } from '../../../../client/components/navigation/navbar'

// Fixtures
import menu from '../../../fixtures/menu'

test('renders the nav bar options', () => {
  const wrapper = mount(<NavBar menu={menu} />)

  expect(wrapper).toMatchSnapshot()
  expect(wrapper.find('div.c-nav__menu-list')).toHaveHTML('<div class="c-nav__menu-list"><a class="c-nav__option" href="/categories/1"><div class="c-nav__option-label">Bathroom</div><div class="c-nav__option-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></a></div>')
})
