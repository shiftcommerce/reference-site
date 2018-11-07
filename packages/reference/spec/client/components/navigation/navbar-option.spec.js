// Libraries
import Link from 'next/link'

// Components
import NavBarOption from '../../../../client/components/navigation/navbar-option'

test('renders the links', () => {
  // Arrange

  // Act
  const wrapper = shallow(
    <NavBarOption title='Mens' href='/categories/mens' as='/categories/mens' />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Link href="/slug?slug=/categories/mens" as="/categories/mens"><a className="c-nav__option"><div className="c-nav__option-label">Mens</div><div className="c-nav__option-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></a></Link>)
})
