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
  expect(wrapper).toContainReact(<Link href='/slug?slug=/categories/mens' as='/categories/mens'><a className='c-nav__option'>Mens<div className='c-nav__option-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></a></Link>)
})

test('renders the link with extra class if index is 0', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <NavBarOption index={0} title='Mens' href='/categories/mens' as='/categories/mens' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Link href='/slug?slug=/categories/mens' as='/categories/mens'><a className='c-nav__option c-nav__option--first'>Mens<div className='c-nav__option-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></a></Link>)
})
