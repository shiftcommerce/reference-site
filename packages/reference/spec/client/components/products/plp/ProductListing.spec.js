// Component
import { ProductListing } from '../../../../../client/components/products/listing/ProductListing'

// Fixtures
import resultState from '../../../../fixtures/searchResultState.fixture'

test('renders correctly', () => {
  // Arrange
  const searchState = {}
  const category = {
    data: {
      id: 1,
      title: 'Bathroom'
    }
  }

  // Act
  const wrapper = shallow(
    <ProductListing category={category} resultState={resultState} searchState={searchState} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
