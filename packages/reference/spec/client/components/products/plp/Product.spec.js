// Component
import Product from '../../../../../client/components/products/listing/Product'

// Fixtures
import productSearchHit from '../../../../fixtures/productSearchHit.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = shallow(
    <Product hit={productSearchHit} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
