// Component
import RelatedProducts from '../../../../../client/components/products/display/related-products'

// Objects
import Image from '../../../../../client/objects/image'

// Fixtures
import product from '../../../../fixtures/product'

test('renders correctly', () => {
  // Arrange & Act
  const { bundles } = product
  const wrapper = mount(
    <RelatedProducts bundles={bundles} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper).toContainReact(<Image className='c-related-products__image' src={bundles[0].asset_files[0] && bundles[0].asset_files[0].s3_url} />)
})

test('returns null if bundles array is empty', () => {
  // Arrange & Act
  const bundles = []
  const wrapper = mount(
    <RelatedProducts bundles={bundles} />
  )

  // Assert
  expect(wrapper).toMatchSnapshot()
  expect(wrapper.children().length).toBe(0)
})
