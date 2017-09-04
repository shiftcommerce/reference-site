import SearchBar from '../../components/SearchBar'
import Link from 'next/link'

test('renders the header', () => {
  // arrange

  // act
  const wrapper = shallow(
    <SearchBar />
  )

  // assert
  expect(wrapper).toContainReact(<input type="search" aria-label='search text' placeholder="Search..." />)
  expect(wrapper).toContainReact(<Link href='/search'><a className='c-button c-button--lrg'>Search</a></Link>)
})
