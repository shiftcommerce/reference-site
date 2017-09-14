import SearchBar from '../../components/SearchBar'
import Link from 'next/link'

test('renders the header', () => {
  // arrange

  // act
  const wrapper = shallow(
    <SearchBar />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Search')
})
