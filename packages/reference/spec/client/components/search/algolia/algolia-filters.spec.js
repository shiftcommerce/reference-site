// Components
import AlgoliaFilters from '../../../../../client/components/search/algolia/algolia-filters'

test('renders the algolia filter component with children', () => {
  // Arrange & Act
  const wrapper = shallow(<AlgoliaFilters showFilters={true} />)

  // Assert
  expect(wrapper).toMatchSnapshot()
})
