// Object
import Logo from '../../objects/Logo'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <Logo className='o-header__logo' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
