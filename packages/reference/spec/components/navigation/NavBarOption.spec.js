// Libraries
import Link from 'next/link'

// Components
import NavBarOption from '../../../components/navigation/NavBarOption'

test('renders the links', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <NavBarOption title='Mens' href='/categories/mens' as='/categories/mens' />
  )

  // Assert
  expect(wrapper).toContainReact(<Link href='/slug?slug=/categories/mens' as='/categories/mens'><a className='o-nav__option'>Mens</a></Link>)
})

test('renders the link with extra class if index is 0', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <NavBarOption index={0} title='Mens' href='/categories/mens' as='/categories/mens' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Link href='/slug?slug=/categories/mens' as='/categories/mens'><a className='o-nav__option o-nav__option--first'>Mens</a></Link>)
})
