// Component
import { ProductListing } from '../../../../components/products/plp/ProductListing'

// Fixtures
import resultState from '../../../fixtures/searchResultState.fixture'

test('renders correctly', () => {
  // Arrange
  const searchState = {}
  const category = 'Bathroom'

  // Act
  const wrapper = shallow(
    <ProductListing category={category} resultState={resultState} searchState={searchState} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
