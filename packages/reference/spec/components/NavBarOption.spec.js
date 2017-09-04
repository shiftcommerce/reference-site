import NavBarOption from '../../components/NavBarOption'
import Link from 'next/link'

test('renders the links', () => {
  // arrange

  // act
  const wrapper = shallow(
    <NavBarOption title='Mens' link='/mens' />
  )

  // assert
  expect(wrapper).toContainReact(<Link href='/mens'><a className='o-nav__option'>Mens</a></Link>)
})

test('renders the link with extra class if index is 0', () => {
  // arrange

  // act
  const wrapper = shallow(
    <NavBarOption title='Mens' link='/mens' index={ 0 } />
  )

  // assert
  expect(wrapper).toContainReact(<Link href='/mens'><a className='o-nav__option o-nav__option--first'>Mens</a></Link>)
})