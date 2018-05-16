import SearchBar from '../../../components/search/SearchBar'

test('renders the header', () => {
  // arrange

  // act
  const wrapper = mount(
    <SearchBar />
  )

  // assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText('Search')
})
