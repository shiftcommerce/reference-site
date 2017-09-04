import NavBar from '../../components/NavBar'
import NavBarOption from '../../components/NavBarOption'

test('renders the nav bar options', () => {
  // arrange

  // act
  const wrapper = shallow(
    <NavBar />
  )

  // assert
  expect(wrapper).toContainReact(<NavBarOption index={ 0 } title='Mens' link='/mens' />)
  expect(wrapper).toContainReact(<NavBarOption index={ 1 } title='Womens' link='/womens' />)
  expect(wrapper).toContainReact(<NavBarOption index={ 2 } title='Boys' link='/boys' />)
  expect(wrapper).toContainReact(<NavBarOption index={ 3 } title='Girls' link='/girls' />)
  expect(wrapper).toContainReact(<NavBarOption index={ 4 } title='Other' link='/other' />)
  expect(wrapper).toContainReact(<NavBarOption index={ 5 } title='Offers' link='/offers' />)
})