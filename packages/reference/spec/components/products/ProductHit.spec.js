// Component
import ProductHit from '../../../components/products/ProductHit'

// Fixtures
import productSearchHit from '../../fixtures/productSearchHit.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <ProductHit hit={productSearchHit} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toIncludeText(productSearchHit.name)
  expect(wrapper).toIncludeText(productSearchHit.price)
})
