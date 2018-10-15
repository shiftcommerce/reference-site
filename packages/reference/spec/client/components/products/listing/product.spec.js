// Component
import Product from '../../../../../client/components/products/listing/product'

// Fixtures
import productSearchHit from '../../../../fixtures/product-search-hit'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = shallow(
    <Product hit={productSearchHit} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
})
