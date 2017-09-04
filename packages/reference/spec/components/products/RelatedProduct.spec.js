// Component
import RelatedProducts from '../../../components/products/RelatedProducts'

// Objects
import Image from '../../../objects/Image'

// Fixtures
import product from '../../fixtures/product.fixture'

test('renders correctly', () => {
  // Arrange & Act
  const wrapper = mount(
    <RelatedProducts bundles={product.bundles} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image src={product.bundles[0].products[0].asset_files[0].url} height={73} width={73} />)
})
