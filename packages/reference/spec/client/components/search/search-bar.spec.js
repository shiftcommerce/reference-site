import SearchBar from '../../../../client/components/search/search-bar'

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
