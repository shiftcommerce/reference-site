// Object
import Logo from '../../../client/objects/logo'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Logo className='o-header__logo' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
